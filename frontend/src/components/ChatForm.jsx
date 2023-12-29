import React, { useContext, useState } from "react";
import { TokenContext } from "../contexts/AuthContext";

export function ChatForm(){
    const [message, setMessage] = useState('')
    
    const { username } = useContext(TokenContext)

    const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/')

    const messageContainer = document.querySelector('#message-container')

    const appendMessage = (message, options = 'left') => {
        const messageElement = document.createElement('li')
        messageElement.innerText = message
        messageElement.style.textAlign = options
        messageContainer.append(messageElement)
    }

    chatSocket.onmessage = e => {
        const data = JSON.parse(e.data);
        appendMessage(data.message)
    }

    chatSocket.onclose = e => {
        alert(String(e))
        console.error('Chat socket closed unexpectedly')
    }

    const handleSubmit = e => {
        e.preventDefault()

        const messageInputDom = document.querySelector('#message-input');

        const message = messageInputDom.value
        
        chatSocket.send(JSON.stringify({
            'message':`${username}: ${message}`
        }))

        setMessage('')
    }

    return(
        <div>
        <ul id="message-container">
        </ul>
            <form id="send-container" onSubmit={handleSubmit}>
                <input type="text" id="message-input" value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit" id="send-button">Enviar</button>
            </form>
        </div>
    )
}