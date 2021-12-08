import { apiHttp } from '../axiosApi'
import {
    categoryAdminPath,
} from '../config/apiRoute'

export const getCategoriesApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${categoryAdminPath}`, null, options)
}
export const getAllCategoriesApi = () => apiHttp('GET', `${categoryAdminPath}/all`)
export const saveCategoryApi = (data) => apiHttp('POST', `${categoryAdminPath}`, data)
export const updateCategoryApi = (data, id) => apiHttp('PUT', `${categoryAdminPath}/${id}`, data)
export const deleteCategoryApi = (id) => apiHttp('DELETE', `${categoryAdminPath}/${id}`)
