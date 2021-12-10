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
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          <v-subheader>
            Datos de acceso
          </v-subheader>
          <v-divider />
          <v-row
            class="mx-auto"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="clientData.email"
                :rules="validation_rules_email"
                label="Correo Electrónico"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-if="indexEditComputed === -1"
                v-model="clientData.password"
                :rules="validation_rules_password"
                label="Contraseña"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-if="indexEditComputed === -1"
                v-model="clientData.password_confirmation"
                :rules="validation_rules_password_confirm"
                label="Confirmar contraseña"
                dense
                outlined
              />
            </v-col>
          </v-row>
          <v-subheader>
            Datos generales
          </v-subheader>
          <v-divider />
          <v-row
            class="mx-auto"
            justify="space-around"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="clientData.name"
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
                v-model="clientData.type_document_id"
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
                v-model="clientData.document"
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
                v-model="clientData.phone"
                :rules="validation_rules_phone"
                label="Telefono"
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
            @click="saveClient()"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  import { validationRules } from '@/mixins/validationRules'
  import { saveClientApi, updateClientApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminClientAdd',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      clients: {
        type: Array,
        default: () => ([]),
      },
      client: {
        type: Object,
        default: () => ({}),
      },
      indexEdit: {
        type: Number,
        default: -1,
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
        clientData: {
          id: null,
          email: '',
          password: '',
          password_confirmation: '',
          user_id: null,
          name: '',
          document: '',
          phone: '',
          type_document_id: '',
        },
      }
    },
    computed: {
      ...mapState(['loadingState']),
      password () {
        return this.clientData.password
      },
      validate () {
        return this.$refs.form.validate()
      },
      indexEditComputed: {
        get () {
          return this.indexEdit
        },
        set (value) {
          this.$emit('update:indexEdit', value)
        },
      },
      dialogComputed: {
        get () {
          return this.dialog
        },
        set (value) {
          this.$emit('update:dialog', value)
        },
      },
      clientsComputed: {
        get () {
          return this.clients
        },
        set (value) {
          this.$emit('update:clients', value)
        },
      },
      clientComputed: {
        get () {
          return this.clientData
        },
        set (value) {
          this.$emit('update:client', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar cliente' : 'Editar cliente'
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.clientData, this.client)
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.$refs.form.reset()
          this.indexEditComputed = -1
          this.clientComputed = {}
          this.SET_LOADING(false)
        })
      },
      async saveClient () {
        if (this.validate) {
          this.SET_LOADING(true)
          const serviceResponse = this.indexEditComputed === -1 ? await saveClientApi(this.clientData)
            : await updateClientApi(this.clientData, this.clientData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.clientsComputed.push(serviceResponse.data) : Object.assign(this.clientsComputed[this.indexEditComputed], serviceResponse.data)
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
