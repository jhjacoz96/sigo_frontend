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
    typeAuthGetter: (state) => state.userState ? state.userState.modelAssociate : null,
    organizationGetter: (state) => state.organizationState,
    currencyGetter: (state) => state.organizationState.currency,
    permissionsGetter: (state) => {
      if (state.userState.modelAssociate === 'Client') return []
      return state.userState.profile.role.permissions
    },
    permissionsDrawerGetter: (state, getters) => {
      if (state.userState.modelAssociate === 'Client') return []
      var items = getters.permissionsGetter.filter(item => item.level === '1').map(item => item.name)
      items.push('home')
      if (
        items.includes('category.index') &&
        items.includes('product.index')
      ) items.push('inventary')
      if (
        items.includes('expense.index') &&
        items.includes('provider.index')
      ) items.push('purchase')
      if (
        items.includes('client.index') &&
        items.includes('employee.index') &&
        items.includes('role.index')
      ) items.push('user')
      return items
    },
    permissionsNameGetter: (state, getters) => {
      if (state.userState.modelAssociate === 'Client') return []
      var items = getters.permissionsGetter.map(item => item.name)
      return items
    },
    canPermissionsGetter: (state, getters) => (value) => {
      return getters.permissionsNameGetter.includes(value)
    },
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
      state.organizationState = payload.organization
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
