<template>
  <v-app>
    <v-app-bar
      app

      light
    >
    <v-toolbar-title class="text-uppercase grey--text text--lighten-3">
        <span class="font-regular secondary--text">Match</span>
        <span class="primary--text font-weight-bold">Maker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>


      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/bankole2000/vue-match"
        target="_blank"
        text
      >
        <span class="mr-2">Star On Github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Board />

    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Board from '@/components/Board.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Board,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
