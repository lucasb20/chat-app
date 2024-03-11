"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

export default function ChatForm({ username } : {username : string}){
    const messageContainer = useRef<HTMLUListElement>(null)
    const [message, setMessage] = useState<string>("")
    const refSocket = useRef<WebSocket | null>(null)

    const scrollDown = () => {
        if(messageContainer.current){
            messageContainer.current.scrollTo({
                top : messageContainer.current.scrollHeight,
                behavior : "smooth"
            })
        }
    }

    const backButton = document.querySelector("a")
    backButton?.addEventListener("click", () => {
        if(refSocket.current){
            refSocket.current.close()
        }
    })

    const appendMessage = ({message, user} : {message : string, user : string}) => {
        if(messageContainer.current){
            const usernameElement = document.createElement('p')
            usernameElement.innerText = user
            usernameElement.style.fontStyle = 'italic'
            usernameElement.style.opacity = '0.9'

            const inputElement = document.createElement('p')
            inputElement.innerText = message

            const messageElement = document.createElement('li')
            messageElement.append(usernameElement)
            messageElement.append(inputElement)
            messageElement.style.textAlign = user === username?'right':'left'

            messageContainer.current.append(messageElement)

            scrollDown()
        }
    }

    const appendJoin = ({user} : {user : string}) => {
        if(messageContainer.current){
            const messageElement = document.createElement('li')
            messageElement.innerText = user === username?'You joined':`${user} joined`
            messageElement.style.textAlign = 'center'
            messageContainer.current.append(messageElement)

            scrollDown()
        }
    }

    useEffect(()=>{
        if(refSocket.current === null){
            refSocket.current = new WebSocket(`ws://localhost:6379`)
            
            refSocket.current.onmessage = e => {
                const data = JSON.parse(e.data)
                if(data.type === 'join'){
                    appendJoin({user : data.username})
                    return;
                }
                appendMessage({message : data.message, user : data.username})
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