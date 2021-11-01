<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-heart"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Favoritos
        </div>
      </template>
      <v-card-text>
        <store-heart-list />
      </v-card-text>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'StoreHeart',
    components: {
      StoreHeartList: () => import('./StoreHeartList'),
    },
    data () {
      return {
      }
    },
  }
</script>
