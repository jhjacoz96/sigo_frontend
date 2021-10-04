<template>
  <v-card class="text-center">
    <v-row
      style="max-width: 600px;"
      justify="center"
    >
      <v-col
        cols="6"
        md="4"
      >
        <v-text-field
          label="Fecha desde"
          dense
          solo
        />
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-text-field
          label="Fecha hasta"
          dense
          solo
        />
      </v-col>
      <v-col
        cols="6"
        md="4"
      >
        <v-select
          label="Estado"
          dense
          solo
        />
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer />
      <v-btn
        outlined
        color="primary"
      >
        Limpiar
      </v-btn>
      <v-btn
        color="primary"
      >
        Filtrar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
