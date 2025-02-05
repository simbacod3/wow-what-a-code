<script setup lang="ts">
export interface AvailabilityBadgeInterface {
  availability: boolean;
}
defineProps<AvailabilityBadgeInterface>();
</script>

<template>
  <div
    class="wac-availability-badge"
    :class="{
      'wac-availability-badge--available': availability,
      'wac-availability-badge--unavailable': !availability,
    }"
  >
    <span v-if="availability" class="wac-availability-badge--available">Available</span>
    <span v-else class="wac-availability-badge--unavailable">Unavailable</span>
  </div>
</template>

<style scoped lang="scss">
.wac-availability-badge {
  border: 1px solid grey;
  border-radius: 100vmax;
  padding: 4px 8px;
  color: white;

  &--available {
    background-color: hsl(125, 59%, 38%);
  }
  &--unavailable {
    background-color: hsl(0, 59%, 38%);
  }
}
</style>
