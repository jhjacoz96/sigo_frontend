import { apiHttp } from '../axiosApi'
import {
    clientAdminPath,
} from '../config/apiRoute'

export const saveClientApi = (data) => apiHttp('POST', `${clientAdminPath}`, data)
export const getClientsApi = () => apiHttp('GET', `${clientAdminPath}`)
export const updateClientApi = (data, id) => apiHttp('PUT', `${clientAdminPath}/${id}`, data)
export const deleteClientApi = (id) => apiHttp('DELETE', `${clientAdminPath}/${id}`)
