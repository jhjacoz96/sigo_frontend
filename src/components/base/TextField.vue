<template>
  <div class="text-start">
    <label>{{ label }}</label>
    <v-text-field
      class="mt-2"
      v-bind="{
        ...$attrs,
      }"
      outlined
      dense
      v-on="$listeners"
    />
  </div>
</template>

<script>
  export default {
    name: 'BaseTextField',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  }
</script>
