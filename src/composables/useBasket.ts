import { readonly, computed } from "vue";
import type { BookedExperience } from "@/interfaces/experience";
import { useLocalStorage } from "@/composables/useLocalStorage";

const basket = useLocalStorage<Array<BookedExperience>>("basket", []);

export const useBasket = () => {
  const addToBasket = (experience: BookedExperience) => {
    basket.value.push(experience);
  };

  const removeFromBasket = (id: number) => {
    const index = basket.value.findIndex((exp) => exp.id === id);
    if (index === -1) return;
    basket.value.splice(index, 1);
  };

  const isExperienceAvailable = (exp: BookedExperience | undefined) => {
    if (!exp) return false;
    const expStartDate = new Date(exp.startDate);
    const expEndDate = new Date(exp.endDate);
    return basket.value.every(({ id, startDate, endDate }) => {
      const basketStartDate = new Date(startDate);
      const basketEndDate = new Date(endDate);
      return (
        id !== exp.id ||
        expStartDate.getTime() > basketEndDate.getTime() ||
        expEndDate.getTime() < basketStartDate.getTime()
      );
    });
  };

  const totalPrice = computed(() => basket.value.reduce((acc, item) => acc + item.price, 0));

  const clearBasket = () => {
    basket.value = [];
  };

  return {
    basket: readonly(basket),
    isExperienceAvailable,
    totalPrice,
    addToBasket,
    removeFromBasket,
    clearBasket,
  };
};
