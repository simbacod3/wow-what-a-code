<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ExpCard from "@/components/expCard.vue";
import type { Room } from "@/components/Room";

const datas = ref<Room[]>([]);

const router = useRouter();

const fetchData = async () => {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/qs/6793cb31e41b4d34e47e177b");
    const result = await response.json();

    if (result && result.record) {
      datas.value = result.record as Room[];
    }
  } catch (error) {
    console.error("Error while fecthing api :", error);
  }
};

const handleCardClick = (id: number) => {
  router.push(`/experience/${id}`);
};

onMounted(() => {
  fetchData()
});
</script>

<template>
  <main class="wac-experiences-page page">
    <h1 v-if="!datas">No results</h1>
      <ExpCard
        v-for="data in datas"
        :key="data.id"
        :name="data.name"
        :img="data.img"
        :type="data.type"
        :price="data.price"
        :availability="data.availability"
        @click="handleCardClick(data.id)"
      />
  </main>
</template>

<style lang="scss" scoped>
.wac-experiences-page {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

</style>
