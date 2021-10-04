<template>
  <v-container class="justify-center">
    <div class="text-center display-1 font-weight-light mb-6">
      Comencemos con información básica
    </div>
    <v-row justify="center">
      <v-col
        cols="10"
        md="6"
      >
        <v-text-field
          value="10/10/2021"
          label="fecha"
          filled
          solo
        />
      </v-col>
      <v-col
        cols="10"
        md="6"
      >
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          solo
          filled
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Nombre del cliente"
          placeholder="Ingrese el nombre del cliente"
          return-object
        />
      </v-col>
    </v-row>
    <v-card
      v-if="model"
    >
      <v-card-title>
        Datos del cliente
      </v-card-title>
      <v-card-text>
        <v-row class="justify-space-between">
          <v-col
            v-for="(detail, i) in details"
            :key="i"
            cols="6"
            md="4"
          >
            <div>{{ detail.value }}</div>
            <div class="grey--text">
              {{ detail.key }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminOrderAddFormClient',
    props: {
      city: {
        type: String,
        default: '',
      },
    },
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      details: undefined,
    }),
    computed: {
      changeCity: {
        get () {
          return this.city
        },
        set (value) {
          this.$emit('update:city', value)
        },
      },
      fields () {
        if (!this.model) return []
        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      },
    },

    watch: {
      model (val) {
        if (!val) this.details = []
        this.details = Object.keys(val).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            // console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
  }
</script>
