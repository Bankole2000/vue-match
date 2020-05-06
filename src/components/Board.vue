<template>
  <div class="page">
    <v-content style="padding-top: 0px; width: 80vw; margin: auto;">
      <v-container>
        <v-layout class="d-flex wrap justify-center">
          <h1 class="display-1 grey--text text--darken-3 mt-4 ml-4 font-weight-thin">
            <span class="primary--text font-weight-regular">Matches</span>
            : <span :class="{'success--text font-weight-bold': gameWon,
            'error--text font-weight-bold': gameLost }">{{ cardsWon.length }}</span>
          </h1>
          <vac :end-time="new Date().getTime() + 60000" :auto-start="false" ref="vac2"
          @finish="endGame">
            <template
              v-slot:process="{ timeObj }">
              <h1 class="display-1 grey--text text--darken-3 mt-4 ml-4 font-weight-thin"
              style="text-align: center;">
                <span class="primary--text font-weight-regular">Time Left:</span>
                <span :class="{'success--text font-weight-bold': gameWon,
                'error--text font-weight-bold': gameLost }">
                  {{ `${timeObj.m}:${timeObj.s}` }}
                  </span></h1>
            </template>
            <template
              v-slot:finish>
              <h1 class="error--text text--darken-1 mt-4 ml-4 display-1">Time UP!</h1>
            </template>
          </vac>
        </v-layout>
        <v-container>
          <v-row>
            <v-col class="d-flex justify-center mx-auto py-0" cols="11" sm="11">
              <v-select
                :items="themes"
                label="Select Game Theme"
                v-model="theme"
                solo
                @change="startNewGame"
              ></v-select>
            </v-col>
          </v-row>

          <v-row v-if="gameComplete">
            <v-col class="d-flex justify-center align-center mx-auto pt-0" cols="11" sm="11" md="6">
              <h3 v-if="gameWon">
                <span class="success--text"
                  ><v-icon class="success--text">mdi-star-circle mdi-spin</v-icon>
                  You Won! 🥳🥳🎉
                </span>
                <span class="hidden-sm-and-down">
                  Congratulations
                </span>
              </h3>
              <h3 v-if="gameLost">
                <span class="error--text"
                  ><v-icon class="error--text">mdi-skull-crossbones</v-icon>
                  You Lost! 😭😭😭
                </span>
                <span class="hidden-sm-and-down">
                  Hey, just try again 🤗
                </span>
              </h3>
              <v-spacer></v-spacer>
              <v-btn class="primary" @click="startNewGame">New Game</v-btn>
            </v-col>
          </v-row>
          <div v-if="gameComplete" class="d-flex justify-center py-0">
            <h3>🎮 Try Selecting a different theme 👆</h3>
          </div>
          <div class="d-flex justify-center py-0" v-if='!gameComplete'>
            <strong>Life:</strong>
            <v-icon v-for="(i, index) in score" :key="index" class="error--text">mdi-heart</v-icon>
          </div>
        </v-container>
      </v-container>
      <Snackbar
        :snackbar="snackbar.snackbar"
        :text="snackbar.text"
        :sclass="snackbar.sclass"
        :timeout="snackbar.timeout"
      />
    </v-content>

    <v-layout style="margin: auto;">
      <div class="board">
        <div class="grid">
          <v-card
            class="mx-auto card"
            v-for="(card, i) in game.cards"
            :key="i"
            @click="canPlay ? flipCard(i, game, card) : '' "
            :data-id="i"
            :id="i"
          >
            <v-img
              class="white--text align-end card"
              v-if="flipped[i]"
              :src="card.img"
              ref="img"
              rel="preload"
              eager
            >
              <v-card-title
                v-if="flipped[i]"
                style="background-image: linear-gradient(to top, black, transparent);"
                class="hidden-sm-and-down"
                ><span class="card-name">{{ card.name }}</span></v-card-title
              >
            </v-img>
            <v-img
              class="white--text align-end card"
              v-if="!flipped[i]"
              :src="game.default[i].img"
              ref="img"
              eager
            >
              <v-card-title v-if="!flipped[i]"></v-card-title>
            </v-img>
          </v-card>
        </div>
      </div>
    </v-layout>
    <Loader :loading="loading" />
    <audio ref="victory" src="victory.mp3"></audio>
    <audio ref="defeat" src="defeat.webm"></audio>
    <audio ref="success" src="success.mp3"></audio>
    <audio ref="error" src="error.mp3"></audio>
    <div class="d-flex justify-center pt-5 pb-0">
      <audio autoplay loop controls ref="themeMusic" :src="themeOst"></audio>
    </div>
    <WelcomeModal :welcome='welcome' @startGame='startNewGame' />
    <Score :openWon='openWon' @startGame='startNewGame' :lives='score'
    :matches='cardsWon.length' :timeLeft='timeLeft' />
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import Loader from '@/components/Loader.vue';
import WelcomeModal from '@/components/WelcomeModal.vue';
import Score from '@/components/Score.vue';

export default {
  name: 'Board',
  components: {
    Snackbar,
    Loader,
    WelcomeModal,
    Score,
  },
  data() {
    return {
      theme: 'got',
      themeOst: 'audio/got.webm',
      loadingTime: 3000,
      timeLeft: 60,
      score: 10,
      canPlay: true,
      welcome: true,
      gameWon: false,
      gameLost: false,
      openWon: false,
      themes: [
        {
          text: 'Family Guy',
          value: 'familyguy',
        },
        {
          text: 'Finaly Fantasy VII',
          value: 'ffvii',
        },
        {
          text: 'Friends',
          value: 'friends',
        },
        {
          text: 'Game of Thrones',
          value: 'got',
        },
        {
          text: 'Naruto Shippuden',
          value: 'Naruto',
        },
        {
          text: 'Pokemon (Normal)',
          value: 'pokemon',
        },
        {
          text: 'Pokemon (Legendary)',
          value: 'pokemon2',
        },
        {
          text: 'Rick and Morty',
          value: 'rick',
        },
        {
          text: 'StarFox',
          value: 'starfox',
        },
        {
          text: 'Street Fighter',
          value: 'sf',
        },
        {
          text: 'Soul Calibur',
          value: 'soulc',
        },
        {
          text: 'Sonic The Hedgehog',
          value: 'sonic',
        },
        {
          text: 'Super Mario',
          value: 'mario',
        },
        {
          text: 'Tekken Tournament',
          value: 'tekken',
        },
        {
          text: 'The Big Bang Theory',
          value: 'tbbt',
        },
        {
          text: 'The Legend of Zelda',
          value: 'zelda',
        },
      ],
      cardArray: [],
      cardsChosen: [],
      cardsChosenId: [],
      cardsWon: [],
      game: {
        cards: [],
        default: {},
        empty: {},
      },
      gameComplete: false,
      flipped: Array(16).fill(false),
      cardsFlipped: [],
      snackbar: {
        snackbar: false,
        text: null,
        sclass: null,
        timeout: 1000,
      },
      loading: false,
      timeObj: {
        endTime: 1542634411361,
        speed: 1000,
        leftTime: 97019,
        d: '0',
        h: '00',
        m: '01',
        s: '37',
        ms: '019',
        org: {
          d: 0.001134247685185185,
          h: 0.02722194444444444,
          m: 1.6333166666666665,
          s: 37.998999999999995,
          ms: 19,
        },
        ceil: {
          d: 1,
          h: 1,
          m: 2,
          s: 98,
        },
      },
    };
  },
  methods: {
    // End Game
    endGame() {
      this.gameComplete = true;
      this.gameLost = true;
      this.canPlay = false;
      this.$refs.defeat.volume = 0.3;
      this.$refs.defeat.play();
      const end = Array(16).fill(true);
      this.flipped.splice(0, 16, ...end);
    },
    // Audio Stuff
    changeAudio(audio) {
      this.themeOst = audio.music;
      this.$refs.themeMusic.volume = audio.volume;
      if (this.$refs.themeMusic.play() !== undefined) {
        this.$refs.themeMusic.play()
          .then(() => {
            if (audio.startPoint) {
              this.$refs.themeMusic.currentTime = audio.startPoint;
            }
            this.loading = false;
            this.$refs.vac2.startCountdown(true);
            this.canPlay = true;
          })
          .catch((err) => console.log('AutoPlay Prevented', err));
      }
    },
    startNewGame() {
      this.welcome = false;
      this.loading = true;
      this.score = 10;
      this.openWon = false;
      this.timeLeft = 60;
      this.game = {
        cards: [],
        default: {},
        empty: {},
      };
      this.cardsFlipped = [];
      this.gameComplete = false;
      this.gameLost = false;
      this.gameWon = false;
      fetch(`/cards/${this.theme}.json`)
        .then((res) => res.json())
        .then((data) => {
          this.game.cards.push(...data.cards, ...data.cards);
          this.cardArray = this.game.cards;
          this.cardArray.sort(() => 0.5 - Math.random());
          this.game.default = data.default;
          this.game.empty = data.empty;
          this.imgsrc = this.game.default[0].img;
          this.flipped = Array(16).fill(false);
          this.cardArray = [];
          this.cardsChosen = [];
          this.cardsChosenId = [];
          this.cardsWon = [];
          setTimeout(() => {
            this.changeAudio(data.audio);
          }, this.loadingTime);
        });
    },
    checkForMatch(cards, ids) {
      // console.log(this.$refs.vac2.endTime - (new Date().getTime()));
      console.log(this.$refs.vac2.actualEndTime - (new Date().getTime()));
      if (cards[0] === cards[1]) {
        this.$refs.success.volume = 0.5;
        this.$refs.success.play();
        this.cardsWon.push(cards);
        this.cardsFlipped.push(...ids);
        this.cardsChosenId = [];
        this.cardsChosen = [];
        this.$refs.img[ids[0]].$el.classList.add('faded');
        this.$refs.img[ids[1]].$el.classList.add('faded');
        this.snackbar.snackbar = true;
        this.snackbar.text = 'Matched';
        this.snackbar.sclass = 'success';
        this.snackbar.timeout = 1000;
        this.canPlay = true;
        setTimeout(() => {
          this.snackbar.snackbar = false;
        }, this.snackbar.timeout);
        if (this.cardsWon.length === 8) {
          this.gameComplete = true;
          this.gameWon = true;
          this.canPlay = false;
          const rightNow = new Date().getTime();
          this.timeLeft = this.$refs.vac2.actualEndTime - rightNow;
          console.log(this.timeLeft, typeof (this.timeLeft));
          this.$refs.vac2.stopCountdown(true);
          this.openWon = true;
          this.$refs.victory.volume = 0.3;
          this.$refs.victory.play();
        }
        return;
      }
      this.$refs.error.volume = 0.5;
      this.$refs.error.play();
      this.cardsChosen = [];
      this.cardsChosenId = [];
      this.snackbar.snackbar = true;
      this.snackbar.text = 'Not Matched';
      this.snackbar.sclass = 'error';
      this.snackbar.timeout = 500;
      this.score -= 1;
      if (this.score === 0) {
        this.endGame();
        this.$refs.vac2.stopCountdown(true);
      }
      setTimeout(() => {
        this.snackbar.snackbar = false;
        this.$refs.img[ids[0]].$el.classList.remove('flipped');
        this.$refs.img[ids[1]].$el.classList.remove('flipped');
        this.flipped.splice(ids[0], 1, false);
        this.flipped.splice(ids[1], 1, false);
        this.canPlay = true;
      }, this.snackbar.timeout);
    },
    flipCard(i, game, card) {
      this.canPlay = false;
      if (this.cardsChosenId.includes(i) || this.cardsFlipped.includes(i)) {
        this.canPlay = true;
        return;
      }
      this.cardsChosen.push(card.name);
      this.cardsChosenId.push(i);
      this.$refs.img[i].$el.classList.toggle('flipped');
      this.flipped.splice(i, 1, true);
      if (this.cardsChosen.length === 1) {
        this.canPlay = true;
        return;
      }
      if (this.cardsChosen.length === 2) {
        setTimeout(() => {
          this.checkForMatch(this.cardsChosen, this.cardsChosenId);
        }, 300);
      }
    },
  },
  created() {
    // this.loading = true;
    fetch(`/cards/${this.theme}.json`)
      .then((res) => res.json())
      .then((data) => {
        this.game.cards.push(...data.cards, ...data.cards);
        this.cardArray = this.game.cards;
        this.cardArray.sort(() => 0.5 - Math.random());
        this.game.default = data.default;
        this.imgsrc = this.game.default[0].img;
        setTimeout(() => {
          // this.loading = false;

          if (this.$refs.themeMusic.play() !== undefined) {
            this.$refs.themeMusic.play()
              .then(() => {
                this.$refs.themeMusic.volume = 0.5;
              })
              .catch((err) => console.log('AutoPlay Prevented', err));
          }
        }, this.loadingTime);
      });
  },
  mounted() {
    /* Audio Stuff Begins here */
    // this.$refs.themeMusic.volume = 0.5;
    // this.$refs.themeMusic.play();
    /* Audio stuff ends here */
  },
};
</script>

<style>
.board {
  display: flex;
  width: 90%;
  margin: auto;
}

.grid {
  display: grid;
  gap: 0;
  grid-template-columns: repeat(4, 1fr);
  margin: auto;
  transform-style: preserve-3d;
}

.card {
  transform: rotateY(0deg) !important;
  transition: transform 0.3s;
  width: 22vw;
  /* transform-style: preserve-3d; */
  z-index: 2;
}

.card-name {
  transform: rotateY(180deg) !important;
  font-size: 0.8rem;
  line-height: 10%;
}
.flipped {
  transform: rotateY(180deg) !important;
  transition: transform 0.3s;
  /* transform-style: preserve-3d; */
  z-index: 2;
}
.faded {
  opacity: 0.3;
  filter: grayscale(100%);
}

@media screen and (min-width: 500px) {
  .card {
    width: 150px;
  }
}
</style>
