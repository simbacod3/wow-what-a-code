<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@components/globals/TheHeader.vue";
import TheFooter from "@components/globals/TheFooter.vue";
</script>

<template>
  <header class="wac-header">
    <TheHeader />
  </header>
  <main class="wac-main">
    <RouterView />
  </main>
  <footer class="wac-footer">
    <TheFooter />
  </footer>
</template>

<style scoped lang="scss">
.wac {
  &-header {
    position: sticky;
    top: 0;
    padding-inline: 3rem;
    padding-block-start: 1em;
  }
}
</style>
