<template>
  <div class="content">
    <div class="middle drawing">
      <div class="flex user-details">
        <h3>user:{{ user.username }}</h3>
        <h3>score:{{ user.score }}</h3>
      </div>
      <div class="choice-details">
        <h4 v-if="chosenWord">
          Chosen word: {{ chosenWord }}, {{ difficulty }} point<span
            v-if="difficulty > 1"
            >s</span
          >
        </h4>
      </div>
      <p v-if="chosenWord && isCompanionWaiting">
        {{ user2 }} is waiting for your drawing
      </p>
      <p v-if="chosenWord && !isCompanionWaiting">
        {{ user2 }} is solving your drawing
      </p>
      <draw-canvas v-if="chosenWord" @submit="submitCanvs" />
      <div v-else class="restart">
        <h3>You and {{ user2 }} did it!!</h3>
        <button @click="$router.push('/pick')">New Word</button>
      </div>
    </div>
  </div>
</template>

<script>
import drawCanvas from "@/cmps/draw-canvas";
import { socketService } from "@/services/socket.service.js";
export default {
  data() {
    return {
      isCompanionWaiting: true,
      GuesserError: false,
    };
  },
  methods: {
    submitCanvs(canvasImg) {
      this.isCompanionWaiting = false;
      socketService.emit("drawer-done", canvasImg);
      socketService.on("sessionOver", this.reset);
    },
    async reset() {
      console.log("in");
      const score = this.difficulty;
      await this.$store.dispatch({ type: "setUserScore", score });
      socketService.off("sessionOver");
    },
  },
  computed: {
    chosenWord() {
      return this.$store.getters.chosenWord;
    },
    difficulty() {
      return this.$store.getters.difficulty;
    },
    user() {
      return this.$store.getters.user;
    },
    user2() {
      return this.$store.getters.user2;
    },
  },
  components: {
    drawCanvas,
  },
};
</script>
