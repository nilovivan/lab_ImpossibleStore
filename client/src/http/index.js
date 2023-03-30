import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authEmailHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

const authEmailInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('email_token')}`
    return config
}

$authEmailHost.interceptors.request.use(authEmailInterceptor)
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $authEmailHost
}
