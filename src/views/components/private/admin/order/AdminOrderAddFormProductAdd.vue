<template>
  <div>
    <v-btn
      color="secondary"
      :small="$vuetify.breakpoint.smAndDown"
      @click="dialog = !dialog"
    >
      Agregar productos <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="600"
      persistent
    >
      <v-card>
        <v-btn
          icon
          absolute
          right
          large
          @click="dialog = !dialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title>
          Agregar productos
          <v-spacer />
          <v-text-field
            v-model="search"
            color="secondary"
            label="Buscar"
            outlined
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          :items-per-page="5"
        >
          <template v-slot:item.accion="{ item }">
            <v-btn
              icon
              @click="item"
            >
              <v-icon>mdi-cart-plus</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <v-card-actions>
          <v-spacer />
          <v-btn
            depressed
            @click="dialog=!dialog"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AdminOrderAddFormProductAdd',
    data () {
      return {
        dialog: false,
        search: '',
        headers: [
          {
            text: 'Producto',
            align: 'center',
            value: 'name',
          },
          { text: 'Categoria', value: 'category' },
          { text: 'Precio', value: 'price' },
          { text: 'code', value: 'code' },
          { text: 'Stock', value: 'stock' },
          { text: 'Acciones', value: 'accion' },
        ],
        desserts: [
          {
            name: 'Pintura',
            category: 'Pintura',
            price: 159,
            code: 'FF-100',
            stock: 300,
          },
          {
            name: 'Lija',
            category: 'Brocha',
            price: 159,
            code: 'FF-100',
            stock: 300,
          },
          {
            name: 'Brocha',
            category: 'Brocha',
            price: 159,
            code: 'FF-100',
            stock: 300,
          },
        ],
      }
    },
  }
</script>
