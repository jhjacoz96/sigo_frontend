import {
    loginApi,
} from '@/api/services'

const user = JSON.parse(localStorage.getItem('user'))
const organization = JSON.parse(localStorage.getItem('organization'))
const loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
const initialState = user && loggedIn
  ? { loggedInState: true, userState: user, organizationState: organization }
  : { loggedInState: false, userState: null, organizationState: null }

export default {
  namespaced: true,
  state: initialState,
  getters: {
    userGetter: (state) => state.userState,
    organizationGetter: (state) => state.organizationState,
    currencyGetter: (state) => state.organizationState.currency,
    loggedInGetter: (state) => state.loggedInState,
  },
  mutations: {
    LOGIN_SUCCESS (state, payload) {
      localStorage.setItem('token', payload.access_token)
      localStorage.setItem('expires_at', payload.expires_at)
      localStorage.setItem('user', JSON.stringify(payload.user))
      localStorage.setItem('organization', JSON.stringify(payload.organization))
      localStorage.setItem('loggedIn', true)
      state.loggedInState = true
      state.userState = payload.user
    },
    LOGIN_FAIL (state, payload) {
      state.userState = null
      state.organizationState = null
      state.loggedInState = false
    },
    UPDATE_PROFILE (state, payload) {
      var u = state.userState
      u.profile = payload
      localStorage.setItem('user', JSON.stringify(u))
    },
    UPDATE_ORGANIZATION (state, payload) {
      var o = state.organizationState
      o = payload
      localStorage.setItem('organization', JSON.stringify(o))
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
