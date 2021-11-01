<template>
  <v-app-bar
    absolute
    app
    color="white"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down"
      v-text="$route.name"
    />

    <v-spacer />

    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      solo
      dense
      filled
      class="mt-6"
      style="max-width: 265px;"
    >
      <template

        v-slot:append-outer
      >
        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          class="mt-n2"
          small
          fab
          dark
          color="primary"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field> -->
    <!-- <v-btn
      min-width="0"
      text
      to="/tienda/buscar"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn> -->
    <div class="mx-1" />
    <v-btn
      v-if="countCartGetter > 0"
      min-width="0"
      text
      to="/tienda/carrito"
    >
      <v-badge
        color="primary"
        overlap
      >
        <template v-slot:badge>
          <span class="caption">{{ countCartGetter }}</span>
        </template>

        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
    <v-btn
      v-else
      min-width="0"
      text
      to="/tienda/carrito"
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <div class="mx-1" />
    <v-btn
      min-width="0"
      text
      @click="logout"
    >
      <v-icon>mdi-power</v-icon>
    </v-btn>
    <shared-confirm-logout
      :dialog.sync="dialogLogout"
    />
  </v-app-bar>
</template>

<script>
  // Components
  // import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  export default {
    name: 'DashboardCoreAppBar',

    components: {
      /* AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      }, */
      SharedConfirmLogout: () => import('@/views/components/private/shared/SharedConfirmLogout'),
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      dialogLogout: false,
      profile: [
        { title: 'Profile' },
        { title: 'Settings' },
        { divider: true },
        { title: 'Log out' },
      ],
    }),
    computed: {
      ...mapState(['drawer']),
      ...mapState('cart', ['countCartState']),
      ...mapGetters('cart', ['countCartGetter']),
    },
    created () {
      this.getCart()
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions('cart', ['getCartAction']),
      ...mapActions('auth', ['logoutAction']),
      logout () {
        this.dialogLogout = true
      },
      async getCart () {
        const serviceResponse = await this.getCartAction()
        if (!serviceResponse.ok) {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>
