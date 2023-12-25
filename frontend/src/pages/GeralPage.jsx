import React from "react";
import "../assets/auth.css"

export function GeralPage({text}){
    return(
        <>
        <header>
            <h1>Suporte</h1>
        </header>

        <main>
            <p>{text}</p>

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