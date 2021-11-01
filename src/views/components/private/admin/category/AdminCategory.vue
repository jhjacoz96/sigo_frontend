<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-widgets"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Categorías
        </div>
      </template>
      <!-- <v-row justify="center">
        <v-col
          cols="12"
          md="10"
        >
          <v-card
            class="elevation-1"
            float="center"
          >
            <v-card-title class="pa-3 primary white--text">
              <v-spacer />
              <v-btn
                color="white"
                @click="dialog=!dialog"
              >
                Agregar <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <admin-category-list />
            <admin-category-add :dialog.sync="dialog" />
          </v-card>
        </v-col>
      </v-row> -->
      <v-btn
        color="primary"
        absolute
        top
        right
        @click="dialog=!dialog"
      >
        <span v-if="$vuetify.breakpoint.smAndUp">Agregar</span> <v-icon>mdi-plus</v-icon>
      </v-btn>
      <admin-category-list
        :categories.sync="categories"
      />
      <admin-category-add
        :dialog.sync="dialog"
        :categories.sync="categories"
      />
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminCategory',
    components: {
      AdminCategoryList: () => import('./AdminCategoryList'),
      AdminCategoryAdd: () => import('./AdminCategoryAdd'),
    },
    data () {
      return {
        dialog: false,
        categories: [],
      }
    },
  }
</script>
