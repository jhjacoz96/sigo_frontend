import { apiHttp } from '../axiosApi'
import {
    cartPath,
} from '../config/apiRoute'

export const addCartApi = (data) => apiHttp('POST', `${cartPath}`, data)
export const getCartApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${cartPath}`, null, options)
}
export const getAllCartApi = () => apiHttp('GET', `${cartPath}/all`)
export const deleteCartApi = (id) => apiHttp('DELETE', `${cartPath}/${id}`)
export const allDeleteCartApi = (id) => apiHttp('DELETE', `all/${cartPath}/${id}`)
