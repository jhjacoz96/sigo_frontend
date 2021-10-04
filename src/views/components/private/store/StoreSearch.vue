<template>
  <div>
    <section
      class="section secondary d-flex justify-center align-center"
      style="position: relative;"
    >
      <span
        class="white--text"
        :class="$vuetify.breakpoint.smAndDown ? 'display-2' : 'display-3'"
      >
        Busca los productos de tu interés
      </span>
      <v-text-field
        :label="$t('search')"
        color="secondary"
        solo
        :style="textFieldStyle"
        clearable
        large
        prepend-inner-icon="mdi-magnify"
      />
    </section>
    <store-product />
  </div>
</template>

<script>
  export default {
    name: 'StoreSearch',
    components: {
      StoreProduct: () => import('./StoreProduct'),
    },
    computed: {
      textFieldStyle () {
        return {
          position: 'absolute',
          left: `${20}%`,
          right: `${20}%`,
          bottom: `${-45}px`,
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
  section
    height: 150px
</style>
