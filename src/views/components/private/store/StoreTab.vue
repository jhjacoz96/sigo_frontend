<template>
  <v-card class="py-1">
    <v-slide-group
      v-model="activeDay"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="d in items"
        :key="d.id"
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
          @click="setActive(d.id)"
        >
          {{ d.name }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { name: 'Todos', id: 1 },
          { name: 'Pinturas', id: 2 },
          { name: 'Herramientas', id: 3 },
          { name: 'Utencilios para pintar', id: 4 },
        ],
        activeDay: 2,
      }
    },
    methods: {
      prev () {
        if (this.activeDay === 0) return
        this.activeDay = this.activeDay - 1
      },
      next () {
        this.activeDay = this.activeDay + 1
      },
      setActive (id) {
        this.activeDay = this.items.findIndex(d => d.id === id)
      },
    },
  }
</script>

<style>
   #no-background-hover::before {
    background-color: transparent !important;
   }
</style>
