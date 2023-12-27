import axios from 'axios'

//const API_URL = process.env.REACT_APP_API_URL

const API_URL = 'http://localhost:8000'

export async function login(username, password){
    const response = await axios.post(`${API_URL}/auth/token/`, {
        "username": username,
        "password": password
    })

    return response.data
}

export async function logout(refresh_token){
    const response = await axios.post(`${API_URL}/auth/blacklist/`, {
        refresh_token: refresh_token
    })
    return response.status
}

export async function register(username, password){
    const response = await axios.post(`${API_URL}/auth/register/`, {
        "username": username,
        "password": password
    })

    return response.status
}

export async function refreshToken(refresh_token){
    const response = await axios.post(`${API_URL}/auth/refresh/`, {
        refresh_token: refresh_token
    })
    return response.data
}

export async function valityToken(refresh_token){
    const response = await axios.post(`${API_URL}/auth/vality/`, {
        refresh_token: refresh_token
    })
    return response.data
}