function price (value) {
    return parseFloat(value).toFixed(2)
}

export default {
    install (Vue) {
        Vue.filter('price', price)
    },
}
