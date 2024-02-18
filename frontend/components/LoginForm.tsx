"use client"

import { UserData } from "@/services/Interfaces"
import { FormEvent, useState } from "react"

export default function LoginForm(){
    const [formData, setFormData] = useState<UserData>({ username: "", password: ""})

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={formData.username}
                onChange={e => setFormData({...formData, username : e.target.value})}
                />
            </section>
            <section>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={formData.password}
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