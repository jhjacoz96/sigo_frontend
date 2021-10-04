<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
    >
      <template v-slot:item.accion="{ item }">
        <v-btn
          icon
          @click="item"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.quantify="{ item }">
        <v-btn
          color="primary"
          x-small
        >
          <v-icon>
            mdi-minus
          </v-icon>
        </v-btn>
        <span class="mx-2">{{ item.quantify }}</span>
        <v-btn
          color="primary"
          x-small
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-card>
      <v-card-title>
        Resumen <v-spacer />
      </v-card-title>
      <v-card-text class="mt-3">
        <div class="d-flex justify-space-between">
          <div>Total</div>
          <div class="grey--text">
            600
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'AdminOrderAddFormProductList',
    data () {
      return {
        headers: [
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          { text: 'Cantidad', value: 'quantify' },
          { text: 'Precio', value: 'price' },
          { text: 'Subtotal', value: 'subtotal' },
          { text: 'Acciones', value: 'accion' },
        ],
        desserts: [
          {
            name: 'Pintura',
            quantify: 2,
            price: 159,
            subtotal: 300,
          },
          {
            name: 'Lija',
            quantify: 2,
            price: 159,
            subtotal: 300,
          },
        ],
      }
    },
  }
</script>
