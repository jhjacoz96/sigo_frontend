<template>
  <base-material-wizard
    v-model="tab"
    :available-steps="availableSteps"
    :items="tabs"
    class="mx-auto"
    :title="$route.params.id ? 'Editar gasto' : 'Realizar gasto'"
    icon="mdi-shopping"
    @click:next="next"
    @click:prev="tab--"
  >
    <v-tab-item class="pb-12">
      <admin-entry-add-form-general
        ref="adminEntryAddFormGeneral"
        :expense.sync="expense"
        :validate.sync="valid[0]"
      />
    </v-tab-item>

    <v-tab-item class="pb-12">
      <admin-entry-add-form-product
        ref="adminEntryAddFormProduct"
        :expense.sync="expense"
        :validate.sync="valid[1]"
      />
    </v-tab-item>
  </base-material-wizard>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { saveExpenseAdminApi, showExpenseAdminApi, updateExpenseAdminApi } from '@/api/services'
  export default {
    name: 'AdminEntryAddForm',
    components: {
      AdminEntryAddFormGeneral: () => import('./AdminEntryAddFormGeneral'),
      AdminEntryAddFormProduct: () => import('./AdminEntryAddFormProduct'),
    },
    data: () => ({
      valid: [true, false],
      dialog: false,
      expense: {
        type_payment: '',
        provider_id: null,
        total: 0,
        products: [],
      },
      tab: 0,
      tabs: ['Datos generales', 'Carrito'],
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
        if (this.valid[1]) {
          steps.includes(1) &&
            steps.push(2)
        }
        return steps
      },
    },
    created () {
      if (this.$route.params.id) {
        this.getExpense()
      }
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async next () {
        var v = await this.validateCurrentForm(this.getRefComponent())
        if (v) {
          this.validateForm(this.scope).then(async item => {
            if (!item) return
            if (this.tab === this.tabs.length - 1) {
              this.SET_LOADING(true)
              const serviceResponse = this.$route.params.id ? await updateExpenseAdminApi(this.expense.id, this.expense) : await saveExpenseAdminApi(this.expense)
              if (serviceResponse.ok) {
                this.SET_ALERT({
                  text: serviceResponse.message,
                  color: 'success',
                })
                this.$router.push('/admin/ingreso')
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
      async getExpense () {
        const serviceResponse = await showExpenseAdminApi(this.$route.params.id)
        console.log(serviceResponse)
        if (serviceResponse.ok) {
          this.expense = serviceResponse.data
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
            res = 'adminEntryAddFormGeneral'
            break
          default:
            res = 'adminEntryAddFormProduct'
            break
        }
        return res
      },
      async validateCurrentForm (refComponent) {
        const v = await this.$refs[refComponent].validateForm()
        return v
      },
      validateForm (scope) {
        return this.$validator.validateAll(scope)
      },
    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    bEntry-color: currentColor
    bEntry-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    bEntry-radius: 50%

</style>
