const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let chats=document.querySelector('.chats')
var audio=new Audio('tring.mp3')
do {
    name = prompt('Please enter your name: ')
} while(!name)
socket.emit('new-user-joined',name);
socket.on('user-connected',(socket_name)=>{
    userJoinLeft(socket_name,'joined')
})
// function userJoinLeft(soc_name,status){
//     // let div=document.createElement("div");
//     // div.classList.add('user-join');
//     let content=`<p><b>${soc_name}  </b>  ${status} `;
//     // div.innerHTML=content;
//     // chats.appendChild(div);
//     // appendMessage(content, 'outgoing')
//     // sendMessage(content);
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4></h4>
//         <p>${content}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)

// }
socket.on('user-disconnected',(socket_name)=>{
    userJoinLeft(socket_name,'left')
})
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)
    

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    if(type=='incoming'){
        audio.play();
    }
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}