<template>
  <v-dialog
    v-model="dialogEvent"
    max-width="700"
    persistent
  >
    <v-card>
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        Agregar producto
      </v-card-title>
      <v-card-text>
        <v-row
          class="mx-auto"
          justify="space-around"
          style="max-width: 500px;"
        >
          <v-col
            cols="auto"
            class="text-center"
          >
            <base-image :image.sync="image" />
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Nombre"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Categoría"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Stock"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <base-text-field
              label="Descrición"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'AdminProductAdd',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        image: null,
      }
    },
    computed: {
      dialogEvent: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        },
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      close () {
        this.$nextTick(() => {
          this.dialogEvent = false
          this.image = null
        })
      },
    },
  }
</script>
