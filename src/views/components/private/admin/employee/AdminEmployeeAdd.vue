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
        :disabled="loadingState"
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
                v-model="employeeData.email"
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
              <v-select
                v-model="employeeData.role_id"
                :items="roles_data"
                item-value="name"
                item-text="name"
                :rules="validation_rules_role"
                label="Rol"
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
                v-model="employeeData.password"
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
                v-model="employeeData.password_confirmation"
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
                v-model="employeeData.name"
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
                v-model="employeeData.type_document_id"
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
                v-model="employeeData.document"
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
                v-model="employeeData.phone"
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
            @click="saveEmployee()"
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
  import { saveEmployeeApi, updateEmployeeApi, getAllRolesApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminEmployeeAdd',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      employees: {
        type: Array,
        default: () => ([]),
      },
      employee: {
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
        employeeData: {
          id: null,
          email: '',
          password: '',
          password_confirmation: '',
          role_id: null,
          user_id: null,
          name: '',
          document: '',
          phone: '',
          type_document_id: '',
        },
        roles_data: [],
      }
    },
    computed: {
      ...mapState(['loadingState']),
      password () {
        return this.employeeData.password
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
      employeesComputed: {
        get () {
          return this.employees
        },
        set (value) {
          this.$emit('update:employees', value)
        },
      },
      employeeComputed: {
        get () {
          return this.employeeData
        },
        set (value) {
          this.$emit('update:employee', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar empleado' : 'Editar empleado'
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.employeeData, this.employee)
      },
    },
    created () {
      this.getRoles()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.indexEditComputed = -1
          this.employeeComputed = {}
          this.$refs.form.reset()
        })
      },
      async getRoles () {
        const serviceResponse = await getAllRolesApi()
        if (serviceResponse.ok) {
          this.roles_data = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      async saveEmployee () {
        if (this.validate) {
          this.SET_LOADING(true)
          const serviceResponse = this.indexEditComputed === -1 ? await saveEmployeeApi(this.employeeData)
            : await updateEmployeeApi(this.employeeData, this.employeeData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.employeesComputed.push(serviceResponse.data) : Object.assign(this.employeesComputed[this.indexEditComputed], serviceResponse.data)
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
