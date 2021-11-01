<template>
  <v-dialog
    v-model="dialogComputed"
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
        Editar contraseña
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-row
            class="mx-auto"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="profile.current_password"
                :rules="validation_rules_password"
                label="Contraseña Antigua"
                dense
                outlined
                :type="show_password_old ? 'password' : 'text'"
                :append-icon="show_password_old ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show_password_old = !show_password_old"
              />
              <v-text-field
                v-model="profile.password"
                :rules="validation_rules_password"
                label="Nueva contraseña"
                dense
                outlined
                :type="show_password ? 'password' : 'text'"
                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show_password = !show_password"
              />
              <v-text-field
                v-model="profile.password_confirmation"
                :rules="validation_rules_password_confirm"
                label="Confirmar nueva contraseña"
                dense
                outlined
                :type="show_password_confirmation ? 'password' : 'text'"
                :append-icon="show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show_password_confirmation = !show_password_confirmation"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="!valid || loadingState"
            :loading="loadingState"
            @click="save()"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { updatePasswordApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'ProfileEditPassword',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        valid: true,
        image: null,
        type_documents: [
          { id: 1, name: 'CI' },
          { id: 2, name: 'RUC' },
          { id: 3, name: 'RIF' },
        ],
        profile: {
          current_password: '',
          password: '',
          password_confirmation: '',
        },
        show_password_old: true,
        show_password: true,
        show_password_confirmation: true,
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapState('auth', ['userState']),
      dialogComputed: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        },
      },
      password () {
        return this.profile.password
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('auth', ['UPDATE_PROFILE']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.$refs.form.reset()
          this.SET_LOADING(false)
        })
      },
      async save () {
        if (this.$refs.form.validate()) {
          this.SET_LOADING(true)
          const serviceResponse = await updatePasswordApi(this.profile, this.userState.id)
          if (serviceResponse.ok) {
            this.SET_ALERT({
              text: serviceResponse.message,
              color: 'success',
            })
            this.close()
          } else {
            this.SET_ALERT({
              text: serviceResponse.message.text,
              color: 'warning',
            })
          }
          this.SET_LOADING(false)
        } else {
          this.SET_ALERT({
            text: 'Formulario inválido',
            color: 'warning',
          })
        }
      },
    },
  }
</script>
