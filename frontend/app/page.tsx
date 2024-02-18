import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
      <>
      <header><h1>Welcome to Raissa</h1></header>
      
      <main className={styles.index}>
        <p>Login in to get started</p>
        <ul>
          <li><Link href={"/auth/login"}>Login</Link></li>
          <li><Link href={"/auth/register"}>Register</Link></li>
          <li><Link href={"/auth/recovery"}>Forgot password</Link></li>
          <li><Link href={"/auth/help"}>Support</Link></li>
        </ul>
      </main>

      <footer><p>Lucas Rocha - @lucasb20</p></footer>
    </>
  )
}
