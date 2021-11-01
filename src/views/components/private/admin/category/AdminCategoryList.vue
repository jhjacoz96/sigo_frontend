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
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="categoriesComputed"
        :loading="loadingState"
        :search="search"
        :items-per-page="5"
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
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
  import { mapMutations, mapState } from 'vuex'
  import { getCategoriesApi } from '@/api/services'
  export default {
    name: 'AdminCategoryList',
    components: {
      AdminCategoryDelete: () => import('./AdminCategoryDelete'),
      AdminCategoryAdd: () => import('./AdminCategoryAdd'),
    },
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
      categoriesComputed: {
        get () {
          return this.categories
        },
        set (value) {
          this.$emit('update:categories', value)
        },
      },
    },
    created () {
      this.getCategories()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getCategories () {
        this.SET_LOADING(true)
        const serviceResponse = await getCategoriesApi()
        if (serviceResponse) {
          this.categoriesComputed = serviceResponse.data
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
