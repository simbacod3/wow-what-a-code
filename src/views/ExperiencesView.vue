<script setup lang="ts">
import ExpCard from "@components/ui/ExpCard.vue";
import { useDataInjection } from "@composables/useDataInjection";
const { experiences = [] } = useDataInjection();
</script>

<template>
  <main class="wac-experiences-page page">
    <h1 v-if="experiences.length === 0">No results</h1>
    <ul v-else class="wac-experiences-page__list">
      <li v-for="experience in experiences" :key="experience.id">
        <ExpCard :experience="experience" />
      </li>
    </ul>
  </main>
</template>

<style lang="scss">
.wac-experiences-page {
  &__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: max-content;
    list-style: none;
    gap: 16px 8px;
    padding: 0;
    width: 100%;
    margin: 0;

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
