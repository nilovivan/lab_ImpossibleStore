import {$authHost, $host} from "./index";

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/product', device)
    return data
}

export const fetchDevices = async (page, limit) => {
    const {data} = await $host.get('api/product', {params: {
            page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}
