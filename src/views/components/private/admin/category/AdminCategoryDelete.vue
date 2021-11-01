<template>
  <v-dialog
    v-model="dialogComputed"
    max-width="400"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        :disabled="loadingState"
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="text-center">
        ¿Está seguro que desea realizar esta acción?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="loadingState"
          :loading="loadingState"
          color="primary"
          @click="deleteItem"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { deleteCategoryApi } from '@/api/services'
  export default {
    name: 'AdminCategoryDelete',
    props: {
      dialogDelete: {
        type: Boolean,
        default: false,
      },
      categories: {
        type: Array,
        default: () => ([]),
      },
      category: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
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
      categoryComputed: {
        get () {
          return this.category
        },
        set (value) {
          this.$emit('update:category', value)
        },
      },
      dialogComputed: {
        get () {
          return this.dialogDelete
        },
        set (value) {
          this.$emit('update:dialogDelete', value)
        },
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ALERT']),
      async deleteItem () {
        this.SET_LOADING(true)
        const serviceResponse = await deleteCategoryApi(this.categoryComputed.id)
        if (serviceResponse.ok) {
          var index = this.categoriesComputed.indexOf(this.categoryComputed)
          this.categoriesComputed.splice(index, 1)
          this.SET_ALERT({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.close()
        this.SET_LOADING(false)
      },
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.categoryComputed = {}
        })
      },
    },
  }
</script>
