"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

export default function ChatForm({ username } : {username : string}){
    const messageContainer = useRef<HTMLUListElement>(null)
    const [message, setMessage] = useState<string>("")
    const refSocket = useRef<WebSocket | null>(null)

    const appendMessage = ({message, options = 'left'} : {message: string, options : string}) => {
        if(messageContainer.current){
            const messageElement = document.createElement('li')
            messageElement.innerText = message
            messageElement.style.textAlign = options
            messageContainer.current.append(messageElement)
        }
    }

    useEffect(()=>{
        if(refSocket.current === null){
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
                appendMessage({message : textRef, options : positionRef})
            }
            
            refSocket.current.onclose = e => {
                console.error('Chat socket closed unexpectedly');
            }
            
            refSocket.current.onopen = e => {
                console.log('Chat socket connected');
                refSocket.current?.send(JSON.stringify({'type':'join','username': username}))
            }
        }
    }, [])

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(message !== ''){
            refSocket.current?.send(JSON.stringify({
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
                    <button type="submit" id="send-button">Send</button>
                </form>
        </div>
    )
}