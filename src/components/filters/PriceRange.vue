<script setup lang="ts">
import { toRef, watch, computed } from "vue";

const props = defineProps<{
  minPrice: number;
  maxPrice: number;
  minRange: number;
  maxRange: number;
}>();

// As input type range handle only string, we need to convert the number to string
// but we emit the selected value as number

const emit = defineEmits(["update:minPrice", "update:maxPrice"]);
const minPriceRef = toRef(props, "minPrice");
const maxPriceRef = toRef(props, "maxPrice");

const minPriceSelected = computed({
  get() {
    return minPriceRef.value.toString();
  },
  set(min: string) {
    emit("update:minPrice", parseInt(min));
  },
});

const maxPriceSelected = computed({
  get() {
    return maxPriceRef.value.toString();
  },
  set(max: string) {
    emit("update:maxPrice", parseInt(max));
  },
});

watch([minPriceSelected, maxPriceSelected], ([newMin, newMax]) => {
  const [min, max] = [parseInt(newMin), parseInt(newMax)];
  if (min > max) {
    maxPriceSelected.value = newMin;
    minPriceSelected.value = newMax;
  }
});
</script>

<template>
  <div>
    <label>Min Price: {{ minPrice }}</label>
    <input v-model="minPriceSelected" type="range" :min="minRange" :max="maxRange" step="5" />

    <label>Max Price: {{ maxPrice }}</label>
    <input v-model="maxPriceSelected" type="range" :min="minRange" :max="maxRange" step="5" />
  </div>
</template>
