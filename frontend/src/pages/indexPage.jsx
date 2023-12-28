import React from "react";
import "../assets/main.css"
import { Link } from "react-router-dom";

export function IndexPage(){
    return(
    <>
    <header><h1>Bem vindo a Raissa.</h1></header>
    
        <main>
            <p>Inicie login para começar.</p>
            <ul>
                <li><Link to="/auth/login">Login</Link></li>
                <li><Link to="/auth/register">Registrar</Link></li>
                <li><Link to="/auth/recovery">Esqueci minha senha</Link></li>
                <li><Link to="/auth/help">Ajuda ao suporte</Link></li>
            </ul>
        </main>

        <footer><p>Lucas Rocha 2023</p></footer>
        </>
    )
}