import React from "react";
import {RegisterForm} from "../components/RegisterForm"
import "../assets/auth.css"
import { Link } from "react-router-dom";

export function RegisterPage(){
    return(<>
        <header><h1>Digite suas credenciais:</h1></header>

        <main className="auth">
            <RegisterForm />
            <nav>
                <Link to="/">Voltar</Link>
            </nav>
        </main>    
        </>
    )
}