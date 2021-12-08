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
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clientsComputed"
        :search="search"
        :loading="loadingState"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :mobile-breakpoint="0"
        :items-per-page="5"
        disable-sort
      >
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('client.edit')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('client.delete')"
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
      <admin-client-delete
        :dialog-delete.sync="dialogDelete"
        :client.sync="client"
        :clients.sync="clients"
      />
      <admin-client-add
        :dialog.sync="dialog"
        :client.sync="client"
        :index-edit.sync="indexEdit"
        :clients.sync="clients"
      />
    </v-card>
  </v-container>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getClientsApi } from '@/api/services'
  export default {
    name: 'AdminClientList',
    components: {
      AdminClientDelete: () => import('./AdminClientDelete'),
      AdminClientAdd: () => import('./AdminClientAdd'),
    },
    mixins: [pagination],
    props: {
      clients: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        headers: [
          {
            text: 'Cliente',
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
        client: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['canPermissionsGetter']),
      clientsComputed: {
        get () {
          return this.clients
        },
        set (value) {
          this.$emit('update:clients', value)
        },
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.clientsComputed = []
          this.getClients()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getClients () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getClientsApi(params)
        if (serviceResponse.ok) {
          this.clientsComputed = serviceResponse.data.data
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
        Object.assign(this.client, item)
        this.indexEdit = this.clientsComputed.indexOf(item)
      },
      deleteItem (item) {
        this.dialogDelete = true
        Object.assign(this.client, item)
      },
    },
  }
</script>
