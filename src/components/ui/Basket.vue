<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import Modal from "@components/ui/Modal.vue";
import ExpCard from "@components/ui/ExpCard.vue";

import { useBasket } from "@composables/useBasket";

const { basket, clearBasket } = useBasket();
const isBasketModalOpen = ref(false);
</script>

<template>
  <div class="wac-basket">
    <button class="btn--xs" @click="isBasketModalOpen = true">Basket</button>
    <Modal :is-open="isBasketModalOpen" @close="isBasketModalOpen = false">
      <h4 v-if="basket.length === 0">Nothing inside the basket</h4>
      <ul v-else class="wac-basket__list">
        <li v-for="experience in basket" :key="experience.id">
          <ExpCard :experience="experience" />
        </li>
      </ul>
      <button class="wac-basket__clear-button" @click="clearBasket">Clear Basket</button>
    </Modal>
  </div>
</template>

<style lang="scss">
.wac-basket {
  &__clear-button {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>
