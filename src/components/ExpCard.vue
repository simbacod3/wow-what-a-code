<script setup lang="ts">
defineProps<{
  name: string;
  img: string;
  type: string;
  price: number;
  availability: boolean
}>()
</script>

<template>
  <div class="wac-exp-card">
    <h2>{{ name }}</h2>
    <img :src="img" />
    <div class="card-info">
      <span>Type: {{ type }}</span>
      <span>Price: {{ price }} $</span>
      <span>Available: {{ availability ? 'Yes' : 'No' }}</span>
    </div>
  </div>
</template>

<style scoped>
.wac-exp-card {
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
}
.wac-exp-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
}
.card-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
}
</style>
