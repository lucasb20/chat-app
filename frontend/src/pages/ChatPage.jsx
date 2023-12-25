import React from "react";
import "../assets/chat.css"

export function ChatPage({username}){
    return(
        <>
            <header><h1 id="username">Olá {username}.</h1></header>

            <main>
                <nav>
                    <a href="/">Back</a>
                </nav>
            </main>

            <footer>
                <p>Lucas Rocha 2023</p>
            </footer>
        </>
    )
}