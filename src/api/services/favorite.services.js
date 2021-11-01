import { apiHttp } from '../axiosApi'
import {
    favoritePath,
} from '../config/apiRoute'

export const saveFavoriteApi = (data) => apiHttp('POST', `${favoritePath}`, data)
export const getFavoritesApi = (data) => apiHttp('GET', `${favoritePath}`)
