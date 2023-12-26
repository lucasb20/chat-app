import axios from 'axios'

//const API_URL = process.env.REACT_APP_API_URL

const API_URL = 'http://localhost:8000'

export async function login(username, password){
    data = {
        "username": username,
        "password": password
    }
    const response = await axios.post(`${API_URL}/auth/token/`, data)

    return response.data
}

export async function logout(refresh_token){
    data = {
        refresh_token: refresh_token
    }
    const response = await axios.post(`${API_URL}/auth/blacklist/`, data)
    return response.status
}

export async function register(username, password){
    data = {
        "username": username,
        "password": password
    }
    const response = await axios.post(`${API_URL}/auth/register/`, data)

    return response.status
}

export async function refreshToken(refresh_token){
    data = {
        refresh_token: refresh_token
    }
    const response = await axios.post(`${API_URL}/auth/refresh/`, data)
    return response.data
}

export async function valityToken(refresh_token){
    data = {
        refresh_token: refresh_token
    }
    const response = await axios.post(`${API_URL}/auth/vality/`, data)
    return response.data
}