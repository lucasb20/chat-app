import Link from "next/link";
import style from "@/app/page.module.css"

export default function Page(){
    return(
        <>
            <header>
                <h1>Support</h1>
            </header>

            <main className={style.index}>
                <p>Okay, so tell me the email associated with your account and we'll talk.</p>

                <nav>
                    <Link href={"/"}>Back</Link>
                </nav>
            </main>
        </>
    )
}