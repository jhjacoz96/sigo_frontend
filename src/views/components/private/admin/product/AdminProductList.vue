<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <base-text-field
          label="Buscar"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            fab
            x-small
            color="warning"
            @click="item"
          >
            <v-icon>mdi-edit</v-icon>
          </v-btn>
          <v-btn
            fab
            x-small
            color="pink"
            @click="item"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminProductList',
    data () {
      return {
        headers: [
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Stock',
            align: 'center',
            value: 'stock',
          },
          {
            text: 'Categoria',
            align: 'center',
            value: 'category',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            name: 'Pintura',
            stock: 10,
            category: 'Pintura',
          },
          {
            name: 'Lija',
            stock: 10,
            category: 'Pintura',
          },
        ],
      }
    },
  }
</script>
