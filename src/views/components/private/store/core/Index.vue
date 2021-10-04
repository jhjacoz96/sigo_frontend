<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

    <!-- <dashboard-core-settings /> -->

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./AppBar'),
      DashboardCoreDrawer: () => import('./Drawer'),
      DashboardCoreView: () => import('./View'),
      // DashboardCoreSettings: () => import('./Settings'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
