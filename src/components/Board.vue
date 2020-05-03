<template>
<div class="page">

  <p>{{ cardsWon.length }}</p>
  <Snackbar :snackbar='snackbar.snackbar' :text='snackbar.text' :sclass='snackbar.sclass'
      :timeout='snackbar.timeout' />
  <div class="board">

    <div class="grid">
    <v-card
    class="mx-auto card"
    max-width="200"
    v-for="(card, i) in game.cards"
    :key = i
    @click='flipCard(i, game, card)'

    :data-id = i
    :id = i
  >

    <v-img
      class="white--text align-end card"
      contain
      aspect-ratio="1"
      v-if="flipped[i]"
      :src="card.img"
      ref="img"
    >
      <v-card-title v-if="flipped[i]"
      style="background-image: linear-gradient(to top, black, transparent)"><span
      class="card-name">{{ card.name }}</span></v-card-title>
    </v-img>
    <v-img
      class="white--text align-end card"
      v-if="!flipped[i]"
      :src="game.default[i].img"
      ref="img"
    >
      <v-card-title v-if="!flipped[i]"></v-card-title>
    </v-img>

  </v-card>
    </div>
  </div>
</div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';

export default {
  name: 'Board',
  components: {
    Snackbar,
  },
  data() {
    return {
      theme: 'zelda',
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      game: {
        cards: [],
        default: {},
        empty: {},
      },
      flipped: Array(16).fill(false),
      snackbar: {
        snackbar: false,
        text: null,
        sclass: null,
        timeout: 1000,
      },
    };
  },
  methods: {
    checkForMatch(cards, ids) {
      if (cards[0] === cards[1]) {
        console.log('matched', ids);
        this.cardsWon.push(cards);
        this.cardsChosenId = [];
        this.cardsChosen = [];
        this.$refs.img[ids[0]].$el.classList.add('faded');
        this.$refs.img[ids[1]].$el.classList.add('faded');
        this.snackbar.snackbar = true;
        this.snackbar.text = 'Matched';
        this.snackbar.sclass = 'success';
        this.snackbar.timeout = 1000;
        setTimeout(() => {
          this.snackbar.snackbar = false;
        }, this.snackbar.timeout);
        return;
      }
      console.log('not matched', ids);
      this.cardsChosen = [];
      this.cardsChosenId = [];
      this.$refs.img[ids[0]].$el.classList.remove('flipped');
      this.$refs.img[ids[1]].$el.classList.remove('flipped');
      this.flipped.splice(ids[0], 1, false);
      this.flipped.splice(ids[1], 1, false);
      this.snackbar.snackbar = true;
      this.snackbar.text = 'Not Matched';
      this.snackbar.sclass = 'error';
      this.snackbar.timeout = 1000;
      setTimeout(() => {
        this.snackbar.snackbar = false;
      }, this.snackbar.timeout);
    },
    flipCard(i, game, card) {
      // console.log(i, game, $event);
      if (this.cardsChosenId.includes(i)) {
        console.log('already chosen card');
        return;
      }
      this.cardsChosen.push(card.name);
      this.cardsChosenId.push(i);
      console.log(this.cardsChosen, this.cardsChosenId);
      this.$refs.img[i].$el.classList.toggle('flipped');
      // this.$refs.img[i].$options.propsData.src = game.cards[i].img;
      // arr.$set(index, value)
      // arr.splice(index, 1, value)
      this.flipped.splice(i, 1, true);
      if (this.cardsChosen.length === 2) {
        console.log('chosen 2 cards');
        setTimeout(() => {
          this.checkForMatch(this.cardsChosen, this.cardsChosenId);
        }, 300);
      }
      // console.log(this.flipped, this.flipped[i], $event);
    },
  },
  created() {
    fetch(`/cards/${this.theme}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.game.cards.push(...data.cards, ...data.cards);
        this.cardArray = this.game.cards;
        this.cardArray.sort(() => 0.5 - Math.random());
        this.game.default = data.default;
        this.game.empty = data.empty;
        this.imgsrc = this.game.default[0].img;
      });
  },
};
</script>

<style>
.board {
  max-width: 800px;
  display: flex;
  margin: auto;
}

.board .grid {
  display: grid;
  gap: 0;
  max-width: 600px;
  max-height: 600px;
  grid-template-columns: repeat(4, 1fr);

  transform-style: preserve-3d;
}

.card {
  transform: rotateY(0deg) !important;
  transition: transform 0.3s;
  /* transform-style: preserve-3d; */
  z-index: 2;
}

.card-name {
  transform: rotateY(180deg) !important;
}
.flipped{
  transform: rotateY(180deg) !important;
  transition: transform 0.3s;
  /* transform-style: preserve-3d; */
  z-index: 2;
}
.faded {
  opacity: .3;
  border-bottom: 1px solid green;
}

</style>
