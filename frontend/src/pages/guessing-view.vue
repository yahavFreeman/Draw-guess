<template>
  <div class="content main-layout">
    <div class="flex guessing middle">
      <!-- <div class="flex user-details">
        <h3>user:{{ user.username }}</h3>
        <h3>score:{{ user.score }}</h3>
      </div> -->
      <p v-show="!difficulty && !canvasImg">
        Waiting for {{ user1 }} to pick a word
      </p>
      <p v-if="difficulty &&!canvasImg">
        {{ user1 }} picked a word with difficulty of {{ difficulty }}
        and is now drawing...
      </p>
      <form class="flex guess-form" v-if="canvasImg" @submit.prevent="submit">
        <p>{{ user1 }}'s drawing is:</p>
        <img :src="canvasImg" alt="" />
        <input type="text" placeholder="What is it?" v-model="guessedWord" />
        <p v-if="firstTry && !isCorrect">Wrong Guess please try again.</p>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service.js";

export default {
  data() {
    return {
      guessedWord: null,
      chosenWord: null,
      difficulty: null,
      canvasImg: null,
      isCorrect: false,
      firstTry: false,
    };
  },
  created() {
    this.startGuessing();
  },
  methods: {
    startGuessing() {
      socketService.on("newWord", this.printWord);
      socketService.on("newDrawing", this.printDrawing);
    },
    printWord(wordAndDifficulty) {
      this.chosenWord = wordAndDifficulty.word;
      this.difficulty = wordAndDifficulty.difficulty;
    },
    printDrawing(canvasImg) {
      this.canvasImg = canvasImg;
    },
    async submit() {
      this.firstTry = true;
      if (this.chosenWord.toLowerCase() === this.guessedWord.toLowerCase()) {
        this.isCorrect = true;
        const msg = "We won!";
        socketService.emit("guesser-done", msg);
        const score = this.difficulty;
        await this.$store.dispatch({ type: "setUserScore", score });
        this.reset();
      } else {
        this.guessedWord = null;
      }
    },
    reset() {
      (this.guessedWord = null),
        (this.chosenWord = null),
        (this.difficulty = null),
        (this.canvasImg = null),
        (this.isCorrect = false),
        (this.firstTry = false);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    user1() {
      return this.$store.getters.user1;
    },
  },
};
</script>
