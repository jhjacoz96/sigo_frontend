import { apiHttp } from '../axiosApi'
import {
    saleClientAdminPath,
} from '../config/apiRoute'

export const getSaleClientsApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${saleClientAdminPath}`, null, options)
}
export const getClientSaleMonthApi = (params, id) => {
    let options = { params }
    return apiHttp('GET', `${saleClientAdminPath}/amouth-available/${id}`, null, options)
}
export const getPaysApi = (params, id) => {
    let options = { params }
    return apiHttp('GET', `${saleClientAdminPath}/historial-pay/${id}`, null, options)
}
export const saveSaleClientApi = (data) => apiHttp('POST', `${saleClientAdminPath}`, data)
