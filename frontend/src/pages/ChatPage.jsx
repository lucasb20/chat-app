import React, { useContext, useEffect } from "react";
import "../assets/chat.css"
import { ChatForm } from "../components/ChatForm";
import { TokenContext } from "../contexts/AuthContext";
import { verifyToken } from "../services/APIService"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function ChatPage(){
    const {username, token} = useContext(TokenContext)

    const navegar = useNavigate()

    useEffect(() => {
        verifyToken(token)
        .then(data => console.log(data))
        .catch(err => {
            console.log(err)
            navegar('/auth/login')
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