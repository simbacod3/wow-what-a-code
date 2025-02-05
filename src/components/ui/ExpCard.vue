<script setup lang="ts">
import type { BookedExperience, Experience } from "@/interfaces/experience";
import AvailabilityBadge from "@components/ui/AvailabilityBadge.vue";

export interface ExpCardInterface {
  experience: Experience | BookedExperience;
}
defineProps<ExpCardInterface>();
</script>

<template>
  <div class="wac-exp-card">
    <AvailabilityBadge :availability="experience.availability" class="wac-exp-card__badge" />
    <img
      :src="experience.img"
      :alt="`Picture of the ${experience.name}`"
      class="wac-exp-card__image"
    />
    <div class="wac-exp-card__content">
      <div class="wac-exp-card__info">
        <router-link :to="`/experience/${experience.id}`" class="wac-exp-card__link"
          ><h3>{{ experience.name }}</h3>
        </router-link>
        <p>{{ experience.type }} - {{ experience.price }}€</p>
        <p v-if="'startDate' in experience">
          From {{ experience.startDate }} to {{ experience.endDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wac-exp-card {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;

  &__badge {
    z-index: 1;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  &__image {
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  &__content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__info {
    padding: 8px;
  }

  &__link {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }
  }
}
</style>
