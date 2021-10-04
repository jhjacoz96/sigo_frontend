<template>
  <v-card
    :style="$vuetify.breakpoint.mdAndUp ? 'max-width:200px;' : ''"
    elevation="4"
    :class="!$vuetify.breakpoint.mdAndUp ? 'd-flex justify-space-between ': 'text-center'"
  >
    <v-img
      :src="imageDefault"
      :max-width="!$vuetify.breakpoint.mdAndUp ? 100 : 200"
      :max-height="!$vuetify.breakpoint.mdAndUp ? 250 : 100"
    />
    <v-card-text>
      {{ src }}
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
        default: '@/assets/default.jpg',
      },
    },
    data () {
      return {
        imageDefault: require('@/assets/login.jpg'),
      }
    },
  }
</script>
