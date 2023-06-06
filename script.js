//client side javscript
const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container') //form
const messageInput = document.getElementById('message-input')

const name = prompt('Name?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', e => { //when we submit form, stop form from submitting so page doesn't refresh so we don't lose old messages
    e.preventDefault()//prevents so we don't lost chat message
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message) //sends message to client
    messageInput.value = '' //clears out the messageInput
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}