<script setup lang="ts">
import { computed } from "vue";

const startDate = defineModel("startDate", { type: String, default: "" });
const endDate = defineModel("endDate", { type: String, default: "" });

const today = new Date();
const minStartDate = today.toISOString().split("T")[0];

const minEndDate = computed(() => {
  if (!startDate.value) return "";
  const nextDay = new Date(startDate.value);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split("T")[0];
});
</script>
<template>
  <div>
    <label for="startDate"> Start Date: </label>
    <input
      name="startDate"
      type="date"
      v-model="startDate"
      :min="minStartDate"
      :max="!endDate ? '' : endDate"
    />
    <br />
    <label for="endDate"> End Date: </label>
    <input name="endDate" type="date" v-model="endDate" :min="minEndDate" />
  </div>
</template>
