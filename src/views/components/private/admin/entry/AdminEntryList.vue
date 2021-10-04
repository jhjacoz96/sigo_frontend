<template>
  <v-container class="text-center justify-center">
    <v-card>
      <v-card-title class="pa-3">
        <v-spacer />
        <base-text-field
          label="Buscar"
        />
      </v-card-title>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center title">
                Código
              </th>
              <th class="text-center title">
                Proveedor
              </th>
              <th class="text-center title">
                Monto total
              </th>
              <th class="text-center title">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in orders"
              :key="i"
              style="cursor: pointer;"
              @click="openDetail(item)"
            >
              <td>{{ item.code }}</td>
              <td>{{ item.autor }}</td>
              <td>{{ item.total | price }}</td>
              <td>{{ item.fecha }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

 <script>
  export default {
    name: 'AdminEntryList',
    data () {
      return {
        orders: [
          {
            code: 'FF-110',
            autor: 'Jhon Contreras',
            total: 10000,
            fecha: '10/10-2021',
          },
          {
            code: 'FF-112',
            autor: 'Jhon Contreras',
            total: 10000,
            fecha: '10/10-2021',
          },
          {
            code: 'FF-113',
            autor: 'Jhon Contreras',
            total: 10000,
            fecha: '10/10-2021',
          },
        ],
      }
    },
    methods: {
      openDetail (order) {
        // console.log(order)
      },
      confirmOrder (event, order) {
        event.stopPropagation()
      },
    },
  }
 </script>
