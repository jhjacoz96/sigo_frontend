<template>
  <v-card
    :style="$vuetify.breakpoint.smAndUp ? 'max-width:250px;' : ''"
    elevation="4"
    :class="!$vuetify.breakpoint.smAndUp ? 'd-flex justify-space-between ': 'text-center'"
  >
    <v-img
      :src="src"
      :max-width="!$vuetify.breakpoint.mdAndUp ? 100 : 200"
      :max-height="!$vuetify.breakpoint.mdAndUp ? 250 : 100"
    />
    <v-card-text class="text-left">
      <slot name="descriptions" />
    </v-card-text>
    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: require('@/assets/default.jpg'),
      },
    },
    data () {
      return {
      }
    },
  }
</script>
