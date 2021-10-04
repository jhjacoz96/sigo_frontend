<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-cog"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Configuración
        </div>
      </template>
      <v-card>
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              label="Nombre de organización"
              outlined
            />
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-select
              label="Moneda"
              outlined
              :items="['BS', 'USD']"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
          >
            Actualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'AdminConfiguration',
  }
</script>
