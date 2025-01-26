<script setup lang="ts">
import type { Experience } from "@/components/Experience";

defineProps({
  data: {
    type: Object as () => Experience,
    required: true,
  },
});
</script>
<template>
  <div class="wac-exp-card">
    <h3>{{ data.name }}</h3>
    <img
      :src="data.img"
      :alt="`Image de ${data.name}`" />
    <div class="card-info">
      <span>Type: {{ data.type }} </span>
      <span>Price: {{ data.price }} $ </span>
      <span>Available: {{ data.availability ? 'Yes' : 'No' }}</span>
    </div>
  </div>
</template>

<style scoped>
.wac-exp-card {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  width: 100%;
  background: white;
  box-sizing: border-box;
}

.wac-exp-card img {
  width: 80%;
  height: auto;
  object-fit: cover;
  margin-bottom: 8px;
}

.card-info {
  display: flex;
  width: 100%;
  padding: 0 16px;
  font-size: 12px;
}

.card-info span {
  flex: 1;
  text-align: center;
}
</style>
