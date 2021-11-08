<template>
  <v-container>
    <base-material-card
      icon="mdi-store-cog-outline"
      class="mx-auto"
      color="secondary"
      max-width="900"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Configuración
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
                  <span>{{ company.name }}</span>
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
                  <span>{{ company.type_document ? company.type_document.name : '' }}</span>
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
                  <span>{{ company.document }}</span>
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
                  <span>{{ company.phone }}</span>
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
                  <span>Moneda:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ company.currency }}</span>
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
                  <span>Pais:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ company.country }}</span>
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
                  <span>Ciudad:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ company.city }}</span>
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
                  <span>Dirección:</span>
                </v-col>
                <v-col class="text-start">
                  <span>{{ company.address }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          @click="edit()"
        >
          Editar Organización
        </v-btn>
      </v-card-actions>
    </base-material-card>
    <admin-configuration-edit
      :dialog.sync="dialogEdit"
    />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'AdminConfiguration',
    components: {
      AdminConfigurationEdit: () => import('./AdminConfigurationEdit'),
    },
    data () {
      return {
        dialogEdit: false,
        company: {
          id: null,
          name: '',
          type_document_id: null,
          type_document: null,
          document: '',
          phone: '',
          country: '',
          city: '',
          address: '',
          currency: '',
        },
      }
    },
    computed: {
      ...mapState('auth', ['organizationState']),
    },
    created () {
      Object.assign(this.company, this.organizationState)
    },
    methods: {
      edit () {
        this.dialogEdit = true
      },
    },
  }
</script>
