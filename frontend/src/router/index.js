import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import waitingView from "../pages/waiting-view.vue";
import drawingView from "../pages/drawing-view.vue";
import guessingView from "../pages/guessing-view.vue";
import pickingView from "../pages/word-choosing.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/wait",
    name: "wait",
    component: waitingView,
  },
  {
    path: "/play",
    name: "play",
  },
  {
    path: "/draw",
    name: "draw",
    component: drawingView,
  },
  {
    path: "/pick",
    name: "pick",
    component: pickingView,
  },
  {
    path: "/guess",
    name: "guess",
    component: guessingView,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "play") {
    console.log(store.getters.isDrawer);
    if (!store.getters.isDrawer) next({ name: "guess" });
    else next({ name: "pick" });
  } else next();
});

export default router;
