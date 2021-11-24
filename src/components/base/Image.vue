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
        v-if="url"
        :src="url"
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
        type: [String, Object, File],
      },
      resetImage: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        imageChange: require('@/assets/default.jpg'),
      }
    },
    computed: {
      url () {
        if (typeof this.image === 'string') return this.image
        return this.imageChange
      },
      imageComputed: {
        get () {
          return this.image
        },
        set (value) {
          this.$emit('update:image', value)
        },
      },
    },
    watch: {
      resetImage (val) {
        if (!val) { this.imageChange = require('@/assets/default.jpg') }
      },
    },
    methods: {
      onChange (val) {
        if (val) {
          const value = val.target.files[0]
          this.imageComputed = value
          this.imageChange = URL.createObjectURL(value)
        }
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
