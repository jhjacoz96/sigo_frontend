<template>
  <div
    class="d-flex align-center"
  >
    <v-img
      :src="src || imageDefault"
      max-width="70"
    />
    <div class="text-start ml-2">
      {{ name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseImagePreview',
    props: {
      src: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        imageDefault: require('@/assets/default.jpg'),
      }
    },
  }
</script>
