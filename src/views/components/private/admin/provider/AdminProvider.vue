<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-account"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Proveedor
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
      <admin-provider-list
        :providers.sync="providers"
      />
      <admin-provider-add
        :dialog.sync="dialog"
        :providers.sync="providers"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminProvider',
    components: {
      AdminProviderList: () => import('./AdminProviderList'),
      AdminProviderAdd: () => import('./AdminProviderAdd'),
    },
    data () {
      return {
        dialog: false,
        providers: [],
      }
    },
  }
</script>
