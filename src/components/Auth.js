import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function Auth() {
    const [token, setToken] = useState(getToken())
    const [user, setUser] = useState(getUser())
    const navigator = useNavigate()
    function getToken() {
        return JSON.parse(sessionStorage.getItem('token'));
    }
    function getUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }
    function logout() {
        sessionStorage.clear();
        navigator('/')
    }
    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token))
        sessionStorage.setItem('user', JSON.stringify(user))
        setToken(token)
        setUser(user)
        navigator('/student/view')
    }
    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers : {
            "Content-Type" : "application/json"
        }
    });
    return {
        http,
        saveToken,
        token,
        user,
        getToken,
        getUser,
        logout
    }
}