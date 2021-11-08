<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-account-key"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Roles y permisos
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
      <admin-role-list
        :roles.sync="roles"
      />
      <admin-role-add
        :dialog.sync="dialog"
        :roles.sync="roles"
      />
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
        roles: [],
      }
    },
  }
</script>
