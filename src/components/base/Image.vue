<template>
  <div>
    <input
      ref="file"
      type="file"
      class="d-none"
      @change="onChange"
    >
    <v-card
      :class="imageChange ? 'primary--text' : 'grey--text'"
      class="mx-auto mt-0 d-inline-flex v-card--account"
      outlined
      height="106"
      width="106"
      @click="$refs.file.click()"
    >
      <v-img
        v-if="imageChange"
        :src="imageChange"
        height="100%"
        width="100%"
      />
      <v-icon
        v-else
        class="mx-auto"
        size="96"
      >
        mdi-widgets
      </v-icon>
    </v-card>

    <div class="font-weight-bold grey--text">
      Agregar Imagen
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseImage',
    props: {
      image: {
        type: String,
        default: null,
      },
    },
    computed: {
      imageChange: {
        get () {
          return this.image
        },
        set (value) {
          this.$emit('update:image', value)
        },
      },
    },
    methods: {
      onChange (val) {
        const value = val.target.files[0]
        if (value === null) return (this.imageChange = null)
        this.imageChange = URL.createObjectURL(value)
      },
    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    border-color: currentColor
    border-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    border-radius: 50%

</style>
