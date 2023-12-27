import React, { useState } from "react";
import { login } from "../services/APIService";

export function LoginForm() {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = e => {
        e.preventDefault();

        if (username === '' || senha === ''){
            return alert('Não pode ter campos vazios.')
        }

        login(username, senha)
        .then(data => console.log(data))
        .catch(err => {console.log(err); return alert('Credenciais não encontradas.')})
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" placeholder="Insira seu nome" value={username}
                onChange={e => setUsername(e.target.value)}
                />
            </section>
            <section>
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" placeholder="Insira sua senha" value={senha}
                onChange={e => setSenha(e.target.value)}
                />
            </section>
            <section>
                <button type="reset">Resetar</button>
                <button type="submit">Enviar</button>
            </section>
        </form>
    )
}