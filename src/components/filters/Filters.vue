<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { FilterType } from "@/interfaces/filters";
import type { Filter, FilterValue, RangePriceValue, RangeDateValue } from "@/interfaces/filters";
import PriceRange from "@components/filters/PriceRange.vue";
import DatePicker from "@components/filters/DatePicker.vue";

export interface FiltersInterface {
  filters: Array<Filter>;
}

const props = defineProps<FiltersInterface>();
const activeFilters = defineModel("activeFilters", { type: Array<FilterValue>, required: true });
</script>

<template>
  <div class="wac-filters">
    <div v-for="(filter, index) in props.filters" :key="index">
      <label v-if="filter.label" :for="`${filter.type}-${index}`">{{ filter.label }}</label>
      <select
        v-if="filter.type === FilterType.Select"
        :name="`${filter.type}-${index}`"
        v-model="activeFilters[index]"
        multiple
      >
        <option v-for="value in filter.values" :key="value" :value="value">{{ value }}</option>
      </select>
      <input
        id="checkbox"
        v-else-if="filter.type === FilterType.Checkbox"
        :type="filter.type"
        :name="`${filter.type}-${index}`"
        v-model="activeFilters[index]"
      />
      <template v-else-if="filter.type === FilterType.Range">
        <PriceRange
          :minRange="filter.min"
          :maxRange="filter.max"
          :minPrice="(activeFilters[index]as RangePriceValue)[0]"
          :maxPrice="(activeFilters[index]as RangePriceValue)[1]"
          @update:minPrice="($event: number) => (activeFilters[index] as RangePriceValue)[0] = $event"
          @update:maxPrice="($event: number) => (activeFilters[index] as RangePriceValue)[1] = $event"
        />
      </template>
      <DatePicker
        v-else-if="filter.type === FilterType.Date"
        v-model:startDate="(activeFilters[index] as RangeDateValue)[0]"
        v-model:endDate="(activeFilters[index] as RangeDateValue)[1]"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wac-filters {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  > div {
    flex: 1;
  }
}
</style>
