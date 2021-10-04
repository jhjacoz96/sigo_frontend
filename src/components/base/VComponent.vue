<template>
  <v-container class="mb-6 text-center">
    <h1
      class="font-weight-light mb-2"
      style="color:#3c4858; font-size:24px"
      v-text="heading"
    />

    <span
      v-if="subHeading !== ''"
      class="font-weight-light"
      style="font-size: 16px; color: #3c4858"
    >
      {{ subHeading }}
    </span>
  </v-container>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      subHeading: {
        type: String,
        default: '',
      },
    },
  }
</script>
