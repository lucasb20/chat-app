"use client"

import { register } from "@/services/APIService"
import { RegisterData } from "@/services/Interfaces"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function RegisterForm(){
    const [formData, setFormData] = useState<RegisterData>({username : "", password1 : "", password2 : ""})
    const router = useRouter()

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if( formData.password1 !== formData.password2 ){
            return alert("Passwords don't match.")
        }
        else{
            register({username : formData.username, password : formData.password1})
            .then(data => {
                alert(data.statusText)
                if(data.status===201){
                    router.push("/auth/login")
                }
            })
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" placeholder="Enter your username" value={formData.username} required
                    onChange={e=>setFormData({...formData, username : e.target.value})}
                    />
                </section>
                <section>
                    <label htmlFor="password1">Password:</label>
                    <input type="password" id="password1" placeholder="Enter your password" value={formData.password1} required
                    onChange={e=>setFormData({...formData, password1 : e.target.value})}
                    />
                </section>
                <section>
                    <label htmlFor="password2">Confirm password:</label>
                    <input type="password" id="password2" placeholder="Enter your password again" value={formData.password2} required
                    onChange={e=>setFormData({...formData, password2 : e.target.value})}
                    />
                </section>
                <section>
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </section>
            </form>
        </div>
    )
}