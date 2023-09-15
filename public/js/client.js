const socket = io('http://127.0.0.1:3000')

const messageContainer = document.querySelector('#message-container')
const messageForm = document.querySelector('#send-container')
const messageInput = document.querySelector('#message-input')

const username = (document.querySelector('#username').innerHTML).slice(4,-1)

appendMessage('You joined.','center')
socket.emit('new-user', username)

socket.on('chat-message', (data) => {
    appendMessage(data)
})

socket.on('user-connected', (name) => {
    appendMessage(`${name} joined.`,'center')
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = `${username}: `+ messageInput.value
    socket.emit('send-chat-message',message)
    appendMessage(message,'right')
    messageInput.value = ''
})

function appendMessage(message, options = 'left'){
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageElement.style.textAlign = options
    messageContainer.append(messageElement)
}