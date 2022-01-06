<template>
  <v-dialog
    v-model="dialog"
    width="800"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card-title>
        Detalles de pedido
      </v-card-title>
      <v-card-text>
        Datos del pedido
        <v-divider />
      </v-card-text>
      <v-card-text class="text-center">
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Código:
            </div>
            <div>{{ order.code }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Tipo de pago:
            </div>
            <div>{{ order.type_payment }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Estado:
            </div>
            <div>{{ order.status }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Total:
            </div>
            <div>{{ order.total }} {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Fecha:
            </div>
            <div>{{ moment(order.created_at).format('D-M-YYYY') }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        Datos del envío
        <v-divider />
      </v-card-text>
      <v-card-text class="text-center">
        <v-row
          justify="space-between"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Nomber:
            </div>
            <div>{{ order.name_delivery }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Tipo de pago:
            </div>
            <div>{{ order.type_payment }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Estado:
            </div>
            <div>{{ order.phone_delivery }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Costo:
            </div>
            <div>{{ order.cost_delivery }} {{ currencyGetter }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Comuna:
            </div>
            <div>{{ getCommune(order.commune) }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Dirección:
            </div>
            <div>{{ order.address_delivery }}</div>
          </v-col>
          <v-col
            cols="6"
            sm="4"
            class="text-start"
          >
            <div class="grey--text text--lighten-1">
              Comentario adicional:
            </div>
            <div>{{ order.comment_delivery }}</div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="order.products"
          :items-per-page="5"
          disable-sort
          :mobile-breakpoint="0"
        >
          <template v-slot:item.name="{ item }">
            <base-image-preview
              :src="item.image"
              :name="item.name"
            />
          </template>
          <template v-slot:top>
            <div class="grey--text text--lighten-1">
              Productos de la orden
            </div>
          </template>
          <template v-slot:item.price_sale="{ item }">
            {{ item.price_sale }} {{ currencyGetter }}
          </template>
          <template v-slot:item.sub_total="{ item }">
            {{ item.price_sale * item.quantity | price }} {{ currencyGetter }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AdminOrderDetail',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      order: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        headers: [
          { text: 'Producto', value: 'name' },
          { text: 'Precio de venta', value: 'price_sale' },
          { text: 'Cantidad', value: 'quantity' },
          { text: 'Sub total', value: 'sub_total' },
        ],
        communes: [
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
      ...mapGetters('auth', ['currencyGetter']),
      orderFormat () {
        const keys = [
          {
            name: 'Código',
            value: 'code',
          },
          {
            name: 'Nombre',
            value: 'name',
          },
          {
            name: 'Precio',
            value: 'price_sale',
          },
          {
            name: 'Cantidad',
            value: 'quantity',
          },
        ]
        const orderValue = Object.entries(this.order).map(item => {
          const [key, value] = item
          return {
            key,
            value,
          }
        }).filter(item => {
          if (keys.map(item1 => item1.value).includes(item.key)) return item
        })
        return orderValue
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      close () {
        this.$nextTick(() => {
          this.$emit('update:dialog', false)
        })
      },
      getCommune (val) {
        var commune = null
        if (val) {
          commune = this.communes.find(item => item.value === val)
          return commune.label
        }
        return commune
      },
    },
  }
</script>
