<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-shopping"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Gastos
        </div>
      </template>
      <v-btn
        color="primary"
        top
        right
        absolute
        to="/admin/ingreso/agregar"
      >
        <span v-if="$vuetify.breakpoint.smAndUp">Agregar</span> <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container class="text-center justify-center">
        <admin-entry-list />
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminEntry',
    components: {
      AdminEntryList: () => import('./AdminEntryList'),
    },
    data () {
      return {
      }
    },
  }
</script>
