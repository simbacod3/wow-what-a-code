<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  img: string
  title: string
  price: string
  availabilty: boolean
}>()

</script>

<template>
  <div class="wac-exp-card">
    <img src="" alt="">
    <h1></h1>
    <p></p>
  </div>
</template>

<style scoped>

</style>
