import React, { useContext, useEffect, useRef } from "react";
import "../assets/chat.css"
import { ChatForm } from "../components/ChatForm";
import { TokenContext } from "../contexts/AuthContext";
import { verifyToken } from "../services/APIService"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function ChatPage(){
    const {username, token} = useContext(TokenContext)

    const navegar = useNavigate()

    const refAutenticado = useRef(false)

    useEffect(() => {
        if (refAutenticado.current === false){
            verifyToken(token)
            .then(data => console.log(data))
            .catch(err => {
                console.log(err)
                navegar('/auth/login')
            })
            refAutenticado.current = true
        }
    }, [])

    return(
        <>
            <header><h1 id="username">Olá {username}.</h1></header>

            <main className="chat">
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