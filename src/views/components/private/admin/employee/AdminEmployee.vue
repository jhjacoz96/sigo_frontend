<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-widgets"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Empleados
        </div>
      </template>
      <v-btn
        color="primary"
        absolute
        top
        right
        @click="dialog=!dialog"
      >
        <span v-if="$vuetify.breakpoint.smAndUp">Agregar</span> <v-icon>mdi-plus</v-icon>
      </v-btn>
      <admin-employee-list />
      <admin-employee-add :dialog.sync="dialog" />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminEmployee',
    components: {
      AdminEmployeeList: () => import('./AdminEmployeeList'),
      AdminEmployeeAdd: () => import('./AdminEmployeeAdd'),
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
