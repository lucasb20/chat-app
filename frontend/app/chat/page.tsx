import ChatForm from "@/components/ChatForm";
import Link from "next/link";

export default function Page(){
    return(
        <>
            <header><h1>Connected as *username*</h1></header>

            <main>
                <ChatForm username={"lucasb20"} />
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