
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import ExpCard from "@/components/expCard.vue";
import type { Experience } from "@/components/Experience";
import Filter from "@components/Filter.vue"

const datas = ref<Experience[]>([]);
const selectedTypes = ref<string[]>([]);

const router = useRouter();

const fetchData = async () => {
  try {
    const response = await fetch("https://api.jsonbin.io/v3/b/67943f71e41b4d34e47e3d95");
    const result = await response.json();

    if (result && result.record.record) {
      datas.value = result.record.record as Experience[];
    }
  } catch (error) {
    console.error("Error while fecthing api :", error);
  }
};

// exerience filtré en foncton du toggle
const filteredExperiences = computed(() => {
  //si il n'y a pas de filtres on renvoit le tableau datas
  if (selectedTypes.value.length === 0) {
    return datas.value;
  }
  //si on recoit un filtre
  //on fait un filter sur le tableau datas,
  // pour rechercher les elements ayant un type correspondant au type reçu dans le tableau selectedTypes
   return datas.value.filter((experience) => selectedTypes.value.includes(experience.type));

});



const handleCardClick = (id: number) => {
  router.push(`/experience/${id}`);
};

onMounted(() => {
  fetchData()
});
</script>

<template>
      <h6>Type of room :</h6>
    <Filter
      :selectedTypes="selectedTypes"
      @update:selectedTypes="selectedTypes = $event"
    />
   <main class="wac-experiences-page page">

      <ExpCard
        v-for="experience in filteredExperiences"
        :key="experience.id"
        :data="experience"
        @click="handleCardClick(experience.id)"
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
