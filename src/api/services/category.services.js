import { apiHttp } from '../axiosApi'
import {
    categoryAdminPath,
} from '../config/apiRoute'

export const getCategoriesApi = () => apiHttp('GET', `${categoryAdminPath}`)
export const saveCategoryApi = (data) => apiHttp('POST', `${categoryAdminPath}`, data)
export const updateCategoryApi = (data, id) => apiHttp('PUT', `${categoryAdminPath}/${id}`, data)
export const deleteCategoryApi = (id) => apiHttp('DELETE', `${categoryAdminPath}/${id}`)
