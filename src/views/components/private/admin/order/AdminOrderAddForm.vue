<template>
  <base-material-wizard
    v-model="tab"
    :available-steps="availableSteps"
    :items="tabs"
    class="mx-auto"
    title="Realizar pedido"
    icon="mdi-shopping"
    @click:next="next"
    @click:prev="tab--"
  >
    <v-tab-item class="pb-12">
      <admin-order-add-form-general :city.sync="city" />
    </v-tab-item>

    <v-tab-item class="pb-12">
      <admin-order-add-form-product :city.sync="city" />
    </v-tab-item>

    <v-tab-item class="pb-12">
      dddd
    </v-tab-item>
  </base-material-wizard>
</template>

<script>
  export default {
    name: 'AdminOrderAddForm',
    components: {
      AdminOrderAddFormGeneral: () => import('./AdminOrderAddFormGeneral'),
      AdminOrderAddFormProduct: () => import('./AdminOrderAddFormProduct'),
    },
    data: () => ({
      order: 'ddd',
      account: [],
      accounts: [
        {
          icon: 'mdi-pencil',
          type: 'design',
        },
        {
          icon: 'mdi-code-tags',
          type: 'code',
        },
        {
          icon: 'mdi-laptop',
          type: 'develop',
        },
      ],
      address: '',
      city: 'caracas',
      email: '',
      first: '',
      image: null,
      last: '',
      state: '',
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      street: '',
      tab: 0,
      tabs: ['Datos generales', 'Carrito'],
    }),
    computed: {
      stringAccount () {
        return this.account.join(',')
      },
      scope () {
        if (this.tab === 0) return 'Datos generales'
        return 'Carrito'
      },
      availableSteps () {
        const steps = [0]

        steps.push(1)

        steps.push(2)

        return steps
      },
    },

    methods: {
      next () {
        this.validateForm(this.scope).then(item => {
          if (!item) return

          if (this.tab === this.tabs.length - 1) {
            alert('Form finished')
          } else {
            this.tab++
          }
        })
      },
      onChange (val) {
        const value = val.target.files[0]

        if (!value) return (this.image = null)

        this.image = URL.createObjectURL(value)
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
