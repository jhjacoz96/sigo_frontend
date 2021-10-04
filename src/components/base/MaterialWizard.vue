<template>
  <base-material-card
    :icon="icon"
    color="secondary"
    class="v-card--wizard"
    elevation="12"
    max-width="900"
  >
    <template v-slot:after-heading>
      <div class="font-weight-light card-title mt-2">
        {{ title }}
      </div>
    </template>

    <v-tabs
      ref="tabs"
      v-model="internalValue"
      background-color="green lighten-5"
      color="white"
      class="mt-6"
      grow
      slider-size="50"
    >
      <v-tabs-slider
        class="mt-1"
        color="secondary"
      />

      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :ripple="false"
        :disabled="!availableSteps.includes(i)"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <div class="my-6" />

    <v-card-text>
      <v-tabs-items v-model="internalValue">
        <slot />
      </v-tabs-items>
    </v-card-text>

    <v-card-actions class="pb-4 pa-4">
      <v-btn
        :disabled="internalValue === 0"
        class="white--text"
        color="grey darken-2"
        min-width="125"
        @click="$emit('click:prev')"
      >
        Previous
      </v-btn>

      <v-spacer />

      <v-btn
        :disabled="!availableSteps.includes(internalValue + 1)"
        :color="internalValue === items.length - 1 ? 'primary' : 'secondary'"
        min-width="100"
        @click="$emit('click:next')"
      >
        {{ internalValue === items.length - 1 ? 'Confirmar pedido' : 'Siguiente' }}
      </v-btn>
    </v-card-actions>
  </base-material-card>
</template>

<script>
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'

  export default {
    name: 'BaseMaterialWizard',

    mixins: [Proxyable],

    props: {
      availableSteps: {
        type: Array,
        default: () => ([]),
      },
      items: {
        type: Array,
        default: () => ([]),
      },
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="sass">
  .v-card--wizard
    overflow: visible

    .v-tabs-bar
      height: 56px
      padding: 0 8px

    .v-tabs-slider-wrapper
      overflow: visible

    .v-tabs-slider
      border-radius: 4px

    .v-tabs-slider-wrapper
      contain: initial
      z-index: 0
</style>
