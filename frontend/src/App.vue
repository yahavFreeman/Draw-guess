<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <app-header />
    <router-view/>
    <app-footer />
  </div>
</template>
<script>
import appHeader from "./cmps/app-header";
import appFooter from "./cmps/app-footer";

export default {
  name: "app",
  components: {
    appHeader,
    appFooter,
  },
};
</script>
