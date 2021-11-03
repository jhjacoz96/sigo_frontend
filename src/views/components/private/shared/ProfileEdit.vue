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
        Editar Perfil
      </v-card-title>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-card-text>
          <v-row
            class="mx-auto"
            justify="space-around"
          >
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="profile.email"
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
                v-model="profile.name"
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
                v-model="profile.type_document_id"
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
                v-model="profile.document"
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
                v-model="profile.phone"
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
  import { updateEmployeeApi, updateClientApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'ProfileEdit',
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
    },
    watch: {
      dialog (value) {
        value || this.close()
        if (value) { this.profile = this.userState.profile }
      },
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      ...mapMutations('auth', ['UPDATE_PROFILE']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.SET_LOADING(false)
        })
      },
      async save () {
        if (this.$refs.form.validate()) {
          this.SET_LOADING(true)
          const serviceResponse = this.userState.modelAssociate === 'CLient' ? await updateClientApi(this.profile, this.profile.id)
            : await updateEmployeeApi(this.profile, this.profile.id)
          if (serviceResponse.ok) {
            this.UPDATE_PROFILE(serviceResponse.data)
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
