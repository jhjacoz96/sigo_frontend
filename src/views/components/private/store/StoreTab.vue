<template>
  <v-card class="py-1">
    <v-slide-group
      v-model="activeDay"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="category in categories"
        :key="category.slug"
        v-slot:default="{ active }"
      >
        <v-btn
          id="no-background-hover"
          class="mx-2 rounded-xl"
          :class="active ? 'black--text font-weight-bold' : ''"
          :input-value="active"
          :ripple="true"
          depressed
          tile
          retain-focus-on-click
          :text="!active"
          active-class="grey lighten-4"
          @click="setActive(category.slug)"
        >
          {{ category.name }}
          <!-- <v-chip
              class="secondary ml-2 white--text"
              x-small
            >
              1
            </v-chip> -->
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>

<script>
  import { mapMutations } from 'vuex'
  import {
    getAllCategoriesApi,
  } from '@/api/services'
  export default {
    name: 'StoreTab',
    data () {
      return {
        categories: [],
        activeDay: 0,
        categoryActive: '',
      }
    },
    created () {
      this.getCategories()
    },
    methods: {
      ...mapMutations(['SET_ALERT']),
      prev () {
        if (this.activeDay === 0) return
        this.activeDay = this.activeDay - 1
      },
      next () {
        this.activeDay = this.activeDay + 1
      },
      setActive (slug) {
        this.activeDay = this.categories.findIndex(c => c.slug === slug)
        this.$emit('click:active', slug)
      },
      async getCategories () {
        const serviceResponse = await getAllCategoriesApi()
        if (serviceResponse.ok) {
          this.categories = serviceResponse.data
          this.categories.unshift({
            id: 0,
            name: 'Todos',
            slug: '',
          })
        } else {
          this.SET_ALERT({
            text: serviceResponse.message.text,
            color: 'warning',
          })
        }
      },
    },
  }
</script>

<style>
   #no-background-hover::before {
    background-color: transparent !important;
   }
</style>
