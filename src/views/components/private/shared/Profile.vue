<template>
  <v-container>
    <base-material-card
      icon="mdi-account"
      class="mx-auto"
      color="secondary"
      max-width="900"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Editar perfil
        </div>
        <!-- <div class="red--text">
          Debe completar los datos de su perfil para poder continuar
        </div> -->
      </template>
      <v-card-text>
        <v-container>
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Nombre:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.name }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Tipo de documento:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.type_document ? profile.type_document.name : '' }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Documento:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.document }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Telefono:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.phone }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Correo:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.email }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          @click="editPassword()"
        >
          Editar contraseña
        </v-btn>
        <v-btn
          color="primary"
          @click="edit()"
        >
          Editar Perfil
        </v-btn>
      </v-card-actions>
    </base-material-card>
    <profile-edit
      :dialog.sync="dialogEdit"
    />
    <profile-edit-password
      :dialog.sync="dialogPassword"
    />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'SharedProfile',
    components: {
      ProfileEdit: () => import('./ProfileEdit'),
      ProfileEditPassword: () => import('./ProfileEditPassword'),
    },
    data () {
      return {
        dialogEdit: false,
        dialogPassword: false,
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      profile () {
        return this.userState.profile
      },
    },
    methods: {
      edit () {
        this.dialogEdit = true
      },
      editPassword () {
        this.dialogPassword = true
      },
    },
  }
</script>
