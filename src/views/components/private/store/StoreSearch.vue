<template>
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
    <v-form>
      <v-text-field
        v-model="search"
        :label="$t('search')"
        color="secondary"
        solo
        :style="textFieldStyle"
        clearable
        large
        prepend-inner-icon="mdi-magnify"
        @keydown.enter.prevent="searchProduct"
      />
    </v-form>
  </section>
</template>

<script>
  export default {
    name: 'StoreSearch',
    data () {
      return {
        search: '',
      }
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
    methods: {
      searchProduct () {
        this.$emit('enter:search', this.search)
      },
    },
  }
</script>

<style lang="sass" scoped>
  section
    height: 150px
</style>
