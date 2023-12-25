import React from "react";

export function ChatForm(){
    return(
        <div>
        <ul id="message-container">
        </ul>
            <form id="send-container">
                <input type="text" id="message-input"/>
                <button type="submit" id="send-button">Enviar</button>
            </form>
        </div>
    )
}