<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-account-key"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Roleos y permisos
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
      <admin-role-list />
      <admin-role-add :dialog.sync="dialog" />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminRole',
    components: {
      AdminRoleList: () => import('./AdminRoleList'),
      AdminRoleAdd: () => import('./AdminRoleAdd'),
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
