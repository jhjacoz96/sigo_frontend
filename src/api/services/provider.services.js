import { apiHttp } from '../axiosApi'
import {
    providerAdminPath,
} from '../config/apiRoute'

export const getProvidersApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${providerAdminPath}`, null, options)
}
export const getAllProvidersApi = () => apiHttp('GET', `${providerAdminPath}/all`)
export const saveProviderApi = (data) => apiHttp('POST', `${providerAdminPath}`, data)
export const updateProviderApi = (data, id) => apiHttp('PUT', `${providerAdminPath}/${id}`, data)
export const deleteProviderApi = (id) => apiHttp('DELETE', `${providerAdminPath}/${id}`)
