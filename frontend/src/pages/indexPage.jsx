import React from "react";
import "../assets/main.css"

export function IndexPage(){
    return(
    <>
    <header><h1>Bem vindo a Raissa.</h1></header>
    
    <main>
            <p>Inicie login para começar.</p>
            <ul>
                <li><a href="/auth/login">Login</a></li>
                <li><a href="/auth/register">Register</a></li>
                <li><a href="/auth/recovery">Esqueci minha senha</a></li>
                <li><a href="/auth/help">Ajuda ao suporte</a></li>
            </ul>
        </main>

        <footer><p>Lucas Rocha 2023</p></footer>
        </>
    )
}