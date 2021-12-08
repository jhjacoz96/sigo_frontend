<template>
  <v-container class="justify-center">
    <!-- <div class="text-center display-1 font-weight-light mb-6">
      Información general de del pedido
    </div> -->
    <div class="d-flex mb-1">
      <div class="font-weight-medium mr-2">
        CÓDIGO DE PEDIDO:
      </div>
      <div> {{ order.code }} </div>
    </div>
    <v-divider />
    <v-row justify="center">
      <v-col
        cols="10"
        md="6"
      >
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-select
            v-model="orderComputed.type_payment"
            :rules="validation_rules_type_payment"
            label="Tipo de pago"
            outlined
            :items="type_payments"
          />
          <v-autocomplete
            v-model="orderComputed.client_id"
            :disabled="$route.params.id ? true : false"
            :rules="validation_rules_client"
            :items="clients"
            :loading="isLoading"
            :search-input.sync="autocompleteClient"
            outlined
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            label="Nombre del cliente"
            placeholder="Ingrese el documento de identidad..."
          />
        </v-form>
      </v-col>
    </v-row>
    <v-card
      v-if="model"
    >
      <v-card-title>
        Datos del cliente
      </v-card-title>
      <v-card-text>
        <v-row class="justify-space-between">
          <v-col
            v-for="(detail, i) in details"
            :key="i"
            cols="6"
            md="4"
          >
            <div>{{ detail.value }}</div>
            <div class="grey--text">
              {{ detail.key }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { getAllClientApi } from '@/api/services'
  import { mapMutations } from 'vuex'
  export default {
    name: 'AdminOrderAddFormClient',
    mixins: [validationRules],
    props: {
      order: {
        type: Object,
        default: () => ({}),
      },
      validate: {
        type: Boolean,
        default: () => ({}),
      },
    },
    data: () => ({
      valid: true,
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      autocompleteClient: null,
      clients: [],
      details: undefined,
      type_payments: ['efectivo', 'transferencia', 'credito'],
    }),
    computed: {
      orderComputed: {
        get () {
          return this.order
        },
        set (value) {
          this.$emit('update:order', value)
        },
      },
      validateComputed: {
        get () {
          return this.validate
        },
        set (value) {
          this.$emit('update:validate', value)
        },
      },
      fields () {
        if (!this.model) return []
        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      },
    },
    watch: {
      model (val) {
        if (!val) this.details = []
        this.details = Object.keys(val).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      valid (val) {
        this.validateComputed = val
      },
      /* autocompleteClient (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            // console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }, */
    },
    created () {
      this.getClients()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getClients () {
        const serviceResponse = await getAllClientApi()
        if (serviceResponse.ok) {
          this.clients = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      validateForm () {
        return this.$refs.form.validate()
      },
    },
  }
</script>
