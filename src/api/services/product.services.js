import { apiHttp } from '../axiosApi'
import {
    productPath,
    productAdminPath,
} from '../config/apiRoute'

export const searchProductsApi = (options) => apiHttp('GET', `${productPath}`, null, options)
export const getProductsApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${productAdminPath}`, null, options)
}
export const saveProductApi = (data) => apiHttp('POST', `${productAdminPath}`, data)
export const updateProductApi = (data, id) => apiHttp('POST', `${productAdminPath}/${id}`, data)
export const deleteProductApi = (id) => apiHttp('DELETE', `${productAdminPath}/${id}`)
