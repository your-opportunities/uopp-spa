<template>
  <div class="container" :class="containerClass">
    <AppHeader />
    <main class="content">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

const route = useRoute();
const containerClass = computed(() => {
  return route.meta.backgroundColor === "white"
    ? "container background-white"
    : "container background-black";
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 1.75rem;
}
.content {
  flex-grow: 1;
}
</style>
