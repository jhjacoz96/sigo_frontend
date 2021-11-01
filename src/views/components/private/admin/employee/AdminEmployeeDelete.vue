<template>
  <v-dialog
    v-model="dialogComputed"
    max-width="400"
    persistent
  >
    <v-card
      relative
    >
      <v-btn
        :disabled="loadingState"
        icon
        absolute
        right
        large
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text class="text-center">
        ¿Está seguro que desea realizar esta acción?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="loadingState"
          :loading="loadingState"
          color="primary"
          @click="deleteEmployee"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import { deleteEmployeeApi } from '@/api/services'
  export default {
    name: 'AdminEmployeeDelete',
    props: {
      dialogDelete: {
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
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState(['loadingState']),
      employeesComputed: {
        get () {
          return this.employees
        },
        set (value) {
          this.$emit('update:employees', value)
        },
      },
      dialogComputed: {
        get () {
          return this.dialogDelete
        },
        set (value) {
          this.$emit('update:dialogDelete', value)
        },
      },
    },
    watch: {
      dialog (value) {
        value || this.close()
      },
    },
    methods: {
      ...mapMutations(['SET_LOADING', 'SET_ALERT']),
      async deleteEmployee () {
        this.SET_LOADING(true)
        const serviceResponse = await deleteEmployeeApi(this.employee.id)
        if (serviceResponse.ok) {
          var index = this.employeesComputed.indexOf(this.employee)
          this.employeesComputed.splice(index, 1)
          this.SET_ALERT({
            text: serviceResponse.message,
            color: 'success',
          })
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
        this.close()
        this.SET_LOADING(false)
      },
      close () {
        this.$nextTick(() => {
          this.dialogComputed = false
        })
      },
    },
  }
</script>
