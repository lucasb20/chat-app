import { UserData } from "./Interfaces"

const API_URL = 'http://localhost:8000'

export async function login({username, password} : UserData){
    const response = await fetch(`${API_URL}/auth/token/`, {
        method : 'POST',
        body : JSON.stringify({
            username: username,
            password: password
        })
    })

    return response
}

export async function register({username, password} : UserData){
    const response = await fetch(`${API_URL}/auth/register/`, {
        method : 'POST',
        body : JSON.stringify({
            username: username,
            password: password
        })
    })
    return response
}

export async function validateToken({access_token} : {access_token : string}){
    const response = await fetch(`${API_URL}/auth/validate/`, {
        method : 'GET',
        headers : {
            'Authorization' : access_token
        }
    })
    
    return response.json()
}