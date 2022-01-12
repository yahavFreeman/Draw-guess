<template>
  <div class="content">
    <div class="words middle flex between">
      <h3>Choose a word to draw</h3>
      <div class="words-contianer">
        <p v-for="(word, indx) in randomWords" :key="word">
          <word-preview @chosen="setWord" :word="word" :indx="indx" />
        </p>
      </div>
      <p>Don't want to draw any of the words?</p>
      <button @click="renderWords">Shuffle</button>
    </div>
  </div>
</template>

<script>
import wordPreview from "@/cmps/word-preview";
export default {
  data() {
    return {
      wordAndDifficulty: {
        word: null,
        difficulty: null,
      },
    };
  },
  created() {
    this.sendWord();
  },
  methods: {
    setWord(word, indx) {
      this.wordAndDifficulty.word = word;
      this.wordAndDifficulty.difficulty = indx ? (indx === 1 ? 3 : 5) : 1;
      this.sendWord();
      this.$router.push("/draw");
    },
    async sendWord() {
      const wordAndDifficulty = this.wordAndDifficulty;
      await this.$store.dispatch({ type: "setChosenWord", wordAndDifficulty });
      socketService.emit("word-and-difficulty", wordAndDifficulty);
    },
    renderWords() {
      this.$store.commit({ type: "setWords" });
    },
  },
  computed: {
    randomWords() {
      return this.$store.getters.words;
    },
  },
  components: {
    wordPreview,
  },
};
</script>
