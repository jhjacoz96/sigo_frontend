<template>
  <v-hover
    v-slot="{ hover }"
  >
    <v-card
      style="cursor:pointer;"
      :style="$vuetify.breakpoint.smAndUp ? 'max-width:250px;' : ''"
      :elevation="hover ? 16 : 3"
      :class="hover ? classHover : classNotHover"
    >
      <v-img
        :src="src"
        :max-width="!$vuetify.breakpoint.mdAndUp ? 130 : 250"
        :max-height="!$vuetify.breakpoint.mdAndUp ? 150 : 150"
      />
      <v-card-text
        :class="!$vuetify.breakpoint.mdAndUp ? 'text-left' : 'text-center'"
      >
        <slot name="descriptions" />
      </v-card-text>
      <v-card-actions v-if="$slots.actions">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-hover>
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
    computed: {
      classHover () {
        return {
          'on-hover': true,
          'd-flex': !this.$vuetify.breakpoint.smAndUp,
          'justify-space-between': !this.$vuetify.breakpoint.smAndUp,
          'text-center': this.$vuetify.breakpoint.smAndUp,
        }
      },
      classNotHover () {
        return {
          'on-hover': false,
          'd-flex': !this.$vuetify.breakpoint.smAndUp,
          'justify-space-between': !this.$vuetify.breakpoint.smAndUp,
          'text-center': this.$vuetify.breakpoint.smAndUp,
        }
      },
    },
  }
</script>
