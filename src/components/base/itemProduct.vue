<template>
  <v-card
    :style="$vuetify.breakpoint.smAndUp ? 'max-width:250px;' : ''"
    elevation="4"
    :class="!$vuetify.breakpoint.smAndUp ? 'd-flex justify-space-between ': 'text-center'"
  >
    <v-img
      v-if="$vuetify.breakpoint.mdAndUp"
      :src="src"
      :max-width="!$vuetify.breakpoint.mdAndUp ? 100 : 250"
      :max-height="!$vuetify.breakpoint.mdAndUp ? 150 : 150"
    />
    <v-card-text
      :class="!$vuetify.breakpoint.mdAndUp ? 'text-left' : 'text-center'"
    >
      <pre>{{ src }}</pre>
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
