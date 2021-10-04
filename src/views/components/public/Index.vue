<template>
  <v-app>
    <pages-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'PagesIndex',

    components: {
      PagesCoreView: () => import('./View'),
    },

    created () {
      this.$vuetify.theme.dark = true
    },

    beforeDestroy () {
      this.$vuetify.theme.dark = false
    },
  }
</script>
