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
        />
      </v-card-actions>
      <v-data-table
        :headers="headers"
        :items="employeesComputed"
        :search="search"
        :loading="loadingState"
        :items-per-page="5"
        disable-sort
        :mobile-breakpoint="0"
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
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import { getEmployeesApi } from '@/api/services'
  export default {
    name: 'AdminEmployeeList',
    components: {
      AdminEmployeeDelete: () => import('./AdminEmployeeDelete'),
      AdminEmployeeAdd: () => import('./AdminEmployeeAdd'),
    },
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
    created () {
      this.getEmployees()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      async getEmployees () {
        this.SET_LOADING(true)
        const serviceResponse = await getEmployeesApi()
        if (serviceResponse) {
          this.employeesComputed = serviceResponse.data
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
