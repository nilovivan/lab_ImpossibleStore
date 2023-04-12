import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await  $host.post('api/user/registration', { email,password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await  $host.post('api/user/login', { email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await  $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const add_to_cart = async (productId) => {
    const {data} = await  $authHost.post('api/user/add-product-to-cart', {productId})
    return data
}

export const remove_from_cart = async (productId) => {
    const { data } = await $authHost.delete('api/user/remove-product-from-cart', {
      data: { productId }
    });
    return data;
  }

export const cart_content = async () => {
    const {data} = await  $authHost.get('api/user/cart-content')
    return data
}

export const discount = async (code) => {
    const {data} = await  $authHost.post('api/user/discount', {code})
    return data
}

export const update_email = async (new_email, password) => {
    const {data} = await  $authHost.post('api/user/change-email', {new_email,password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

