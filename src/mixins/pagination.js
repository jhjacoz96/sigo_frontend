export const pagination = {
    data () {
        return {
            options: {},
            totalItems: 0,
            numberOfPages: 0,
            footerProps: { 'items-per-page-options': [5, 10, 25] },
            per: 10,
        }
    },
    methods: {
        paginate (paginate) {
            this.totalItems = paginate.total
            this.numberOfPages = paginate.lastPage
        },
    },
}
