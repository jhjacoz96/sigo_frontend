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
        Agregar empleado
      </v-card-title>
      <v-card-text>
        <v-subheadr>
          Datos de acceso
        </v-subheadr>
        <v-divider />
        <v-row
          class="mx-auto"
        >
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Rol"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Contraseña"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Confirmar contraseña"
            />
          </v-col>
        </v-row>
        <v-subheadr>
          Datos generales
        </v-subheadr>
        <v-divider />
        <v-row
          class="mx-auto"
          justify="space-around"
        >
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Nombre y apellido"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Cédula"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Telefono"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <base-text-field
              label="Correo electrónico"
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
    name: 'AdminEmployeeAdd',
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
