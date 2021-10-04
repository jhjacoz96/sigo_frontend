<template>
  <div>
    <base-item-category @click="open" />
  </div>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object,
        default: () => ({}),
      },
    },
    data () {
      return {
        imageDefault: require('@/assets/default.jpg'),
      }
    },
    methods: {
      open () {
      },
    },
  }
</script>
