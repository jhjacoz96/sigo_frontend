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
        Editar organización
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-subheader>
            Datos básicos
          </v-subheader>
          <v-row
            class="mx-auto"
            justify="space-around"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.name"
                :rules="validation_rules_name"
                label="Nombre y apellido"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="company.type_document_id"
                :rules="validation_rules_type_document"
                :items="type_documents"
                item-value="id"
                item-text="name"
                label="Tipo de documento"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.document"
                :rules="validation_rules_document"
                label="Cédula"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.phone"
                :rules="validation_rules_phone"
                label="Telefono"
                dense
                outlined
              />
            </v-col>
          </v-row>
          <v-subheader>
            Datos de ubicación
          </v-subheader>
          <v-row
            class="mx-auto"
            justify="space-around"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.country"
                :rules="validation_rules_name"
                label="Pais"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.city"
                :rules="validation_rules_name"
                label="City"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="company.address"
                :rules="validation_rules_name"
                label="Dirección"
                dense
                outlined
              />
            </v-col>
          </v-row>
          <v-subheader>
            Configuración general
          </v-subheader>
          <v-row
            class="mx-auto"
            justify="space-around"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="company.currency"
                :rules="validation_rules_name"
                :items="type_currency"
                label="Moneda"
                dense
                outlined
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
  import { saveOrganizationApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminConfigurationEdit',
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
        type_currency: [
          'BS',
          'USD',
        ],
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
      ...mapState(['loadingState']),
      ...mapState('auth', ['organizationState']),
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
        if (value) {
          this.company = this.organizationState || this.company
        }
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('auth', ['UPDATE_ORGANIZATION']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.SET_LOADING(false)
        })
      },
      async save () {
        if (this.$refs.form.validate()) {
          this.SET_LOADING(true)
          const serviceResponse = await saveOrganizationApi(this.company)
          if (serviceResponse.ok) {
            this.UPDATE_ORGANIZATION(serviceResponse.data)
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
