import React, { useState } from "react";
import { register } from "../services/APIService";
import { Navigate } from "react-router-dom";

export function RegisterForm() {
    const [username, setUsername] = useState('')
    const [senha, setSenha] = useState('')
    const [senha2, setSenha2] = useState('')

    const handleSubmit = e => {
            e.preventDefault();

            if ( username === '' || senha === ''){
                return alert('Não pode ter campos vazios.')
            }

            if (senha !== senha2) {
                setSenha('')
                setSenha2('')
                return alert('As senhas não coincidem.');
            }
            else{
                register(username, senha)
                .then(data => {
                    if(data===201){
                        alert("Registrado com sucesso.")
                        Navigate('/auth/login')
                    }
                    else{
                        alert("Usuário já existente.")
                    }
                })
                .catch(err => {
                    console.log(err)
                    alert("Erro.")
                })
            }
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" placeholder="Insira seu nome" value={username}
                onChange={e=>setUsername(e.target.value)}
                />
            </section>
            <section>
                <label htmlFor="senha">Senha:</label>
                <input type="password" id="senha" placeholder="Insira sua senha" value={senha}
                onChange={e=>setSenha(e.target.value)}
                />
            </section>
            <section>
                <label htmlFor="senha2">Confirmar senha:</label>
                <input type="password" id="senha2" placeholder="Insira sua senha novamente" value={senha2}
                onChange={e=>setSenha2(e.target.value)}
                />
            </section>
            <section>
                <button type="reset">Resetar</button>
                <button type="submit">Enviar</button>
            </section>
        </form>
    )
}