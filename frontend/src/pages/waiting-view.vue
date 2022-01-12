<template>
  <div class="content main-layout">
    <div class="middle waiting">
      <div>
        <h3>Hi there, Join the Que to find a partner</h3>
        <button @click="createSocket">Join Que</button>
      </div>
    </div>
  </div>
</template>

<script>
import { socketService } from "@/services/socket.service.js";
export default {
  data() {
    return {
      canStart: false,
    };
  },
  created() {
    socketService.on("start-playing", this.enableStart);
    socketService.on("drawer", this.setDrawer);
    socketService.on("guesser", this.setCompanion);
  },
  methods: {
    createSocket() {
      socketService.emit("game-ready", "play");
      socketService.emit("set-drawer", this.user);
    },
    setDrawer(drawer) {
      console.log(drawer._id);
      if (drawer._id === this.user._id) {
        this.$store.commit({ type: "setDrawer" });
      } else {
        var companion = drawer;
        this.$store.commit({ type: "setCompanion", companion });
      }
    },
    async setCompanion(currUsers) {
      var companions = currUsers;
      await this.$store.dispatch({ type: "setCompanions", companions });
    },
    enableStart() {
      this.$router.push("/play");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isDrawer() {
      return this.$store.getters.drawer;
    },
  },
};
</script>
