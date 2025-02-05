<script setup lang="ts">
import LogoBaliVibes from "../icons/LogoBaliVibes.vue";
import Basket from "@components/ui/Basket.vue";
</script>

<template>
  <div class="wac-the-header">
    <div>
      <router-link to="/">
        <LogoBaliVibes />
      </router-link>
    </div>
    <ul>
      <li>
        <router-link to="/discover">Discover</router-link>
      </li>
      <li>
        <router-link to="/discover">Popular</router-link>
      </li>
      <li>
        <Basket />
      </li>
      <li>
        <div class="avatar text-gray-000 avatar--xs" data-text="AM"></div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.wac-the-header {
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding-inline-start: 0;
  }
}

.wac-basket__list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: max-content;
  list-style: none;
  gap: 16px 8px;
  padding: 0;
  width: 100%;
  margin: 0;
}
</style>
