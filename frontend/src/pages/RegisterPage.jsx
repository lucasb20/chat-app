import React from "react";
import {RegisterForm} from "../components/RegisterForm"
import "../assets/auth.css"

export function RegisterPage(){
    return(<>
        <header><h1>Digite suas credenciais:</h1></header>

        <main>
            <RegisterForm />
            <nav>
                <a href="/">Voltar</a>
            </nav>
        </main>    
        </>
    )
}