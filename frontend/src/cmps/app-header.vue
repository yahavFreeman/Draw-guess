<template>
  <div class="main-layout">
    <div class="app-header flex between">
      <h3 class="logo" @click="goHome">Draw & Guess</h3>
      <div class="side-bar flex">
        <p v-if="user" @click="logout">Log-out</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch({ type: "logoutUser" });
      this.$router.push("/");
      this.$router.go();
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
