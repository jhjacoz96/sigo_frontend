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
                v-model="providerData.email"
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
                v-model="providerData.name"
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
                v-model="providerData.type_document_id"
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
                v-model="providerData.document"
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
                v-model="providerData.phone"
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
            @click="saveProvider()"
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
  import { saveProviderApi, updateProviderApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminProviderAdd',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      providers: {
        type: Array,
        default: () => ([]),
      },
      provider: {
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
        type_documents: [
          { id: 1, name: 'CI' },
          { id: 2, name: 'RUC' },
          { id: 3, name: 'RIF' },
        ],
        providerData: {
          id: null,
          email: '',
          name: '',
          document: '',
          phone: '',
          type_document_id: '',
        },
      }
    },
    computed: {
      ...mapState(['loadingState']),
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
      providersComputed: {
        get () {
          return this.providers
        },
        set (value) {
          this.$emit('update:providers', value)
        },
      },
      providerComputed: {
        get () {
          return this.providerData
        },
        set (value) {
          this.$emit('update:provider', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar proveedor' : 'Editar proveedor'
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.providerData, this.provider)
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.$refs.form.reset()
          this.indexEditComputed = -1
          this.providerComputed = {}
          this.SET_LOADING(false)
        })
      },
      async saveProvider () {
        if (this.validate) {
          this.SET_LOADING(true)
          const serviceResponse = this.indexEditComputed === -1 ? await saveProviderApi(this.providerData)
            : await updateProviderApi(this.providerData, this.providerData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.providersComputed.push(serviceResponse.data) : Object.assign(this.providersComputed[this.indexEditComputed], serviceResponse.data)
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
