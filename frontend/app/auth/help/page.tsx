import Link from "next/link";
import style from "@/app/page.module.css"

export default function Page(){
    return(
        <>
            <header>
                <h1>Support</h1>
            </header>

            <main className={style.index}>
                <p>It's that story: If you need me, it's the same as nothing.</p>

                <nav>
                    <Link href={"/"}>Back</Link>
                </nav>
            </main>
        </>
    )
}