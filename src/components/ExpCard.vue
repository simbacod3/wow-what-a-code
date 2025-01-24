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
    <h3>{{ name }}</h3>
    <img :src="img" />
    <div class="card-info">
      <span>Type: {{ type }} </span>
      <span>Price: {{ price }} $ </span>
      <span>Available: {{ availability ? 'Yes' : 'No' }}</span>
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
}

.wac-exp-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 8px;
}

.card-info {
  display: flex;
  width: 100%;
  padding: 0 16px;
  font-size: 12px
}

.card-info span {
  flex: 1;
  text-align: center;
}
</style>
