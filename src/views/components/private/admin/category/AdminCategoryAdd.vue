<template>
  <v-dialog
    v-model="dialogComputed"
    max-width="700"
    persistent
  >
    <v-card>
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text class="mt-2">
          <v-row
            class="mx-auto"
            justify="center"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="categoryData.name"
                :rules="validation_rules_name"
                label="Nombre"
                dense
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="!valid || loadingState"
            :loading="loadingState"
            @click="saveItem()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { saveCategoryApi, updateCategoryApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminCategoryAdd',
    mixins: [validationRules],
    props: {
      dialog: {
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
      indexEdit: {
        type: Number,
        default: -1,
      },
    },
    data () {
      return {
        valid: true,
        categoryData: {
          id: null,
          name: '',
        },
      }
    },
    computed: {
      ...mapState(['loadingState']),
      validate () {
        return this.$refs.form.validate()
      },
      indexEditComputed: {
        get () {
          return this.indexEdit
        },
        set (value) {
          this.$emit('update:indexEdit', value)
        },
      },
      dialogComputed: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        },
      },
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
          return this.categoryData
        },
        set (value) {
          this.$emit('update:category', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar categoria' : 'Editar categoria'
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.categoryData, this.category)
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.$refs.form.reset()
          this.indexEditComputed = -1
          this.categoryComputed = {}
          this.SET_LOADING(false)
        })
      },
      async saveItem () {
        if (this.validate) {
          this.SET_LOADING(true)
          const serviceResponse = this.indexEditComputed === -1 ? await saveCategoryApi(this.categoryData)
            : await updateCategoryApi(this.categoryData, this.categoryData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.categoriesComputed.push(serviceResponse.data) : Object.assign(this.categoriesComputed[this.indexEditComputed], serviceResponse.data)
            this.SET_ALERT({
              text: serviceResponse.message,
              color: 'success',
            })
            this.close()
          } else {
            this.SET_ALERT({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
          this.SET_LOADING(false)
        } else {
          this.SET_ALERT({
            text: 'Formulario inválido',
            color: 'warning',
          })
        }
      },
    },
  }
</script>
