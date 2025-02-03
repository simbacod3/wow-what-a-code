<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineProps, defineEmits, useTemplateRef, watch, toRef, nextTick } from "vue";
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(["close"]);
const isOpen = toRef(props, "isOpen");

const closeButton = useTemplateRef("close-button");

// Focus the close button when the modal opens
// A proper focus trap could be implement here
watch(isOpen, async (newisOpen: boolean) => {
  if (!newisOpen) return;
  await nextTick();
  if (closeButton.value) {
    closeButton.value.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="wac-modal" :class="{ 'wac-modal--open': isOpen }">
      <div class="wac-modal__backdrop" @click="emit('close')"></div>
      <div class="wac-modal__content">
        <button ref="close-button" @click="emit('close')">✖</button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
/* Modal Container */
.wac-modal {
  $c: &;
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: row-reverse;
  z-index: 1000;

  &__lock {
    width: 1px;
    height: 0px;
    padding: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
  }

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  &__content {
    position: relative;
    width: 50%;
    height: 100vh;
    background: white;
    box-shadow: 4px 0 10px rgba(0, 0, 0, 0.2);
    padding: 24px;
    overflow: scroll;
  }
  &--open {
    #{$c}__content {
      transform: translateX(0);
    }
  }
}
</style>
