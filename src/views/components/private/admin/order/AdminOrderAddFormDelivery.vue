<template>
  <v-container class="justify-center">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row justify="center">
        <v-col
          cols="6"
        >
          <v-text-field
            v-model="orderComputed.name_delivery"
            label="Nombre *"
            outlined
            :rules="validation_rules_name"
            dense
          />
          <v-text-field
            v-model="orderComputed.phone_delivery"
            label="Telefono *"
            outlined
            :rules="validation_rules_phone"
            dense
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-text-field
            v-model.lazy="orderComputed.cost_delivery"
            v-money="money"
            :rules="validation_rules_price"
            label="Precio de envío *"
            dense
            :suffix="currencyGetter"
            outlined
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-textarea
            v-model="orderComputed.address_delivery"
            :rules="validation_rules_address"
            label="Dirección de envío *"
            dense
            outlined
          />
        </v-col>
        <v-col
          cols="6"
        >
          <v-textarea
            v-model="orderComputed.comment_delivery"
            label="Comentario adicional"
            dense
            outlined
          />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { mapGetters } from 'vuex'
  import { VMoney } from 'v-money'
  export default {
    name: 'AdminOrderAddFormDelivery',
    directives: { money: VMoney },
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
      money: {
        decimal: '.',
        prefix: '',
        suffix: '',
        precision: 2,
        masked: true,
      },
    }),
    computed: {
      ...mapGetters('auth', ['currencyGetter']),
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
    },
    watch: {
      valid (val) {
        this.validateComputed = val
      },
    },
    methods: {
      validateForm () {
        return this.$refs.form.validate()
      },
    },
  }
</script>
