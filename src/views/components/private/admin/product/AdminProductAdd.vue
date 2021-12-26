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
        <v-card-text>
          <v-row
            class="mx-auto"
            justify="space-around"
            style="max-width: 500px;"
          >
            <v-col
              cols="auto"
              class="text-center"
            >
              <base-image
                :image.sync="productData.image"
                :reset-image="dialogComputed"
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="productData.name"
                :rules="validation_rules_name"
                label="Nombre"
                dense
                outlined
              />
              <v-text-field
                v-model="productData.code"
                :rules="validation_rules_code"
                label="Código"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-select
                v-model="productData.category_id"
                :rules="validation_rules_category"
                :items="type_categories"
                item-value="id"
                item-text="name"
                label="Categorías"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model.lazy="productData.price_purchase"
                v-money="money"
                :rules="validation_rules_price"
                label="Precio de compra"
                dense
                :suffix="currencyGetter"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model.lazy="productData.price_sale"
                v-money="money"
                :rules="validation_rules_price"
                label="Precio de venta"
                dense
                :suffix="currencyGetter"
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model.number="productData.stock"
                :rules="validation_rules_stock"
                label="Stock"
                dense
                type="number"
                outlined
              />
            </v-col>
            <v-col
              v-if="indexEdit !== -1"
              cols="12"
              md="6"
            >
              <v-select
                v-model="productData.status"
                :rules="validation_rules_status"
                :items="status"
                item-value="value"
                item-text="name"
                label="Status"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-textarea
                v-model="productData.comment"
                :rules="validation_rules_comment"
                label="Descripción"
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
  import { saveProductApi, updateProductApi, getAllCategoriesApi } from '@/api/services'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { VMoney } from 'v-money'
  export default {
    name: 'AdminProductAdd',
    directives: { money: VMoney },
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      products: {
        type: Array,
        default: () => ([]),
      },
      product: {
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
        image: null,
        type_categories: [],
        status: [
          { name: 'Activo', value: 'A' },
          { name: 'Inactivo', value: 'I' },
        ],
        productData: {
          id: null,
          name: '',
          code: '',
          image: null,
          category_id: null,
          stock: 0,
          status: '',
          price_sale: 0,
          price_purchase: 0,
          comment: '',
        },
        productDataDefault: {
          id: null,
          name: '',
          code: '',
          image: null,
          category_id: null,
          stock: 0,
          status: '',
          price_sale: 0,
          price_purchase: 0,
          comment: '',
        },
        money: {
          decimal: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: true,
        },
      }
    },
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
      password () {
        return this.productData.password
      },
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
      productsComputed: {
        get () {
          return this.products
        },
        set (value) {
          this.$emit('update:products', value)
        },
      },
      productComputed: {
        get () {
          return this.productData
        },
        set (value) {
          this.$emit('update:product', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar producto' : 'Editar producto'
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.productData, this.product)
      },
    },
    created () {
      this.getCategories()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.productData.price_sale = 0
        this.productData.price_purchase = 0
        this.$nextTick(() => {
          this.$refs.form.reset()
          this.dialogComputed = false
          this.indexEditComputed = -1
          this.SET_LOADING(false)
        })
      },
      async getCategories () {
        const serviceResponse = await getAllCategoriesApi()
        if (serviceResponse.ok) {
          this.type_categories = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async saveItem () {
        if (this.validate) {
          this.SET_LOADING(true)
          const formData = new FormData()
          formData.append('id', this.productData.id)
          formData.append('code', this.productData.code)
          formData.append('name', this.productData.name)
          formData.append('image', this.productData.image && typeof this.productData.image === 'object' ? this.productData.image : null)
          formData.append('price_sale', this.formatPrice(this.productData.price_sale))
          formData.append('price_purchase', this.formatPrice(this.productData.price_purchase))
          formData.append('stock', this.productData.stock)
          formData.append('comment', this.productData.comment)
          formData.append('category_id', this.productData.category_id)
          if (this.indexEditComputed !== -1) {
            formData.append('_method', 'PUT')
            formData.append('status', this.productData.status)
          }
          const serviceResponse = this.indexEditComputed === -1 ? await saveProductApi(formData)
            : await updateProductApi(formData, this.productData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.productsComputed.push(serviceResponse.data) : Object.assign(this.productsComputed[this.indexEditComputed], serviceResponse.data)
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
            text: 'Formulario inválido.',
            color: 'warning',
          })
        }
      },
      formatPrice (value) {
        var removeComma = value.replace(/,/g, '')
        var formatNumber = parseFloat(removeComma).toFixed(2)
        return formatNumber
      },
    },
  }
</script>
