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
          Perfil
        </div>
        <!-- <div class="red--text">
          Debe completar los datos de su perfil para poder continuar
        </div> -->
      </template>

      <v-card-text>
        <v-container>
          <v-row
            v-if="typeAuthGetter === 'Employee'"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Rol:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.role ? profile.role.name : '' }}</span>
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
          <v-row
            v-if="typeAuthGetter === 'CLient'"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Total de ventas (Mes actual):</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.current_quantity_sale }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            v-if="typeAuthGetter === 'CLient'"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Monto de comision (Mes actual):</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ formatMoney(profile.current_commission) }} {{ currencyGetter }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            v-if="typeAuthGetter === 'CLient'"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Total de ventas (Mes anterior):</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ profile.last_quantity_sale }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row
            v-if="typeAuthGetter === 'CLient'"
            justify="center"
            align="center"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-row>
                <v-col class="grey--text text--lighten-1">
                  <span>Monto de comision (Mes actual)</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ formatMoney(profile.last_commission) }} {{ currencyGetter }}</span>
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
  import { mapState, mapGetters } from 'vuex'
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
        profile: {
          id: null,
          user_id: null,
          name: '',
          phone: '',
          email: '',
          document: '',
          type_document_id: null,
          type_document: null,
        },
      }
    },
    computed: {
      ...mapState('auth', ['userState']),
      ...mapGetters('auth', ['typeAuthGetter', 'currencyGetter']),
    },
    created () {
      Object.assign(this.profile, this.userState.profile)
    },
    methods: {
      edit () {
        this.dialogEdit = true
      },
      editPassword () {
        this.dialogPassword = true
      },
      formatMoney (amount) {
        var decimalCount = 2
        var decimal = '.'
        var thousands = ','
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
      },
    },
  }
</script>
