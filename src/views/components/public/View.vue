<template>
  <v-content
    id="pages"
    class="secondary"
  >
    <!-- <v-img
      :class="{
        'v-image--sm': this.$vuetify.breakpoint.smAndDown,
        'v-image--md': this.$vuetify.breakpoint.mdAndDown
      }"
      :src="require(`@/assets/${src || 'clint-mckoy.jpg'}`)"
      gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
      min-height="100%"
    > -->
    <router-view />
    <base-alert />
    <!-- </v-img> -->
  </v-content>
</template>

<script>
  export default {
    name: 'PagesCoreView',
  }
</script>
