import { apiHttp } from '../axiosApi'
import {
    organizationAdminPath,
} from '../config/apiRoute'

export const getOrganizationsApi = () => apiHttp('GET', `${organizationAdminPath}`)
export const saveOrganizationApi = (data) => apiHttp('POST', `${organizationAdminPath}`, data)
