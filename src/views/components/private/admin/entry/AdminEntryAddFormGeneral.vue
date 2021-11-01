<template>
  <v-container class="justify-center">
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
            v-model="expenseComputed.type_payment"
            :rules="validation_rules_type_payment"
            label="Tipo de pago"
            outlined
            :items="type_payments"
          />
          <v-autocomplete
            v-model="expenseComputed.provider_id"
            :disabled="$route.params.id ? true : false"
            :rules="validation_rules_provider"
            :items="providers"
            :loading="isLoading"
            :search-input.sync="autocompleteProvider"
            outlined
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            label="Nombre del Proveedor"
            placeholder="Ingrese el documento de identidad..."
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { getProvidersApi } from '@/api/services'
  import { validationRules } from '@/mixins/validationRules'
  export default {
    name: 'AdminEntryAddFormGeneral',
    mixins: [validationRules],
    props: {
      expense: {
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
      autocompleteProvider: null,
      providers: [],
      details: undefined,
      type_payments: ['efectivo', 'transferencia', 'credito'],
    }),
    computed: {
      expenseComputed: {
        get () {
          return this.expense
        },
        set (value) {
          this.$emit('update:expense', value)
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
    },
    watch: {
      valid (val) {
        this.validateComputed = val
      },
    },
    created () {
      this.getProviders()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getProviders () {
        const serviceResponse = await getProvidersApi()
        if (serviceResponse.ok) {
          this.providers = serviceResponse.data
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
