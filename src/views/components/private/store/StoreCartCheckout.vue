<template>
  <div>
    <base-material-card
      icon="mdi-cart"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Checkout
        </div>
        <div class="red--text">
          Complete el formulario para confirmar el pedido
        </div>
      </template>
      <v-card-text class="text-end">
        <span class="subtitle-1 grey--text d-block">Precio total:</span>
        <span class="d-block">{{ total | price }} {{ currencyGetter }}</span>
      </v-card-text>
      <v-card-text>
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
                  <v-row justify="center">
                    <v-col
                      sm="6"
                      cols="12"
                    >
                      <v-select
                        v-model="data.type_payment"
                        label="Tipo de pago *"
                        outlined
                        :rules="required_rules"
                        :items="type_payment"
                        dense
                      />
                    </v-col>
                  </v-row>
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
                  <v-row justify="center">
                    <v-col
                      lg="12"
                      sm="4"
                      cols="12"
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
                      lg="12"
                      sm="4"
                      cols="12"
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
                      lg="12"
                      sm="4"
                      cols="12"
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
                      cols="12"
                    >
                      <v-select
                        v-model="data.commune"
                        label="Comuna *"
                        outlined
                        :items="communes"
                        item-text="label"
                        item-value="value"
                        :rules="validation_rules_commune"
                        dense
                      />
                    </v-col>
                    <v-col
                      cols="12"
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
                      cols="12"
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
                      :disabled="!valid || cartState.length <= 0 ? true : false || loadingState"
                      :loading="loadingState"
                      color="primary"
                      @click="saveOrder"
                    >
                      Realizar pedido
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-form>
      </v-card-text>
    </base-material-card>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { validationRules } from '@/mixins/validationRules'
  import { saveOrderApi } from '@/api/services'
  import { VMoney } from 'v-money'
  import { $formatPrice } from '@/helpers/function'
  export default {
    name: 'StoreCartCheckout',
    directives: { money: VMoney },
    mixins: [validationRules],
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
          commune: '',
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
        products: [],
        communes: [
          {
            label: 'VIÑA DEL CENTRO',
            value: 'vina_del_centro',
          },
          {
            label: 'VIÑA DEL MAR ALTO',
            value: 'vina_del_mar_alto',
          },
          {
            label: 'REÑACA',
            value: 'renaca',
          },
          {
            label: 'CONCÓN',
            value: 'concon',
          },
          {
            label: 'VALPARAISO',
            value: 'valparaiso',
          },
          {
            label: 'QUILPUÉ',
            value: 'quilpue',
          },
          {
            label: 'VILLA ALENAMA',
            value: 'villa_alemana',
          },
          {
            label: 'PLACILLA',
            value: 'placilla',
          },
          {
            label: 'CERRILLOS',
            value: 'cerrillos',
          },
          {
            label: 'CERRO NAVIA',
            value: 'cerro_navia',
          },
          {
            label: 'CONCHALI',
            value: 'conchali',
          },
          {
            label: 'EL BOSQUE',
            value: 'el_bosque',
          },
          {
            label: 'ESTACIÓN CENTRAL',
            value: 'estacion_central',
          },
          {
            label: 'HUECHURABA',
            value: 'huechuraba',
          },
          {
            label: 'INDEPENDENCIA',
            value: 'independencia',
          },
          {
            label: 'LA CISTERNA',
            value: 'la_cisterna',
          },
          {
            label: 'LA FLORIDA',
            value: 'la_florida',
          },
          {
            label: 'LA GRANJA',
            value: 'la_granja',
          },
          {
            label: 'LA PINTANA',
            value: 'la_pintana',
          },
          {
            label: 'LA REINA',
            value: 'la_reina',
          },
          {
            label: 'LAS CONDES',
            value: 'las_condes',
          },
          {
            label: 'LO BARNECHEA',
            value: 'lo_barnechea',
          },
          {
            label: 'LO ESPEJO',
            value: 'lo_espejo',
          },
          {
            label: 'LO PRADO',
            value: 'lo_prado',
          },
          {
            label: 'MACUL',
            value: 'macul',
          },
          {
            label: 'MAIPU',
            value: 'maipu',
          },
          {
            label: 'ÑUÑOA',
            value: 'nunoa',
          },
          {
            label: 'PUÑAFLOR',
            value: 'punaflor',
          },
          {
            label: 'PEDRO A. CERDA',
            value: 'pedro_a_cerda',
          },
          {
            label: 'PEÑALOLEN',
            value: 'penalolen',
          },
          {
            label: 'PROVIDENCIA',
            value: 'provicencia',
          },
          {
            label: 'PUDAHUEL',
            value: 'pudahuel',
          },
          {
            label: 'QUILICURA',
            value: 'quilicura',
          },
          {
            label: 'QUINTA NORMAL',
            value: 'quinta_normal',
          },
          {
            label: 'RECOLETA',
            value: 'recoleta',
          },
          {
            label: 'RENCA',
            value: 'renca',
          },
          {
            label: 'SAN JOAQUIN',
            value: 'san_joaquin',
          },
          {
            label: 'SAN MIGUEL',
            value: 'san_miguel',
          },
          {
            label: 'SAN RAMON',
            value: 'san_ramon',
          },
          {
            label: 'SANTIAGO CENTRO',
            value: 'santiago_centro',
          },
          {
            label: 'VITACURA',
            value: 'vitacura',
          },
          {
            label: 'PUENTE ALTO',
            value: 'puente_alto',
          },
          {
            label: 'SAN BERNARDO',
            value: 'san_bernardo',
          },
          {
            label: 'BUIN',
            value: 'buin',
          },
          {
            label: 'LAMPA',
            value: 'lampa',
          },
          {
            label: 'COLINA',
            value: 'colina',
          },
          {
            label: 'PADRE HURTADO',
            value: 'padre_hurtado',
          },
        ],
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      ...mapState('cart', ['cartState']),
      ...mapGetters('auth', ['currencyGetter']),
      ...mapState(['loadingState']),
      total () {
        var t = 0
        if (this.cartState.length > 0) {
          this.cartState.forEach(item => {
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
          this.data.products = this.cartState.map(item => {
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
