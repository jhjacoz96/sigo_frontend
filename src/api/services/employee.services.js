import { apiHttp } from '../axiosApi'
import {
    employeeAdminPath,
} from '../config/apiRoute'

export const saveEmployeeApi = (data) => apiHttp('POST', `${employeeAdminPath}`, data)
export const updateEmployeeApi = (data, id) => apiHttp('PUT', `${employeeAdminPath}/${id}`, data)
export const getEmployeesApi = (params) => {
    let options = { params }
    return apiHttp('GET', `${employeeAdminPath}`, null, options)
}
export const getEmployeeApi = () => apiHttp('GET', `${employeeAdminPath}`)
export const deleteEmployeeApi = (id) => apiHttp('DELETE', `${employeeAdminPath}/${id}`)
