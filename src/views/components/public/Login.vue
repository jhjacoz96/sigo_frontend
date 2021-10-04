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

            <v-text-field
              color="primary"
              label="Correo electrónico"
              filled
              rounded
              prepend-icon="mdi-email"
            />

            <v-text-field
              color="primary"
              filled
              rounded
              label="Contraseña"
              prepend-icon="mdi-lock-outline"
            />
            <div class="mb-6">
              <router-link to="/">
                ¿Has olvidado tu contraseña?
              </router-link>
            </div>
            <v-btn
              large
              color="secondary"
              @click="login"
            >
              Ingresar
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PagesLogin',

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
        },
      ],
    }),
    methods: {
      login () {
        this.$router.push('/tienda')
      },
    },
  }
</script>
