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
    props: {
      tabs: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
      }
    },
    methods: {
      changeStatus (value) {
        this.$emit('click:filter', value)
      },
    },
  }
</script>
