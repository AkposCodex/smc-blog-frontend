<script>
import { RouterLink, RouterView } from "vue-router";

export default {};
</script>

<template>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;600;700&family=Crimson+Pro:wght@700&family=Sora:wght@200&display=swap");
a {
  text-decoration: underline;
  word-wrap: normal;
  height: min-content;
}

.formattedMedia a {
  color: #2536eb;
  text-decoration: underline;
}

.dark {
  background: #1b1b1f;
  color: #e4e1e6;
}

.h2 {
  font-family: Sora;
}

.dark input {
  background-color: transparent;
}
</style>
