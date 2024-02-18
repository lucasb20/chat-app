import Link from "next/link";
import style from "@/app/page.module.css"
import LoginForm from "@/components/LoginForm";

export default function Page(){
    return(
        <>
            <header><h1>Enter your credentials</h1></header>

            <main className={style.auth}>
                <LoginForm/>
                <nav>
                    <Link href="/">Back</Link>
                </nav>
            </main>
        </>
    )
}