<template>
  <base-material-wizard
    v-model="tab"
    :available-steps="availableSteps"
    :items="tabs"
    class="mx-auto"
    :title="$route.params.id ? 'Editar pedido' : 'Realizar pedido'"
    icon="mdi-shopping"
    @click:next="next"
    @click:prev="tab--"
  >
    <v-tab-item class="pb-12">
      <admin-order-add-form-general
        ref="adminOrderAddFormGeneral"
        :order.sync="order"
        :validate.sync="valid[0]"
      />
    </v-tab-item>
    <v-tab-item class="pb-12">
      <admin-order-add-form-delivery
        ref="adminOrderAddFormDelivery"
        :order.sync="order"
        :validate.sync="valid[1]"
      />
    </v-tab-item>
    <v-tab-item class="pb-12">
      <admin-order-add-form-product
        ref="adminOrderAddFormProduct"
        :order.sync="order"
        :validate.sync="valid[2]"
      />
    </v-tab-item>
  </base-material-wizard>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { saveOrderApi, showOrderAdminApi, updateOrderAdminApi, getLastIndexOrderAdminApi } from '@/api/services'
  import { $formatPrice } from '@/helpers/function'
  export default {
    name: 'AdminOrderAddForm',
    components: {
      AdminOrderAddFormGeneral: () => import('./AdminOrderAddFormGeneral'),
      AdminOrderAddFormDelivery: () => import('./AdminOrderAddFormDelivery'),
      AdminOrderAddFormProduct: () => import('./AdminOrderAddFormProduct'),
    },
    data: () => ({
      valid: [true, true, false],
      dialog: false,
      order: {
        type_payment: '',
        name_delivery: '',
        phone_delivery: '',
        cost_delivery: 0,
        address_delivery: '',
        comment_delivery: '',
        code: 0,
        client_id: null,
        total: 0,
        products: [],
        commune: '',
      },
      tab: 0,
      tabs: ['Datos generales', 'Datos de envío', 'Carrito'],
    }),
    computed: {
      ...mapState(['loadingState']),
      scope () {
        if (this.tab === 0) return 'Datos generales'
        return 'Carrito'
      },
      availableSteps () {
        const steps = [0]
        if (this.valid[0]) steps.push(1)
        if (
          this.valid[1] &&
          steps.includes(0)
        ) {
          steps.push(2)
        }
        if (
          this.valid[2] &&
          steps.includes(1)
        ) {
          steps.push(3)
        }
        return steps
      },
    },
    created () {
      if (this.$route.params.id) {
        this.getOrder()
      } else {
        this.getLastIndexOrder()
      }
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      next () {
        var v = this.validateCurrentForm(this.getRefComponent())
        if (v) {
          this.validateForm(this.scope).then(async item => {
            if (!item) return
            if (this.tab === this.tabs.length - 1) {
              this.order.cost_delivery = $formatPrice(this.order.cost_delivery)
              this.SET_LOADING(true)
              const serviceResponse = this.$route.params.id ? await updateOrderAdminApi(this.order.id, this.order) : await saveOrderApi(this.order)
              if (serviceResponse.ok) {
                this.SET_ALERT({
                  text: serviceResponse.message,
                  color: 'success',
                })
                this.$router.push('/admin/pedido')
              } else {
                this.SET_ALERT({
                  text: serviceResponse.message.text,
                  color: 'warning',
                })
              }
              this.SET_LOADING(false)
            } else {
              this.tab++
            }
          })
        }
      },
      async getLastIndexOrder () {
        const serviceResponse = await getLastIndexOrderAdminApi()
        if (serviceResponse.ok) {
          this.order.code = `P000${serviceResponse.data}`
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async getOrder () {
        const serviceResponse = await showOrderAdminApi(this.$route.params.id)
        if (serviceResponse.ok) {
          this.order = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      getRefComponent () {
        var res
        switch (this.tab) {
          case 0:
            res = 'adminOrderAddFormGeneral'
            break
          case 1:
            res = 'adminOrderAddFormDelivery'
            break
          default:
            res = 'adminOrderAddFormProduct'
            break
        }
        return res
      },
      validateCurrentForm (refComponent) {
        return this.$refs[refComponent].validateForm()
      },
      validateForm (scope) {
        return this.$validator.validateAll(scope)
      },
    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    border-color: currentColor
    border-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    border-radius: 50%

</style>
