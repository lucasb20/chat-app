import React from "react"

export interface UserData{
    username: string,
    password: string
}

export interface RegisterData{
    username: string,
    password1: string,
    password2: string
}

export interface AuthContextType{
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}