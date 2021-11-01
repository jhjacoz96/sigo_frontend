<template>
  <div class="text-center mt-6">
    <v-pagination
      v-model="paginateCurrent.currentPage"
      :length="paginateCurrent.lastPage"
      :total-visible="6"
      @input="changePage"
    />
  </div>
</template>

<script>
  export default {
    name: 'BasePaginate',
    props: {
      paginate: {
        type: Object,
        default: () => ({
          total: 0,
          currentPage: 1,
          perPage: 0,
          lastPage: 0,
          fromPage: 0,
          to: 0,
        }),
      },
      page: {
        type: Number,
        default: 1,
      },
    },
    data () {
      return {
        sizePage: 10,
        offset: 3,
      }
    },
    computed: {
      paginateCurrent: {
        get () {
          return this.paginate
        },
        set (value) {
          this.$emit('paginate:update', value)
        },
      },
      pagesNumber () {
        if (!this.paginateCurrent.to) return 0
        var from = this.paginateCurrent.currentPage - this.offset
        if (from < 1) from = 1
        var to = from + (this.offset + 2)
        if (to >= this.paginateCurrent.lastPage) to = this.paginateCurrent.lastPage
        var pageArray = []
        while (from <= to) {
          pageArray.push(from)
          from++
        }

        return pageArray.length
      },
    },
    methods: {
      changePage (page) {
        this.paginateCurrent.currentPage = page
        this.$emit('change:paginate', page)
      },
    },
  }
</script>
