<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card
      relative
    >
      <v-btn
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="text-center">
        ¿Está seguro que desea salir?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="logout"
        >
          Salir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'SharedConfirmLogout',
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
      }
    },
    computed: {
      dialogComputed: {
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
      ...mapActions('auth', ['logoutAction']),
      logout () {
        this.logoutAction()
        this.$nextTick(() => {
          this.close()
          this.$router.push('/')
        })
      },
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
        })
      },
    },
  }
</script>
