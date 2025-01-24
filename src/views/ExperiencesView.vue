<script setup lang="ts">
import ExpCard from "@/components/expCard.vue";
import { ref, onMounted } from "vue";
 onMounted(() => {
  fetchData()

    });

    const datas = ref([])
    console.log("data---", datas)
      const fetchData = async () => {
      const response =  await fetch("https://api.jsonbin.io/v3/qs/6793cb31e41b4d34e47e177b");
      const result = await response.json();
     datas.value = result;
      console.log('result', result)
    }

</script>

<template>
  <main class="wac-experiences-page page">
    <h1>No results</h1>
    <ExpCard
    v-for="data in datas"
    :key="data.id"
    :img="">

    </ExpCard> -->
    {{ data }}
  </main>
</template>

<style lang="scss">
.wac-experiences-page {

}
</style>
