import { apiHttp } from '../axiosApi'
import {
    orderPath,
    orderAdminPath,
} from '../config/apiRoute'

export const saveOrderApi = (data) => apiHttp('POST', `${orderPath}`, data)
export const getOrdersApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${orderPath}`, null, options)
}
export const getOrdersAdminApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${orderAdminPath}`, null, options)
}
export const deleteOrderAdminApi = (id) => apiHttp('DELETE', `${orderAdminPath}/${id}`)
export const showOrderAdminApi = (id) => apiHttp('GET', `${orderAdminPath}/${id}`)
export const getLastIndexOrderAdminApi = () => apiHttp('GET', `${orderAdminPath}/index-code`)
export const updateOrderAdminApi = (id, data) => apiHttp('PUT', `${orderAdminPath}/${id}`, data)
export const updateOrderStatusAdminApi = (id, data) => apiHttp('PUT', `${orderAdminPath}/${id}/status`, data)
