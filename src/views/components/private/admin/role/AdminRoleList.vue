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
            color="primary"
            small
            icon
            @click="item"
          >
            <v-icon>mdi-edit</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            small
            icon
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
            text: 'Rol',
            align: 'center',
            value: 'name',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            name: 'Administrador',
          },
          {
            name: 'Secretaria',
          },
          {
            name: 'Empleado',
          },
        ],
      }
    },
  }
</script>
