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

export async function register(username, password){
    const response = await axios.post(`${API_URL}/auth/register/`, {
        "username": username,
        "password": password
    })

    return response.status
}

export async function verifyToken(access_token){
    if (access_token == null){
        throw new Error(400)
    }

    const response = await axios.post(`${API_URL}/auth/verify/`, {
        "access_token": access_token
    })
    return response.status
}