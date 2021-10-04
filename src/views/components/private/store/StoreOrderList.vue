<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left title">
            Codigo
          </th>
          <th class="text-left title">
            Estado
          </th>
          <th class="text-left title">
            Total
          </th>
          <th class="text-left title">
            Fecha
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in orders"
          :key="i"
          style="cursor: pointer ;"
          @click="details(item)"
        >
          <td>
            <span class="title-1">{{ item.code }}</span>
          </td>
          <td>
            <v-chip color="orange">
              {{ item.total | price }}
            </v-chip>
          </td>
          <td>
            <span class="title-1">{{ item.total | price }}</span>
          </td>
          <td>
            <span class="title-1">{{ item.date }}</span>
          </td>
          <store-order-detail
            :dialog.sync="dialog"
            :order="item"
          />
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    name: 'StoreOrderList',
    components: {
      StoreOrderDetail: () => import('./StoreOrderDetail'),
    },
    data () {
      return {
        dialog: false,
        orders: [
          {
            code: 'FF-011-01',
            status: 'Por confirmar',
            date: '10/10/2021',
            total: 100,
          },
        ],
      }
    },
    methods: {
      details (value) {
        this.dialog = true
      },
      open (event) {
        event.stopPropagation()
      },
    },
  }
</script>
