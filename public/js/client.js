const socket = io('http://127.0.0.1:3000')

const messageContainer = document.querySelector('#message-container')
const messageForm = document.querySelector('#send-container')
const messageInput = document.querySelector('#message-input')

const username = (document.querySelector('#username').innerHTML).slice(4,-1)

appendMessage('You joined.')
socket.emit('new-user', username)

socket.on('chat-message', (data) => {
    appendMessage(data)
})

socket.on('user-connected', (name) => {
    appendMessage(`${name} joined.`)
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = `${username}: `+ messageInput.value
    socket.emit('send-chat-message',message)
    appendMessage(message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}