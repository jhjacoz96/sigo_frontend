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
        :items="providersComputed"
        :loading="loadingState"
        :search="search"
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
            v-if="canPermissionsGetter('provider.edit')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('provider.delete')"
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
      <admin-provider-delete
        :dialog-delete.sync="dialogDelete"
        :provider.sync="provider"
        :providers.sync="providers"
      />
      <admin-provider-add
        :dialog.sync="dialog"
        :provider.sync="provider"
        :index-edit.sync="indexEdit"
        :providers.sync="providers"
      />
    </v-card>
  </v-container>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getProvidersApi } from '@/api/services'
  export default {
    name: 'AdminProviderList',
    components: {
      AdminProviderDelete: () => import('./AdminProviderDelete'),
      AdminProviderAdd: () => import('./AdminProviderAdd'),
    },
    mixins: [pagination],
    props: {
      providers: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        headers: [
          {
            text: 'Proveedor',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Documento de identidad',
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
          { text: 'Acciones', sortable: false, value: 'accion' },
        ],
        provider: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['canPermissionsGetter']),
      providersComputed: {
        get () {
          return this.providers
        },
        set (value) {
          this.$emit('update:providers', value)
        },
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.providersComputed = []
          this.getProviders()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getProviders () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getProvidersApi(params)
        if (serviceResponse.ok) {
          this.providersComputed = serviceResponse.data.data
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
        Object.assign(this.provider, item)
        this.indexEdit = this.providersComputed.indexOf(item)
      },
      deleteItem (item) {
        this.dialogDelete = true
        Object.assign(this.provider, item)
      },
    },
  }
</script>
