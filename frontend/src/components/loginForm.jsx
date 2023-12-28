import React, { useContext, useState } from "react";
import { login } from "../services/APIService";
import { TokenContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const {setToken, setUsername} = useContext(TokenContext)

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();

        if (username === '' || senha === ''){
            return alert('Não pode ter campos vazios.')
        }

        login(username, senha)
        .then(data => {
            setToken(data['access_token'])
            setUsername(nome)
            navigate('/chat')
        })
        .catch(err => {console.log(err); return alert('Credenciais não encontradas.')})
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" placeholder="Insira seu nome" value={nome}
                onChange={e => setNome(e.target.value)}
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