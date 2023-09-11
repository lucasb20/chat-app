const socket = io('http://localhost:3000')

const messageContainer = document.querySelector('#message-container')
const messageForm = document.querySelector('#send-container')
const messageInput = document.querySelector('#message-input')

const name = 'Seu nome'
appendMessage('You Joined.')
socket.emit('new-user', name)

socket.on('chat-message', (data) => {
    console.log(data)
})

socket.on('user-connected', (name) => {
    appendMessage(`${name} connected`)
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}