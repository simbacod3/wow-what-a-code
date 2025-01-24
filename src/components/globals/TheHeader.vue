<script setup lang="ts">
import LogoBaliVibes from '../icons/LogoBaliVibes.vue';
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
        <button class="btn--xs">Basket</button>
      </li>
      <li>
        <div class="avatar text-gray-000 avatar--xs" data-text='AM'></div>
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
</style>
