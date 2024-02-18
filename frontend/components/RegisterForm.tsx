"use client"

import { RegisterData } from "@/services/Interfaces"
import { FormEvent, useState } from "react"

export default function RegisterForm(){
    const [formData, setFormData] = useState<RegisterData>({username : "", password1 : "", password2 : ""})

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Enter your username" value={formData.username}
                onChange={e=>setFormData({...formData, username : e.target.value})}
                />
            </section>
            <section>
                <label htmlFor="password1">Password:</label>
                <input type="password" id="password1" placeholder="Enter your password" value={formData.password1}
                onChange={e=>setFormData({...formData, password1 : e.target.value})}
                />
            </section>
            <section>
                <label htmlFor="password2">Confirm password:</label>
                <input type="password" id="password2" placeholder="Enter your password again" value={formData.password2}
                onChange={e=>setFormData({...formData, password2 : e.target.value})}
                />
            </section>
            <section>
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
            </section>
        </form>
    )
}