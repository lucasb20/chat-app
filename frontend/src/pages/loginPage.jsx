import React from "react";
import { LoginForm } from "../components/LoginForm";
import "../assets/auth.css"
import { Link } from "react-router-dom";

export function LoginPage(){
    return(<>
        <header><h1>Digite suas credenciais:</h1></header>

        <main className="auth">
            <LoginForm/>
            <nav>
                <Link to="/">Voltar</Link>
            </nav>
        </main>    
        </>
    )
}