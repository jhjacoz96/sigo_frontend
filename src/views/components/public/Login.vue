<template>
  <v-container
    id="login"
    class="fill-height"
    tag="section"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-slide-y-transition appear>
        <base-material-card
          color="primary"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3 rounded-xl"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                {{ $t('name-app') }}
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light mb-4">
              Ingresa con tus credenciales
            </div>
            <v-form
              ref="form1"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="user.email"
                color="secondary"
                label="Correo electrónico"
                rounded
                :rules="validation_rules_email"
                outlined
                prepend-icon="mdi-email"
              />

              <v-text-field
                v-model="user.password"
                color="secondary"
                rounded
                :rules="[v => !!v || 'El campo contraseña es requerido']"
                outlined
                label="Contraseña"
                prepend-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
              />
              <div class="mb-6">
                <router-link to="/">
                  ¿Has olvidado tu contraseña?
                </router-link>
              </div>
              <v-btn
                large
                :disabled="loadingState || !valid"
                :loading="loadingState"
                color="primary"
                @click="login"
              >
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { validationRules } from '@/mixins/validationRules'
  export default {
    name: 'PagesLogin',
    mixins: [validationRules],
    data () {
      return {
        valid: true,
        loading: false,
        showPassword: false,
        user: {
          email: '',
          password: '',
        },
      }
    },
    computed: {
      ...mapState(['loadingState']),
      ...mapState('auth', ['loggedInState', 'userState']),
      validate () {
        return this.$refs.form1.validate()
      },
      password () {
        return this.user.password
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      ...mapMutations(['SET_LOADING']),
      ...mapActions('auth', ['loginAction']),
      async login () {
        this.SET_LOADING(true)
        const serviceResponse = await this.loginAction(this.user)
        if (serviceResponse.ok) {
          if (this.userState.modelAssociate === 'CLient') this.$router.push('/tienda')
          else this.$router.push('/admin')
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.SET_LOADING(false)
      },
    },
  }
</script>
