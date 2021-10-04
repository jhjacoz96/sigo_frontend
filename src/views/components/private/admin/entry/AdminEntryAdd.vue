<template>
  <v-container fluid>
    <admin-entry-add-form />
  </v-container>
</template>

<script>
  export default {
    name: 'AdminEntryAdd',
    components: {
      AdminEntryAddForm: () => import('./AdminEntryAddForm'),
    },
  }
</script>
