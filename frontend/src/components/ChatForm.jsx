import React, { useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "../contexts/AuthContext";

export function ChatForm(){
    const [message, setMessage] = useState('')
    
    const refConectado = useRef(false)

    const refSocket = useRef(null)

    const { username } = useContext(TokenContext)
    
    const messageContainer = useRef(null)
    
    const appendMessage = (message, options = 'left') => {
        const messageElement = document.createElement('li')
        messageElement.innerText = message
        messageElement.style.textAlign = options
        messageContainer.current.append(messageElement)
    }

    useEffect(()=>{
        if(refConectado.current === false){
            
            refSocket.current = new WebSocket(`ws://localhost:6379`)
            
            refSocket.current.onmessage = e => {
                const data = JSON.parse(e.data)
                let positionRef = 'left'
                let textRef = ''
                if(data.type === 'join'){
                    positionRef = 'center'
                }
                else if(data.username === username){
                    positionRef = 'right'
                }

                if(data.type === 'message'){
                    textRef = `${data.username}: ${data.message}`
                }
                else{
                    textRef = data.username===username?'You joined': `${data.username} joined`
                }
                appendMessage(textRef, positionRef)
            }
            
            refSocket.onclose = e => {
                console.error('Chat socket closed unexpectedly');
            }
            
            refSocket.current.onopen = e => {
                console.log('Chat socket connected');
                refSocket.current.send(JSON.stringify({'type':'join','username': username}))
            }
        }
        
        refConectado.current = true
    }, [])
    
    const handleSubmit = e => {
        e.preventDefault()

        if(message !== ''){
            refSocket.current.send(JSON.stringify({
                'type': 'message',
                'username': username,
                'message': message
            }))
            setMessage('')
        }

    }

    return(
        <div>
        <ul id="message-container" ref={messageContainer}>
        </ul>
            <form id="send-container" onSubmit={handleSubmit}>
                <input type="text" id="message-input" value={message} onChange={e => setMessage(e.target.value)}/>
                <button type="submit" id="send-button">Enviar</button>
            </form>
        </div>
    )
}