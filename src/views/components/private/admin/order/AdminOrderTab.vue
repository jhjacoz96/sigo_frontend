<template>
  <base-material-tabs color="secondary">
    <v-tab
      v-for="(tab, i) in value"
      :key="i"
    >
      {{ tab.name }}
    </v-tab>
  </base-material-tabs>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },
    data () {
      return {
      }
    },
  }
</script>
