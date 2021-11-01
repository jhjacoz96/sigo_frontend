import {
    loginApi,
} from '@/api/services'

const user = JSON.parse(localStorage.getItem('user'))
const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
const initialState = user && loggedIn
  ? { loggedInState: true, userState: user }
  : { loggedInState: false, userState: null }

export default {
  namespaced: true,
  state: initialState,
  getters: {
    userGetter: (state) => state.userState,
    loggedInGetter: (state) => state.loggedInState,
  },
  mutations: {
    LOGIN_SUCCESS (state, payload) {
      localStorage.setItem('token', payload.access_token)
      localStorage.setItem('expires_at', payload.expires_at)
      localStorage.setItem('user', JSON.stringify(payload.user))
      localStorage.setItem('loggedIn', true)
      state.loggedInState = true
      state.userState = payload.user
    },
    LOGIN_FAIL (state, payload) {
      state.userState = null
      state.loggedInState = false
    },
    UPDATE_PROFILE (state, payload) {
      const user = state.userState
      user.profile = payload
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
  actions: {
    async loginAction ({ commit }, payload) {
      const serviceResponse = await loginApi(payload)
      if (serviceResponse.ok === true) {
        commit('LOGIN_SUCCESS', serviceResponse.data)
      } else {
        commit('LOGIN_FAIL', serviceResponse.data)
      }
      return serviceResponse
    },
    logoutAction ({ commit }, payload) {
      localStorage.clear()
      commit('LOGIN_FAIL')
    },
  },
}
