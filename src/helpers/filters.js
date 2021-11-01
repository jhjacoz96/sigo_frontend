function price (value) {
    return value.toFixed(2)
}

export default {
    install (Vue) {
        Vue.filter('price', price)
    },
}
