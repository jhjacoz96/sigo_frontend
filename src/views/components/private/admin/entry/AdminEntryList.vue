<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <base-text-field
          label="Buscar"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :loading="loadingState"
        :items="expenses"
        :options.sync="options"
        :server-items-length="totalItems"
        :page-count="numberOfPages"
        :footer-props="footerProps"
        :items-per-page="5"
        disable-sort
      >
        <template v-slot:item.provider="{ item }">
          {{ item.provider.name }}
        </template>
        <template v-slot:item.total="{ item }">
          {{ item.total }} {{ currencyGetter }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format('D-M-YYYY') }}
        </template>
        <template v-slot:item.accion="{ item }">
          <v-btn
            v-if="canPermissionsGetter('expense.show')"
            :disabled="loadingState"
            class="ml-1"
            color="primary"
            small
            icon
            @click="showItem(item)"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('expense.edit')"
            :disabled="loadingState"
            class="ml-1"
            color="primary"
            small
            icon
            @click="editItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="canPermissionsGetter('expense.delete')"
            :disabled="loadingState"
            color="primary"
            small
            icon
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <admin-entry-detail
      :dialog.sync="dialogShow"
      :expense.sync="expense"
    />
  </v-container>
</template>

 <script>
  import { pagination } from '@/mixins/pagination'
  import { getExpensesAdminApi } from '@/api/services'
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name: 'AdminEntryList',
    components: {
      AdminEntryDetail: () => import('./AdminEntryDetail'),
    },
    mixins: [pagination],
    data () {
      return {
        expenses: [],
        headers: [
          {
            text: 'Provedor',
            align: 'center',
            value: 'provider',
          },
          {
            text: 'Tipo de pago',
            align: 'center',
            value: 'type_payment',
          },
          {
            text: 'Monto total',
            align: 'center',
            value: 'total',
          },
          {
            text: 'Fecha',
            align: 'center',
            value: 'created_at',
          },
          { text: 'Acciones', sortable: false, filterable: false, value: 'accion' },
        ],
        itemsPerPage: 5,
        expense: {},
        dialog: false,
        dialogShow: false,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapGetters('auth', ['currencyGetter', 'canPermissionsGetter']),
    },
    watch: {
      options: {
        deep: true,
        handler () {
          this.getExpenses()
        },
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      openDetail (order) {
        // console.log(order)
      },
      confirmOrder (event, order) {
        event.stopPropagation()
      },
      async getExpenses () {
        const params = {
          sizePage: this.options.itemsPerPage,
          page: this.options.page,
        }
        this.SET_LOADING(true)
        this.expenses = []
        const serviceResponse = await getExpensesAdminApi(params)
        if (serviceResponse.ok) {
          this.expenses = serviceResponse.data.expenses
          this.paginate(serviceResponse.data.paginate)
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
      deleteItem (item) {
        this.dialog = true
        this.expense = item
      },
      editItem (item) {
        this.$router.push(`/admin/ingreso/editar/${item.id}`)
      },
      showItem (item) {
        this.expense = item
        this.dialogShow = true
      },
    },
  }
 </script>
