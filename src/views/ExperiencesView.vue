<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { FilterType } from "@/interfaces/filters";
import type { FilterValue, RangePriceValue } from "@/interfaces/filters";
import ExpCard from "@components/ui/ExpCard.vue";
import Filters from "@components/filters/Filters.vue";
import { useDataInjection } from "@composables/useDataInjection";

const currentDay = new Date();
const currentDayInFrenchFormat = currentDay.toLocaleDateString("fr-FR");
const { experiences, filters } = useDataInjection();

const filteredExperiences = computed(() => {
  if (!experiences.value) return [];
  return experiences.value.filter((experience) => {
    return filters.value.every((filter, index) => {
      if (!isActiveFilter(activeFilters.value[index])) return true;

      if (filter.type === FilterType.Select) {
        const typedActiveFilter = activeFilters.value[index] as string[];
        return typedActiveFilter.includes(experience[filter.property]);
      }

      if (filter.type === FilterType.Range) {
        const typedActiveFilter = activeFilters.value[index] as RangePriceValue;
        return (
          experience[filter.property] >= typedActiveFilter[0] &&
          experience[filter.property] <= typedActiveFilter[1]
        );
      }

      if (filter.type === FilterType.Checkbox) {
        return activeFilters.value[index] === experience[filter.property];
      }

      // Not sure what is expected for Date filter as experiences doesn't contain any date property
      // so we don't filter items based on the date filter for the moment

      return true;
    });
  });
});
const defaultActiveFilters = computed(() => {
  return filters.value.map<FilterValue>((filter) => {
    if (filter.type === FilterType.Checkbox) return false;
    if (filter.type === FilterType.Range) return [filter.min, filter.max];
    if (filter.type === FilterType.Date) return ["", ""];
    return [];
  });
});
const activeFilters = ref<Array<FilterValue>>(defaultActiveFilters.value);

const isActiveFilter = (filter: FilterValue) => {
  return Array.isArray(filter) ? filter.length > 0 : filter !== false;
};

watch(filters, () => (activeFilters.value = defaultActiveFilters.value));
</script>

<template>
  <main class="wac-experiences-page page">
    <h1>Discover our experiences</h1>
    <div class="wac-experiences-page__filters-bar">
      <div class="wac-experiences-page__filters-title">
        <span>Today is: {{ currentDayInFrenchFormat }}</span>
        <button v-if="filters.length > 0" @click="activeFilters = defaultActiveFilters">
          Reset filters
        </button>
      </div>
      <Filters v-if="filters.length > 0" :filters="filters" v-model:activeFilters="activeFilters" />
    </div>
    <h2 v-if="filteredExperiences.length === 0">No results</h2>
    <ul v-else class="wac-experiences-page__list">
      <li v-for="experience in filteredExperiences" :key="experience.id">
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

  &__filters-bar {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__filters-title {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
