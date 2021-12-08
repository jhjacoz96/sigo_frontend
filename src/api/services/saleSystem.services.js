import { apiHttp } from '../axiosApi'
import {
    saleSystemAdminPath,
} from '../config/apiRoute'

export const getDashboardApi = () => apiHttp('GET', `${saleSystemAdminPath}/dashboard`)
