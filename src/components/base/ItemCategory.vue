<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      max-width="150"
      height="120"
      :elevation="hover ? 4 : 1"
      :class="{ 'on-hover': hover }"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-img
        :src="imageDefault"
      />
      <v-card-text class="pa-0 text-center mt-2">
        Pintura
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
  export default {
    data () {
      return {
        imageDefault: require('@/assets/default.jpg'),
      }
    },
    methods: {
      open () {
        // dialog('fff')
      },
    },
  }
</script>
