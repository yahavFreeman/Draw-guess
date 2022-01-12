<template>
  <div class="content">
    <div class="home middle">
      <div class="demo">
        <p>Demo users:</p>
        <button @click="logYossi">Yossi</button>
        <button @click="logMoshe">Moshe</button>
      </div>

      <div v-if="!loggedUser" class="user-inputs-container">
        <input type="text" placeholder="User name" v-model="user.username" />
        <input type="text" placeholder="Password" v-model="user.password" />
        <button v-if="!isSignup" @click="logUser">login</button>
        <button v-else @click="signUp">Sign Up</button>
        <p>Don't have an account?</p>
        <p class="signup" @click="isSignup = true">Sign Up</p>
      </div>
      <button v-else @click="goPlay">Search Companion</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSignup: false,
      user: {
        username: null,
        password: null,
        score: 0,
      },
    };
  },
  methods: {
    logYossi() {
      this.user.username = "Yossi";
      this.user.password = "1";
      this.logUser();
    },
    logMoshe() {
      this.user.username = "Moshe";
      this.user.password = "1";
      this.logUser();
    },
    async signUp() {
      console.log("in");
      const user = this.user;
      await this.$store.dispatch({ type: "signUser", user });
      this.$router.push("/wait");
    },
    async logUser() {
      const user = this.user;
      try {
        const isUser = await this.$store.dispatch({ type: "setUser", user });
        console.log(isUser);
        this.$router.push("/wait");
      } catch (err) {
        alert(err, "Wrong username or password");
        this.user = {
          username: null,
          password: null,
        };
      }
    },
    goPlay() {
      this.$router.push("/wait");
    },
  },
  computed: {
    loggedUser() {
      return this.$store.getters.user;
    },
  },
  components: {},
};
</script>
