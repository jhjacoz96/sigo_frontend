<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-widgets"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Clientes
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
      <admin-client-list
        :clients.sync="clients"
      />
      <admin-client-add
        :dialog.sync="dialog"
        :clients.sync="clients"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminClient',
    components: {
      AdminClientList: () => import('./AdminClientList'),
      AdminClientAdd: () => import('./AdminClientAdd'),
    },
    data () {
      return {
        dialog: false,
        clients: [],
      }
    },
  }
</script>
