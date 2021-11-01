<template>
  <v-content>
    <router-view />
    <base-alert />
    <dashboard-core-footer />
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
