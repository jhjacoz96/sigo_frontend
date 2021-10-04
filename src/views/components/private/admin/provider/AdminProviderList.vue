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
    name: 'AdminProviderList',
    data () {
      return {
        headers: [
          {
            text: 'Proveedor',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Rif',
            align: 'center',
            value: 'rif',
          },
          {
            text: 'Telefono',
            align: 'center',
            value: 'phone',
          },
          {
            text: 'Correo',
            align: 'center',
            value: 'email',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            name: 'Inversiones',
            document: '20393493',
            phone: '042694844',
            email: 'jg@gmail.com',
          },
        ],
      }
    },
  }
</script>
