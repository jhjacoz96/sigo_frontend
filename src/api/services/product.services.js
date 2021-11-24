import { apiHttp } from '../axiosApi'
import {
    productPath,
    productAdminPath,
} from '../config/apiRoute'

export const searchProductsApi = (options) => apiHttp('GET', `${productPath}`, null, options)
export const getProductsApi = (data) => apiHttp('GET', `${productAdminPath}`)
export const saveProductApi = (data) => apiHttp('POST', `${productAdminPath}`, data)
export const updateProductApi = (data, id) => apiHttp('POST', `${productAdminPath}/${id}`, data)
export const deleteProductApi = (id) => apiHttp('DELETE', `${productAdminPath}/${id}`)
