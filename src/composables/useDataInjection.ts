import { ref } from "vue";
import type { Experience } from "@/interfaces/experience";
import { useFetch } from "@composables/useFetch";
import { onMounted } from "vue";

export const useDataInjection = () => {
  const experiences = ref<Array<Experience>>([]);

  const fetchExperiences = async () => {
    const { data, error } = await useFetch<Experience[]>("/api/experiences");
    if (error.value) {
      throw error.value;
    }
    if (data.value !== undefined) {
      experiences.value = data.value;
    }
  };

  onMounted(() => {
    fetchExperiences();
  });

  const getDetailsById = (id: number) => {
    return experiences.value.find((exp) => exp.id === id);
  };

  return {
    experiences,
    getDetailsById,
  };
};
