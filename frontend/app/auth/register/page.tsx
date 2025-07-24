import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import style from "@/app/page.module.css"

export default function Page(){
    return(
        <>
            <header><h1>Enter your credentials</h1></header>

            <main className={style.auth}>
                <RegisterForm />
                <nav>
                    <Link href="/">Back</Link>
                </nav>
            </main>    
        </>
    )
}