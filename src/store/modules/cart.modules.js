import {
    getAllCartApi,
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
      // state.cartState = payload.map(item => item.product_id)
      state.cartState = payload
    },
    SET_ITEM_CART (state, payload) {
        // const exitItem = state.cartState.includes(payload)
        // if (!exitItem) state.cartState.push(payload)
        console.log('cart', payload)
        const existItem = state.cartState.findIndex(item => item.id === payload.id)
        console.log('index', existItem)
        if (existItem >= 0) {
          state.cartState[existItem].quantity = payload.quantity
        } else {
           state.cartState.push(payload)
        }
    },
    REMOVE_ITEM_CART (state, payload) {
      state.cartState = state.cartState.filter(item => item.id !== payload)
    },
    REMOVE_CART (state, payload) {
      state.cartState = []
    },
  },
  actions: {
    async getCartAction ({ commit }, payload) {
      const serviceResponse = await getAllCartApi()
      if (serviceResponse.ok) {
        commit('SET_CART', serviceResponse.data)
      }
      return serviceResponse
    },
  },
}
