import React from "react";
import "../assets/auth.css"
import { Link } from "react-router-dom"; 

export function GeralPage({text}){
    return(
        <>
        <header>
            <h1>Suporte</h1>
        </header>

        <main className="index">
            <p>{text}</p>

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