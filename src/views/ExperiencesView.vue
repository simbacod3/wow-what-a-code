<script setup lang="ts">
import ExpCard from "@/components/expCard.vue";
import { ref, onMounted } from "vue";

interface Room {
  id: number;
  name: string;
  img: string;
  type: string;
  price: number;
  availability: boolean
}


 onMounted(() => {
  fetchData()

    });

    const datas = ref<Room[]>([]);

  const fetchData = async () => {
  const response = await fetch("https://api.jsonbin.io/v3/qs/6793cb31e41b4d34e47e177b");
  const result = await response.json();

  if (result && result.record) {
    datas.value = result.record as Room[];
  }
};

</script>

<template>
  <main class="wac-experiences-page page">
    <h1>No results</h1>

    <ExpCard
      v-for="data in datas"
      :key="data.id"
      :name="data.name"
      :img="data.img"
      :type="data.type"
      :price="data.price"
      :availability="data.availability"
    />
  </main>
</template>

<style lang="scss">
.wac-experiences-page {

}
</style>
