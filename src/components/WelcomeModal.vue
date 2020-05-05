<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="300">

      <v-card style="text-align: center;">
        <v-card-title class="headline mx-auto" style="justify-content: center;">
          🎮 How to Play</v-card-title>
          <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left class="primary--text hidden-md-and-down">
                mdi-cursor-default-click</v-icon>
              <v-icon class="primary--text">mdi-gesture-tap</v-icon>
            📷 <span class="hidden-md-and-down">Click / </span>
            <span class="hidden-lg">Tap</span>
            to Flip
            </v-list-item-title>
            <v-list-item-subtitle>Click or tap on the image to flip a card</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left class="warning--text">mdi-cards</v-icon>
              🃏🃏 Flip to Match
            </v-list-item-title>
            <v-list-item-subtitle>Find Pairs of cards to score points</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <v-icon left class="success--text">mdi-star</v-icon>
              👍🥳 Match All to Win!
            </v-list-item-title>
            <v-list-item-subtitle>Match all the Cards to
              win the game
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>


          <v-btn block="" color="primary" @click="$emit('startGame')">Okay, Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: 'WelcomePopup',
  props: ['welcome'],
  data() {
    return {
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    };
  },
  components: {

  },
  methods: {

  },
  computed: {
    dialog() {
      return this.welcome;
    },
  },
};
</script>

<style></style>
