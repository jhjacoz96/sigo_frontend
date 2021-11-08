import { apiHttp } from '../axiosApi'
import {
    roleAdminPath,
} from '../config/apiRoute'

export const getRolesApi = () => apiHttp('GET', `${roleAdminPath}`)
export const getPermissionsApi = () => apiHttp('GET', `${roleAdminPath}/permission`)
export const saveRoleApi = (data) => apiHttp('POST', `${roleAdminPath}`, data)
export const updateRoleApi = (data, id) => apiHttp('PUT', `${roleAdminPath}/${id}`, data)
export const deleteRoleApi = (id) => apiHttp('DELETE', `${roleAdminPath}/${id}`)
