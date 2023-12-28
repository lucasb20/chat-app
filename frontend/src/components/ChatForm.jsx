import React, { useState } from "react";

export function ChatForm(){
    const [message, setMessage] = useState('')

    const handleSubmit = e => {
        e.preventDefault()

        //Implementar websockets.
        
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