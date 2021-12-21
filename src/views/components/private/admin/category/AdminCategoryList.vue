<template>
  <!-- <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
  >
    <template v-slot:item.accion="{ item }">
      <v-btn
        fab
        x-small
        color="warning"
        @click="item"
      >
        <v-icon>mdi-edit</v-icon>
      </v-btn>
      <v-btn
        fab
        x-small
        color="pink"
        @click="item"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table> -->
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <v-text-field
          v-model="search"
          dense
          outlined
          label="Buscar"
          color="secondary"
          clearable
          :append-outer-icon="'mdi-magnify'"
          @keydown.enter.prevent="searchItem"
          @click:append-outer="searchItem"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="categoriesComputed"
        :loading="loadingState"
        :search="search"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :mobile-breakpoint="0"
        :items-per-page="per"
        disable-sort
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('category.edit')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('category.delete')"
            color="primary"
            small
            icon
            class="ml-1"
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <admin-category-delete
        :dialog-delete.sync="dialogDelete"
        :category.sync="category"
        :categories.sync="categories"
      />
      <admin-category-add
        :dialog.sync="dialog"
        :category.sync="category"
        :index-edit.sync="indexEdit"
        :categories.sync="categories"
      />
    </v-card>
  </v-container>
</template>
<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getCategoriesApi } from '@/api/services'
  export default {
    name: 'AdminCategoryList',
    components: {
      AdminCategoryDelete: () => import('./AdminCategoryDelete'),
      AdminCategoryAdd: () => import('./AdminCategoryAdd'),
    },
    mixins: [pagination],
    props: {
      categories: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        headers: [
          {
            text: 'Categoría',
            align: 'center',
            value: 'name',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        category: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['canPermissionsGetter']),
      categoriesComputed: {
        get () {
          return this.categories
        },
        set (value) {
          this.$emit('update:categories', value)
        },
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.categoriesComputed = []
          this.getCategories()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      searchItem () {
        this.categoriesComputed = []
        this.options.itemsPerPage = this.per
        this.options.page = 1
        this.totalItems = 0
        this.numberOfPages = 0
        this.getCategories()
      },
      async getCategories () {
        this.SET_LOADING(true)
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
          search: this.search,
        }
        const serviceResponse = await getCategoriesApi(params)
        if (serviceResponse.ok) {
          this.categoriesComputed = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      editedItem (item) {
        this.dialog = true
        Object.assign(this.category, item)
        this.indexEdit = this.categoriesComputed.indexOf(item)
      },
      deleteItem (item) {
        this.dialogDelete = true
        Object.assign(this.category, item)
      },
    },
  }
</script>
