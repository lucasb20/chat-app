import React from "react";

export function RegisterForm() {
    return(
        <form>
            <section>
                <label htmlFor="nome">Nome:</label>
                <input type="text" name="nome" id="nome" placeholder="Insira seu nome"/>
            </section>
            <section>
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="senha" id="senha" placeholder="Insira sua senha"/>
            </section>
            <section>
                <label htmlFor="senha2">Confirmar senha:</label>
                <input type="password" name="senha2" id="senha2" placeholder="Insira sua senha novamente"/>
            </section>
            <section>
                <button type="reset">Resetar</button>
                <button type="submit">Enviar</button>
            </section>
        </form>
    )
}