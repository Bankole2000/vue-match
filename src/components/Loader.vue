<template>
    <v-dialog v-model="nowLoading"

      max-width="500"
      persistent
      >
      <v-card
      color="success"
      dark
      class="py-2"
      >
      <v-card-text pt-3>
        <span >Starting New Game</span>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
          >
        </v-progress-linear>
      </v-card-text>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Loader',
  props: ['loading'],
  computed: {
    nowLoading() {
      return this.loading;
    },
  },
};
</script>

<style>

</style>
