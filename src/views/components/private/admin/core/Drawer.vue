<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-break-point="960"
    app
    width="260"
    overlay-color="secondary"
    color="primary"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <!-- <span class="logo-mini">{{ $t('ct') }}</span> -->
          <span class="logo-normal">{{ $t('name-app') }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <base-item
        :item="profile"
      />
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        />
        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
    mapGetters,
  } from 'vuex'

  export default {
    name: 'AdminCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        items: [
          {
            icon: 'mdi-home',
            title: 'Inicio',
            can: 'home',
            to: '/admin',
          },
          {
            group: '/admin',
            icon: 'mdi-widgets',
            title: 'Inventario',
            can: 'inventary',
            children: [
              {
                title: 'Categorias',
                can: 'category.index',
                to: 'categoria',
              },
              {
                title: 'Productos',
                can: 'product.index',
                to: 'producto',
              },
            ],
          },
          {
            group: '/admin',
            icon: 'mdi-widgets',
            title: 'Compras',
            can: 'purchase',
            children: [
              {
                title: 'Gastos',
                can: 'expense.index',
                to: 'gasto',
              },
              {
                title: 'Proveedores',
                can: 'provider.index',
                to: 'proveedor',
              },
            ],
          },
          {
            icon: 'mdi-shopping',
            title: 'Pedidos',
            can: 'order.index',
            to: '/admin/pedido',
          },
          {
            group: '/admin',
            icon: 'mdi-account',
            title: 'Usuarios',
            can: 'user',
            children: [
              {
                title: 'Clientes',
                can: 'client.index',
                to: 'cliente',
              },
              {
                title: 'Empleados',
                can: 'employee.index',
                to: 'empleado',
              },
              {
                title: 'Roles y permisos',
                can: 'role.index',
                to: 'rol',
              },
            ],
          },
          {
            icon: 'mdi-store-cog-outline',
            title: 'Configuración',
            can: 'organization.index',
            to: '/admin/configuracion',
          },
        ],
      }
    },

    computed: {
      ...mapState(['barColor', 'barImage']),
      ...mapGetters('auth', ['permissionsDrawerGetter']),
      ...mapState('auth', ['userState']),
      profile () {
        return {
          icon: 'mdi-account',
          title: this.userState.profile.name,
          to: '/admin/perfil',
        }
      },
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.filter(this.filterItem).map(this.mapItem)
      },
    },

    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      },
    },

    methods: {
      filterItem (item) {
        var access = this.permissionsDrawerGetter.includes(item.can)
        return access
      },
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.filter(this.filterItem).map(this.mapItem) : undefined,
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
