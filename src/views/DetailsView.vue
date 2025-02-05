<script setup lang="ts">
import { watch, ref, computed, toRef } from "vue";
import { useDataInjection } from "@composables/useDataInjection";
import { useBasket } from "@composables/useBasket";
import DatePicker from "@components/filters/DatePicker.vue";
const { getDetailsById, isLoading } = useDataInjection();
const { addToBasket, isExperienceAvailable } = useBasket();

import { useRoute } from "vue-router";

const route = useRoute();
const experienceId = computed(() =>
  Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
);

const experience = getDetailsById(parseInt(experienceId.value));

const startDate = ref("");
const endDate = ref("");
const isExperienceAddedToBasket = ref(false);

const experienceToAdd = computed(() => {
  if (!experience.value) return;
  return {
    ...experience.value,
    startDate: startDate.value,
    endDate: endDate.value,
  };
});

const isExperienceAvailableForAddToCart = computed(() =>
  isExperienceAvailable(experienceToAdd.value)
);

const addToBasketHandler = () => {
  if (!experienceToAdd.value) return;
  addToBasket(experienceToAdd.value);
  isExperienceAddedToBasket.value = true;
  startDate.value = "";
  endDate.value = "";
  setTimeout(() => {
    isExperienceAddedToBasket.value = false;
  }, 3000);
};
</script>

<template>
  <div class="wac-details-page page">
    <div v-if="isLoading" class="wac-details-page__loading">Loading...</div>
    <div v-else-if="!experience" class="wac-details-page__error">Error: Experience not found</div>
    <template v-else>
      <div class="start">
        <img src="/photo1.jpg" alt="" width="500" height="300" />
      </div>
      <div class="end">
        <h1>
          {{ experience.name }} - {{ experience.availability ? "Available" : "Not Available" }}
        </h1>
        <p>{{ experience.type }} - {{ experience.price }}€</p>
        <DatePicker
          v-if="experience.availability"
          v-model:startDate="startDate"
          v-model:endDate="endDate"
        />
        <div>
          <span class="tag">#byyourself</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cum atque ab. A, aliquam.
          Sed at repudiandae voluptate molestiae odio aliquid tenetur sequi autem delectus
          repellendus animi, sint architecto corporis?
        </p>
        <button
          :disabled="!isExperienceAvailableForAddToCart || !startDate || !endDate"
          @click="addToBasketHandler"
        >
          Book now
        </button>
        <p v-if="!isExperienceAvailableForAddToCart && startDate && endDate" class="alert-msg">
          Experience not available on your date
        </p>
        <p v-else-if="isExperienceAddedToBasket" class="sucess-msg">Experience Added to basket</p>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.wac-details-page {
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  min-height: 100vh;

  .start {
    flex: 3;

    img {
      border-radius: 16px;
    }
  }

  .end {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: 2rem;
    }

    span {
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
    }

    button {
      padding: 1rem 2rem;
      background-color: #a97807;
      color: white;
      border: none;
      border-radius: 0.5rem;
    }
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
