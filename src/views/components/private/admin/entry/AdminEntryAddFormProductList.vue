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
        <v-text-field
          v-model="item.quantify"
          dense
          outlined
        />
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
            quantify: 1,
            price: 159,
            subtotal: 300,
          },
        ],
      }
    },
  }
</script>
