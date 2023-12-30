import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../contexts/AuthContext";

export function ChatForm(){
    const [message, setMessage] = useState('')
    
    const [conectado, setConectado] = useState(false)

    const [chatSocket, setChatSocket] = useState(null)

    const { username } = useContext(TokenContext)
    
    const messageContainer = document.querySelector('#message-container')
    
    const appendMessage = (message, options = 'left') => {
        const messageElement = document.createElement('li')
        messageElement.innerText = message
        messageElement.style.textAlign = options
        messageContainer.append(messageElement)
    }

    useEffect(()=>{
        if(conectado === false){
            const ws = new WebSocket(`ws://localhost:6379`)
            
            ws.onmessage = e => {
                const data = JSON.parse(e.data)
                appendMessage(`${data.message}`, 'left')
            }
            
            ws.onclose = e => {
                console.error('Chat socket closed unexpectedly');
            }
            
            ws.onopen = e => {
                console.log('Chat socket connected');
            }

            setChatSocket(ws)
            setConectado(true)
        }
        
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()

        const messageInputDom = document.querySelector('#message-input');

        const message = messageInputDom.value

        if(message !== ''){
            chatSocket.send(JSON.stringify({'message': message}))
            setMessage('')
        }

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