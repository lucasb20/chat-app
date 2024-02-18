"use client"

import { login } from "@/services/APIService"
import { UserData } from "@/services/Interfaces"
import { redirect } from "next/navigation"
import { FormEvent, useState } from "react"

export default function LoginForm(){
    const [formData, setFormData] = useState<UserData>({ username: "", password: ""})

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login({username : formData.username, password : formData.password})
        .then(data => {
            //setToken(data['access_token'])
            //setUsername(nome)
            redirect('/chat')
        })
        .catch(err => {
            alert(err)
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