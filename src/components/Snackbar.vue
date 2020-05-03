<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      bottom
      right

    >
      {{ text }}
      <v-btn
        :color="sclass"
        text
        @click="snackbar = false"
      >
      <v-icon left v-if="sclass == 'success'">
        mdi-check-bold
      </v-icon>
      <v-icon left v-if="sclass == 'error'">
        mdi-close-box
      </v-icon>
      <v-icon left v-if="sclass == 'warning'">
        mdi-alert
      </v-icon>
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: ['snackbar', 'text', 'sclass', 'timeout'],
  data() {
    return {

    };
  },
};
</script>

<style>

</style>
