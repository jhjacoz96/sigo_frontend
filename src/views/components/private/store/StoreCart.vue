<template>
  <v-container fluid>
    <v-row
      class="fill-height"
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
        class="ma-0"
      >
        <base-material-card
          icon="mdi-cart"
          color="secondary"
        >
          <template v-slot:after-heading>
            <div class="font-weight-light card-title mt-2">
              Productos en mi carrito
            </div>
          </template>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left title">
                      Producto
                    </th>
                    <th class="text-left title">
                      Precio
                    </th>
                    <th class="text-left title">
                      Cantidad
                    </th>
                    <th class="text-left title">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in data"
                    :key="i"
                  >
                    <td>
                      <span class="title-1">{{ item.name }}</span>
                    </td>
                    <td>{{ item.price | price }}</td>
                    <td>
                      <v-btn
                        color="primary"
                        x-small
                      >
                        <v-icon>
                          mdi-minus
                        </v-icon>
                      </v-btn>
                      <span class="mx-2">{{ item.quantify }}</span>
                      <v-btn
                        color="primary"
                        x-small
                      >
                        <v-icon>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </td>
                    <td>{{ item.total | price }}</td>
                    <td>
                      <v-btn
                        icon
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <!-- <v-card
                    v-for="(item, i) in data"
                    :key="i"
                >
                    <div class="d-flex justify-space-between">
                        <div  class="d-flex">
                            <v-img
                            max-width="60"
                            :src="require('@/assets/default.jpg')"
                            />
                            <div class="ml-2">
                                <span class="subtitle-1 d-block">{{ item.name }}</span>
                                <span class="subtitle-1 d-block grey--text">{{ item.price }}</span>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-center">
                                <v-btn
                                    color="primary"
                                    x-small
                                >
                                    <v-icon>
                                    mdi-minus
                                    </v-icon>
                                </v-btn>
                                <span class="mx-2">{{ item.quantify }}</span>
                                <v-btn
                                    color="primary"
                                    x-small
                                >
                                    <v-icon>
                                    mdi-plus
                                    </v-icon>
                                </v-btn>
                            </div>
                            <div class="mt-2 d-flex">
                                <span class="grey--text">Total:</span><span class="ml-1">{{ item.total | price }}</span>
                            </div>
                        </div>
                    </div>
                </v-card> -->
          </v-card-text>
        </base-material-card>
      </v-col>
      <v-col
        cols="12"
        md="3"
        class="ma-0"
      >
        <v-card>
          <v-card-title class="my-3">
            Resumen
          </v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mx-5">
              <span class="subtitle-1 grey--text">Precio total:</span>
              <span>100$</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">
              realizar order
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreCart',
    data () {
      return {
        data: [
          {
            name: 'Pintura Velmaca',
            category: 'Pintura',
            price: 150,
            quantify: 3,
            total: 350,
          },
          {
            name: 'Brocha 3p',
            category: 'Brocha',
            price: 150,
            quantify: 3,
            total: 350,
          },
          {
            name: 'Lija 3p',
            category: 'Lija',
            price: 150,
            quantify: 3,
            total: 350,
          },
        ],
      }
    },
  }
</script>
