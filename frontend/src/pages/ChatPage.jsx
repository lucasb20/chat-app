import React, { useContext, useEffect } from "react";
import "../assets/chat.css"
import { ChatForm } from "../components/ChatForm";
import { TokenContext } from "../contexts/AuthContext";
import { valityToken } from "../services/APIService"
import { Navigate } from "react-router-dom";

export function ChatPage(){
    const {username, token} = useContext(TokenContext)

    useEffect(() => {
        valityToken(token)
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            alert('Erro no Login.')
            Navigate('/login')
        })
    }, [])

    return(
        <>
            <header><h1 id="username">Olá {username}.</h1></header>

            <main>
                <ChatForm/>
                <nav>
                    <Link to="/">Voltar</Link>
                </nav>
            </main>

            <footer>
                <p>Lucas Rocha 2023</p>
            </footer>
        </>
    )
}