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
        <v-card-text class="mt-2">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="roleData.name"
                :rules="validation_rules_name"
                label="Nombre"
                dense
                outlined
              />
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <pre> {{ roleData.permissions }} </pre> -->
        <v-card-text>
          <div class="d-flex">
            <div>Permisos</div>
            <v-divider />
          </div>
          <v-checkbox
            v-model="selectAll"
            label="Seleccionar todos los permisos"
            color="secondary"
          />
          <v-row>
            <v-col
              cols="12"
              sm="5"
            >
              <v-list
                nav
                dense
              >
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, i) in getAllPermissions"
                    :key="i"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="$t(`modules.${item.name}`)" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col
              cols="12"
              sm="5"
            >
              <v-container
                v-for="(item, i) in getAllPermissions"
                v-show="i === selectedItem"
                :key="i"
              >
                <div class="font-weight-medium mb-4">
                  {{ $t(`modules.${item.name}`) }}
                </div>
                <!-- <v-checkbox
                  label="Seleccionar todo"
                  color="secondary"
                  class="my-4"
                  :value="'Jhon'"
                /> -->
                <v-checkbox
                  v-for="(permission, ii) in item.permissions"
                  :key="ii"
                  v-model="roleData.permissions"
                  :label="$t(permission)"
                  color="secondary"
                  class="my-0"
                  :class="findItemIndex(permission) ? 'ml-0' : 'ml-4'"
                  :value="permission"
                />
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="(!valid || loadingState) && roleData.permissions.length > 0"
            :loading="loadingState"
            @click="saveItem()"
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
  import { saveRoleApi, updateRoleApi, getPermissionsApi } from '@/api/services'
  import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'AdminRoleAdd',
    mixins: [validationRules],
    props: {
      dialog: {
        type: Boolean,
        default: false,
      },
      roles: {
        type: Array,
        default: () => ([]),
      },
      role: {
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
        d: ['Jhon'],
        valid: true,
        roleData: {
          id: null,
          name: '',
          permissions: [],
        },
        tab: 0,
        tabs: [
          'Profile',
          'Settings',
          'Options',
        ],
        selectedItem: 0,
        items: [
          { text: 'Gestionar categorias' },
          { text: 'Gestionar productos' },
          { text: 'Gestionar gastos' },
          { text: 'Gestionar proveedores' },
          { text: 'Gestionar ordenes' },
          { text: 'Gestionar clientes' },
          { text: 'Gestionar empleados' },
          { text: 'Configurar organización' },
        ],
        permissions: [],
      }
    },
    computed: {
      ...mapState(['loadingState']),
      validate () {
        return this.$refs.form.validate()
      },
      selectAll: {
        get () {
          return this.roleData.permissions.length === this.permissions.length
        },
        async set (value) {
          await this.changeAllPermissions(value)
        },
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
      rolesComputed: {
        get () {
          return this.roles
        },
        set (value) {
          this.$emit('update:roles', value)
        },
      },
      roleComputed: {
        get () {
          return this.roleData
        },
        set (value) {
          this.$emit('update:role', value)
        },
      },
      title () {
        return this.indexEditComputed === -1 ? 'Agregar rol' : 'Editar rol'
      },
      /* getPermissions () {
        if (this.permissions.length > 0) return []
        var group = this.
      }, */
      getAllPermissions () {
        if (this.permissions.length <= 0) return []
        var group = this.groupPermissions(this.permissions)
        return group
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
      indexEdit (value) {
        if (value !== -1) Object.assign(this.roleData, this.role)
      },
    },
    created () {
      this.getPermissions()
    },
    methods: {
      ...mapMutations(['SET_ALERT', 'SET_LOADING']),
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
          this.$refs.form.reset()
          this.indexEditComputed = -1
          this.roleComputed = {}
          this.SET_LOADING(false)
        })
      },
      async saveItem () {
        const v = this.$refs.form.validate()
        if (v) {
          this.SET_LOADING(true)
          const serviceResponse = this.indexEditComputed === -1 ? await saveRoleApi(this.roleData)
            : await updateRoleApi(this.roleData, this.roleData.id)
          if (serviceResponse.ok) {
            this.indexEditComputed === -1 ? this.rolesComputed.push(serviceResponse.data) : Object.assign(this.rolesComputed[this.indexEditComputed], serviceResponse.data)
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
      async getPermissions () {
        const serviceResponse = await getPermissionsApi()
        if (serviceResponse.ok) {
          this.permissions = serviceResponse.data
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
      groupPermissions (array) {
        var arrayPermissions = []
        array.reduce((acc, item, index, array) => {
          var nameModule = this.findModule(item)
          if (nameModule !== acc) {
            var modulee = {
              name: nameModule,
              permissions: this.filterModuleItems(nameModule, array),
            }
            arrayPermissions.push(modulee)
          }
          return nameModule
        }, '')
        return arrayPermissions
      },
      findModule (item) {
        var index = item.indexOf('.')
        var newModule = item.substring(0, index)
        return newModule
      },
      findItemIndex (item) {
        var index = item.indexOf('.')
        var value = item.substring(index + 1)
        if (value === 'index') return true
        return false
      },
      filterModuleItems (value, array) {
        return array.filter(item => {
          return value === this.findModule(item)
        })
      },
      changeAllPermissions (value) {
        if (value) {
          this.roleData.permissions = this.permissions
        } else {
          this.roleData.permissions = []
        }
      },
    },
  }
</script>
