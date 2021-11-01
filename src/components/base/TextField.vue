<template>
  <div class="text-start">
    <span class="grey--text display-1">{{ label }}</span>
    <!-- <v-text-field
      class="mt-2"
      v-bind="{
        ...$attrs,
      }"
      outlined
      dense
      v-on="$listeners"
    /> -->
    <slot />
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
