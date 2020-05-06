<template>
  <v-row justify="center">
    <v-dialog v-model="open" persistent max-width="300">

      <v-card style="text-align: center;">
        <v-card-title class="headline mx-auto" style="justify-content: center;">
          🥳 You Won 🎉</v-card-title>
          <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              🃏🃏 Matches found: <span class="success--text">{{ matches }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              💖 Lives left: <v-icon v-for="life in lives" :key="life"
              class="error--text">
                mdi-heart</v-icon> ({{ lives }})
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              ⏱ Time left: {{ Math.floor(timeLeft/1000) }} seconds
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold pb-3 mb-3">
             🎯🎮 Final Score - 🃏 x 💖 x ⏱
            </v-list-item-title>
            <v-divider></v-divider>
            <h1 class="display-1">{{ Math.floor(timeLeft/1000) * lives * matches }}</h1>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="primary"  @click="$emit('startRandomGame')">New Game</v-btn>
          <v-btn color="error" @click="openWon = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'wonModal',
  props: ['matches', 'lives', 'timeLeft', 'openWon'],
  data() {
    return {

    };
  },
  computed: {
    open() {
      return this.openWon;
    },
  },
};
</script>

<style>

</style>
