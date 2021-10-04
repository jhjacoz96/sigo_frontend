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
    name: 'AdminEmployeeList',
    data () {
      return {
        headers: [
          {
            text: 'Emploeado',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Cédula',
            align: 'center',
            value: 'document',
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
          {
            text: 'Rol',
            align: 'center',
            value: 'rol',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            name: 'Jhon Contreras',
            document: '26396606',
            phone: '042694844',
            email: 'jg@gmail.com',
            rol: 'Secretaria',
          },
        ],
      }
    },
  }
</script>
