<template>
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
</template>

<script>
  export default {
    name: 'AdminCategoryList',
    data () {
      return {
        headers: [
          {
            text: 'Categoría',
            align: 'center',
            value: 'name',
          },
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        desserts: [
          {
            name: 'Pintura',
          },
          {
            name: 'Lija',
          },
        ],
      }
    },
  }
</script>
