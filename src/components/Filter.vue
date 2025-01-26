<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";

const emit = defineEmits(["update:selectedTypes"]);
const selectedTypes = ref<string[]>([]);
const isAvailable = ref(false)

const router = useRouter();

const toggleType = (type: string) => {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
    selectedTypes.value.push(type);
  }
emit("update:selectedTypes", selectedTypes.value);
};

</script>

<template>
    <div>
      <label class="filter-checkbox">
        <input
          type="checkbox"
          value="single"
          :checked="selectedTypes.includes('single')"
          @change="toggleType('single')"
        />
        Single
      </label>
      <label class="filter-checkbox">
        <input
          type="checkbox"
          value="double"
          :checked="selectedTypes.includes('double')"
          @change="toggleType('double')"
        />
        Double
      </label>
    </div>
</template>

<style lang="scss" scoped>
</style>
