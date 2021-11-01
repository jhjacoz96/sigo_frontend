<template>
  <base-material-tabs color="primary">
    <v-tab
      v-for="(tab, i) in tabs"
      :key="i"
      @click="changeStatus(tab.status)"
    >
      {{ tab.name }}
    </v-tab>
  </base-material-tabs>
</template>

<script>
  export default {
    name: 'AdminOrderTab',
    data () {
      return {
        tabs: [
          {
            name: 'Por verificar',
            status: 'verificar',
          },
          {
            name: 'En proceso',
            status: 'proceso',
          },
          {
            name: 'Enviados',
            status: 'enviado',
          },
        ],
      }
    },
    methods: {
      changeStatus (value) {
        this.$emit('click:filter', value)
      },
    },
  }
</script>
