import {
    getCartApi,
} from '@/api/services'

export default {
  namespaced: true,
  state: {
    cartState: [],
  },
  getters: {
    countCartGetter: (state) => state.cartState.length,
  },
  mutations: {
    SET_CART (state, payload) {
        state.cartState = payload.map(item => item.product_id)
    },
    SET_ITEM_CART (state, payload) {
        const exitItem = state.cartState.includes(payload)
        if (!exitItem) state.cartState.push(payload)
    },
    REMOVE_ITEM_CART (state, payload) {
        const exitItem = state.cartState.includes(payload)
        if (exitItem) state.cartState = state.cartState.filter(item => item !== payload)
    },
    REMOVE_CART (state, payload) {
      state.cartState = []
    },
  },
  actions: {
    async getCartAction ({ commit }, payload) {
      const serviceResponse = await getCartApi()
      if (serviceResponse.ok) {
        commit('SET_CART', serviceResponse.data)
      }
      return serviceResponse
    },
  },
}
