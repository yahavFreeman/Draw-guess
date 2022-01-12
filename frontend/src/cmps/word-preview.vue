<template>
  <div @click="$emit('chosen', word, indx)">
    <span>"</span><span class="word">{{ word }}</span
    ><span>"</span>
    <p>{{ indx ? (indx === 1 ? 3 : 5) : 1 }} Point<span v-if="indx">s</span></p>
  </div>
</template>

<script>
export default {
  props: {
    word: String,
    indx: Number,
  },
};
</script>
