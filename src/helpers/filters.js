function price (value) {
    return `${value} $`
}

export default {
    install (Vue) {
        Vue.filter('price', price)
    },
}
