import React from "react";

export function LoginForm() {
    return(
        <form>
            <section>
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" id="nome" placeholder="Insira seu nome" required/>
            </section>
            <section>
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="senha" id="senha" placeholder="Insira sua senha" />
            </section>
            <section>
                <button type="reset">Resetar</button>
                <button type="submit">Enviar</button>
            </section>
        </form>
    )
}