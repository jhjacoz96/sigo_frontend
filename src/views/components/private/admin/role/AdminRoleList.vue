<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <v-text-field
          v-model="search"
          dense
          outlined
          label="Buscar"
          color="secondary"
          clearable
          :append-outer-icon="'mdi-magnify'"
          @keydown.enter.prevent="searchItem"
          @click:append-outer="searchItem"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="rolesComputed"
        :loading="loadingState"
        :search="search"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :mobile-breakpoint="0"
        :items-per-page="per"
        disable-sort
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('role.edit')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('role.delete')"
            color="primary"
            small
            icon
            class="ml-1"
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <admin-role-delete
        :dialog-delete.sync="dialogDelete"
        :role.sync="role"
        :roles.sync="roles"
      />
      <admin-role-add
        :dialog.sync="dialog"
        :role.sync="role"
        :index-edit.sync="indexEdit"
        :roles.sync="roles"
      />
    </v-card>
  </v-container>
</template>
<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getRolesApi } from '@/api/services'
  export default {
    name: 'AdminRoleList',
    components: {
      AdminRoleDelete: () => import('./AdminRoleDelete'),
      AdminRoleAdd: () => import('./AdminRoleAdd'),
    },
    mixins: [pagination],
    props: {
      roles: {
        type: Array,
        default: () => ([]),
      },
    },
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
        role: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['canPermissionsGetter']),
      rolesComputed: {
        get () {
          return this.roles
        },
        set (value) {
          this.$emit('update:roles', value)
        },
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.rolesComputed = []
          this.getRoles()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      searchItem () {
        this.rolesComputed = []
        this.options.itemsPerPage = this.per
        this.options.page = 1
        this.totalItems = 0
        this.numberOfPages = 0
        this.getRoles()
      },
      async getRoles () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
          search: this.search,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getRolesApi(params)
        if (serviceResponse.ok) {
          this.rolesComputed = serviceResponse.data.data
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      editedItem (item) {
        this.dialog = true
        Object.assign(this.role, item)
        this.indexEdit = this.rolesComputed.indexOf(item)
      },
      deleteItem (item) {
        this.dialogDelete = true
        Object.assign(this.role, item)
      },
    },
  }
</script>
