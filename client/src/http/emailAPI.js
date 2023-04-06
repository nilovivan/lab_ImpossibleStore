import { $host, $authEmailHost } from "./index";
import jwt_decode from "jwt-decode";

export const email_registration = async (email, password) => {
    const {data} = await  $host.post('api/mail/register', { email,password})
    localStorage.setItem('email_token', data.token)
    return jwt_decode(data.token)
}

export const email_login = async (email, password) => {
    const {data} = await  $host.post('api/mail/login', { email,password})
    localStorage.setItem('email_token', data.token)
    return jwt_decode(data.token)
}

export const fetchMessages = async () => {
    const {data} = await $authEmailHost.get('api/mail',)
    return data
}

export const fetchOneMessage = async (id) => {
    const {data} = await $authEmailHost.get('api/mail/' + id)
    return data
}

export const check_email = async () => {
    const {data} = await  $authEmailHost.get('api/mail/auth')
    localStorage.setItem('email_token', data.token)
    return jwt_decode(data.token)
}
