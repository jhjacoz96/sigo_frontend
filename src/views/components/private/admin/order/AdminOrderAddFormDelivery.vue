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
          <v-select
            v-model="orderComputed.commune"
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
