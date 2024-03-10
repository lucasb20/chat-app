"use client"

import { FormEvent, useEffect, useRef, useState } from "react"

export default function ChatForm({ username } : {username : string}){
    const messageContainer = useRef<HTMLUListElement>(null)
    const [message, setMessage] = useState<string>("")
    const refSocket = useRef<WebSocket | null>(null)

    const appendMessage = ({message, user} : {message: string, user : string}) => {
        if(messageContainer.current){
            const usernameElement = document.createElement('p')
            usernameElement.innerText = user

            const inputElement = document.createElement('p')
            inputElement.innerText = message

            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const hours_text = hours < 10 ? `0${hours}` : `${hours}`
            const minutes_text = minutes < 10 ? `0${minutes}` : `${minutes}`
            const timeElement = document.createElement('span')
            timeElement.append(`${hours_text}:${minutes_text}`)

            const messageElement = document.createElement('li')
            messageElement.append(usernameElement)
            messageElement.append(inputElement)
            messageElement.append(timeElement)
            messageElement.style.textAlign = user === username?'right':'left'

            messageContainer.current.append(messageElement)
        }
    }

    const appendJoin = ({user} : {user : string}) => {
        if(messageContainer.current){
            const messageElement = document.createElement('li')
            messageElement.innerText = user === username?'You joined':`${user} joined`
            messageElement.style.textAlign = 'center'
            messageContainer.current.append(messageElement)
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