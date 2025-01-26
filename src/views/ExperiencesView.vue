<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ExpCard from "@/components/expCard.vue";
import type { Experience } from "@/components/Experience";

const datas = ref<Experience[]>([]);

const router = useRouter();

const fetchData = async () => {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/67943f71e41b4d34e47e3d95");
    const result = await response.json();
    console.log(result)



    if (result && result.record.record) {
      datas.value = result.record.record as Experience[];
    }

    console.log("data", datas.value)


  } catch (error) {
    console.error("Error while fecthing api :", error);
  }
};

/* const fetchData = async () => {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/67943f71e41b4d34e47e3d95");
    const result = await response.json();
    console.log(result)

    if (result && result.record) {
      datas.value = result.record as Experience[];
    }
  } catch (error) {
    console.error("Error while fecthing api :", error);
  }
}; */

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
        :data="data"
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
