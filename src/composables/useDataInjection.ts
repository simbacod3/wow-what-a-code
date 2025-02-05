import { ref, computed } from "vue";
import type { Experience } from "@/interfaces/experience";
import type { Filter } from "@/interfaces/filters";
import { FilterType } from "@/interfaces/filters";
import { useFetch } from "@composables/useFetch";
import { onMounted } from "vue";

export const useDataInjection = () => {
  const experiences = ref<Array<Experience>>([]);
  const filters = ref<Array<Filter>>([]);
  const isLoading = ref<boolean>(true);

  const fetchExperiences = async () => {
    const { data, error } = await useFetch<Experience[]>("/api/experiences");
    if (error.value) {
      throw error.value;
    }
    if (data.value !== undefined) {
      experiences.value = data.value;

      // This is where we would normally set the filters from the API based on the data
      // but for the sake of this example, we will hardcode the filters
      const lowestPrice = Math.min(...experiences.value.map((exp) => exp.price));
      const highestPrice = Math.max(...experiences.value.map((exp) => exp.price));
      filters.value = [
        {
          type: FilterType.Select,
          label: "Select a type",
          values: experiences.value.reduce((acc: string[], currentExp) => {
            if (!acc.includes(currentExp.type)) {
              acc.push(currentExp.type);
            }
            return acc;
          }, []),
          property: "type",
        },
        {
          type: FilterType.Checkbox,
          label: "Filter by Availability",
          property: "availability",
        },
        {
          type: FilterType.Range,
          label: "",
          min: lowestPrice,
          max: highestPrice,
          property: "price",
        },
        {
          type: FilterType.Date,
          label: "",
        },
      ];
    }
    isLoading.value = false;
  };

  onMounted(() => {
    fetchExperiences();
  });

  const getDetailsById = (id: number) =>
    computed(() => experiences.value.find((exp) => exp.id === id));

  return {
    experiences,
    filters,
    isLoading,
    getDetailsById,
  };
};
