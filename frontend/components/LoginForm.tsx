"use client"

import { login } from "@/services/APIService"
import { TokenContext } from "@/services/AuthContext"
import { UserData } from "@/services/Interfaces"
import { useRouter } from "next/navigation"
import { FormEvent, useContext, useState } from "react"

export default function LoginForm(){
    const [formData, setFormData] = useState<UserData>({ username: "", password: ""})
    const router = useRouter()
    const context = useContext(TokenContext)

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let status = 0;

        login({username : formData.username, password : formData.password})
        .then(data => {
            status = data.status
            return data.json()
        })
        .then(data => {
            if(context !== undefined && status == 201){
                context.setToken(data.access_token)
                router.push('/chat')
            }
            else{
                alert(data.message)
            }
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={formData.username} required
                onChange={e => setFormData({...formData, username : e.target.value})}
                />
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={formData.password} required
                onChange={e => setFormData({...formData, password : e.target.value})}
                />
            </section>
            <section>
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
            </section>
        </form>
    )
}