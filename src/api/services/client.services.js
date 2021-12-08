import { apiHttp } from '../axiosApi'
import {
    clientAdminPath,
} from '../config/apiRoute'

export const saveClientApi = (data) => apiHttp('POST', `${clientAdminPath}`, data)
export const getAllClientApi = () => apiHttp('GET', `${clientAdminPath}/all`)
export const getClientsApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${clientAdminPath}`, null, options)
}
export const updateClientApi = (data, id) => apiHttp('PUT', `${clientAdminPath}/${id}`, data)
export const deleteClientApi = (id) => apiHttp('DELETE', `${clientAdminPath}/${id}`)
