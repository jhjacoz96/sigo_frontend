<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-actions>
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
      </v-card-actions>
      <v-data-table
        :headers="headers"
        :items="employeesComputed"
        :search="search"
        :loading="loadingState"
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
            v-if="canPermissionsGetter('employee.edit')"
            color="primary"
            small
            icon
            @click="editedItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('employee.delete')"
            color="primary"
            small
            icon
            class="ml-1"
            @click="dialogDelete = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <admin-employee-delete
            :dialog-delete.sync="dialogDelete"
            :employee.sync="item"
            :employees.sync="employees"
          />
        </template>
      </v-data-table>
      <admin-employee-add
        :dialog.sync="dialog"
        :employee.sync="employee"
        :index-edit.sync="indexEdit"
        :employees.sync="employees"
      />
    </v-card>
  </v-container>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getEmployeesApi } from '@/api/services'
  export default {
    name: 'AdminEmployeeList',
    components: {
      AdminEmployeeDelete: () => import('./AdminEmployeeDelete'),
      AdminEmployeeAdd: () => import('./AdminEmployeeAdd'),
    },
    mixins: [pagination],
    props: {
      employees: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
        headers: [
          {
            text: 'Emploeado',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Cédula',
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
          { text: 'Acciones', sortable: false, filterable: false, value: 'accion' },
        ],
        employee: {},
        search: '',
        dialogDelete: false,
        dialog: false,
        indexEdit: -1,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['canPermissionsGetter']),
      employeesComputed: {
        get () {
          return this.employees
        },
        set (value) {
          this.$emit('update:employees', value)
        },
      },
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.employeesComputed = []
          this.getEmployees()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      searchItem () {
        this.employeesComputed = []
        this.options.itemsPerPage = this.per
        this.options.page = 1
        this.totalItems = 0
        this.numberOfPages = 0
        this.getEmployees()
      },
      async getEmployees () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
          search: this.search,
        }
        this.SET_LOADING(true)
        const serviceResponse = await getEmployeesApi(params)
        if (serviceResponse.ok) {
          this.employeesComputed = serviceResponse.data.data
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
        Object.assign(this.employee, item)
        this.indexEdit = this.employeesComputed.indexOf(item)
      },
    },
  }
</script>
