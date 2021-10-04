<template>
  <v-container fluid>
    <base-material-card
      icon="mdi-account"
      color="secondary"
    >
      <template v-slot:after-heading>
        <div class="font-weight-light card-title mt-2">
          Editar perfil
        </div>
        <div class="red--text">
          Debe completar los datos de su perfil para poder continuar
        </div>
      </template>
      <v-container>
        <v-subheader>
          Datos basicos
        </v-subheader>
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="6"
            sm="4"
          >
            <v-text-field
              label="Nombre y apellido (*)"
              outlined
            />
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <v-text-field
              label="Cédula de identidad (*)"
              outlined
            />
          </v-col>
          <v-col
            cols="6"
            sm="4"
          >
            <v-text-field
              label="Correo electrónico (*)"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
        >
          Editar
        </v-btn>
      </v-card-actions>
    </base-material-card>
  </v-container>
</template>
