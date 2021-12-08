<template>
  <v-card>
    <v-card-title class="my-3">
      Resumen
    </v-card-title>
    <v-card-text>
      <div class="d-flex justify-space-between mx-5">
        <span class="subtitle-1 grey--text">Precio total:</span>
        <span>{{ total | price }} {{ currencyGetter }}</span>
      </div>
    </v-card-text>
    <v-card-text>
      <v-divider />
    </v-card-text>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-card-text>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">
                    Tipo de pago
                  </v-col>
                  <v-col
                    cols="8"
                    class="text--secondary"
                  >
                    <v-fade-transition leave-absolute>
                      <span
                        v-if="open"
                        key="0"
                      >
                        Tipo de pago
                      </span>
                      <span
                        v-else
                        key="1"
                      >
                        {{ data.type_payment }}
                      </span>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-select
                v-model="data.type_payment"
                label="Tipo de pago *"
                outlined
                :rules="required_rules"
                :items="type_payment"
                dense
              />
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header v-slot="{ open }">
              <v-row no-gutters>
                <v-col cols="4">
                  Datos de envío
                </v-col>
                <v-col
                  cols="8"
                  class="text--secondary"
                >
                  <v-fade-transition leave-absolute>
                    <span
                      v-if="open"
                      key="0"
                    >
                      Dirección
                    </span>
                    <span
                      v-else
                      key="1"
                    >
                      {{ data.address_delivery }}
                    </span>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-spacer />
                <v-col
                  xl="12"
                  md="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="data.name_delivery"
                    label="Nombre *"
                    outlined
                    :rules="validation_rules_name"
                    dense
                  />
                </v-col>
                <v-col
                  xl="12"
                  md="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="data.phone_delivery"
                    label="Telefono *"
                    outlined
                    :rules="validation_rules_phone"
                    dense
                  />
                </v-col>
                <v-col
                  xl="12"
                  md="12"
                  sm="6"
                >
                  <v-text-field
                    v-model.lazy="data.cost_delivery"
                    v-money="money"
                    :rules="validation_rules_price"
                    label="Precio de envío *"
                    dense
                    :suffix="currencyGetter"
                    outlined
                  />
                </v-col>
                <v-col
                  xl="12"
                  md="12"
                  sm="6"
                >
                  <v-textarea
                    v-model="data.address_delivery"
                    :rules="validation_rules_address"
                    label="Dirección de envío *"
                    dense
                    outlined
                  />
                </v-col>
                <v-col
                  xl="12"
                  md="12"
                  sm="6"
                >
                  <v-textarea
                    v-model="data.comment_delivery"
                    label="Comentario adicional"
                    dense
                    outlined
                  />
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  :disabled="!valid || products.length <= 0 ? true : false || loadingState"
                  :loading="loadingState"
                  color="primary"
                  @click="saveOrder"
                >
                  realizar order
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { saveOrderApi } from '@/api/services'
  import { VMoney } from 'v-money'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import { $formatPrice } from '@/helpers/function'
  export default {
    name: 'StoreCartSummary',
    directives: { money: VMoney },
    mixins: [validationRules],
    props: {
      products: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        valid: true,
        type_payment: ['efectivo', 'transferencia', 'credito'],
        required_rules: [v => !!v || this.$t('validate.required')],
        data: {
          type_payment: '',
          client_id: null,
          total: 0,
          name_delivery: '',
          phone_delivery: '',
          cost_delivery: 0,
          address_delivery: '',
          comment_delivery: '',
          products: [],
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
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
      total () {
        var t = 0
        if (this.products.length > 0) {
          this.products.forEach(item => {
            t += item.product.price_sale * item.quantity
          })
        }
        return t
      },
    },
    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ALERT']),
      ...mapMutations('cart', ['REMOVE_CART']),
      async saveOrder () {
        if (this.$refs.form.validate()) {
          this.SET_LOADING(true)
          this.data.client_id = this.userState.profile.id
          this.data.total = this.total.toFixed(2)
          this.data.cost_delivery = $formatPrice(this.data.cost_delivery)
          console.log(this.data.cost_delivery)
          this.data.products = this.products.map(item => {
            return {
              product_id: item.product_id,
              quantity: item.quantity,
              price_sale: parseFloat(item.product.price_sale),
            }
          })
          const serviceResponse = await saveOrderApi(this.data)
          if (serviceResponse.ok) {
            this.REMOVE_CART()
            this.$router.push('/tienda/pedido')
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
          this.SET_LOADING(false)
        } else {
          this.SET_ALERT({
            text: 'Datos inválidos',
            color: 'warning',
          })
        }
      },
    },
  }
</script>
