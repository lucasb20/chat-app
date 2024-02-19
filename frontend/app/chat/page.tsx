"use client"

import ChatForm from "@/components/ChatForm";
import { validateToken } from "@/services/APIService";
import { TokenContext } from "@/services/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";
import style from "@/app/page.module.css"

export default function Page(){
    const context = useContext(TokenContext)
    const [username, setUsername] = useState<string>("...")

    if(context !== undefined){
        validateToken({ access_token : context.token })
        .then(data => {
            setUsername(data.username)
        })
    }

    return(
        <>
            <header><h1>Connected as {username}</h1></header>

            <main className={style.chat}>
                <ChatForm username={username} />
                <nav>
                    <Link href="/">Back</Link>
                </nav>
            </main>

            <footer>
                <p>Lucas Rocha - @lucasb20</p>
            </footer>
        </>
    )
}