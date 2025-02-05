import { ref } from "vue";

export const useFetch = async <T>(url: string) => {
  const data = ref<T>();
  const error = ref<string | null>(null);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    data.value = await response.json();
  } catch (err) {
    error.value = (err as Error).message;
  }

  return { data, error };
};
