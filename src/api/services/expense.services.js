import { apiHttp } from '../axiosApi'
import {
    expenseAdminPath,
} from '../config/apiRoute'

export const saveExpenseAdminApi = (data) => apiHttp('POST', `${expenseAdminPath}`, data)
export const getExpensesAdminApi = (params) => {
    var options = { params }
    return apiHttp('GET', `${expenseAdminPath}`, null, options)
}
export const deleteExpenseAdminApi = (id) => apiHttp('DELETE', `${expenseAdminPath}/${id}`)
export const showExpenseAdminApi = (id) => apiHttp('GET', `${expenseAdminPath}/${id}`)
export const updateExpenseAdminApi = (id, data) => apiHttp('PUT', `${expenseAdminPath}/${id}`, data)
