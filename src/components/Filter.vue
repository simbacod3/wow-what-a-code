<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineEmits } from "vue";


//le composant filter sert a
// afficher les 2 checkbox
//envoyer l'evenement au parent pour savoir quelle case a été choisie
//il ne contient pas de logic

const emit = defineEmits(["update:selectedTypes"]);
const selectedTypes = ref<string[]>([]);
const router = useRouter();

const toggleType = (type: string) => {
  //vérifie si le tableau est init avec une valeur type
  if (selectedTypes.value.includes(type)) {
  //  Si oui : creation d'un nouveau tableau dans lequel on push tous les elements sauf celui qu'on vient de recevoir
    selectedTypes.value = selectedTypes.value.filter((t) => t !== type);
  } else {
   // si non : on ajoute l'event (ici type) dans le tableau existant
    selectedTypes.value.push(type);
  }
//envoi du tableau avec les types au parent
emit("update:selectedTypes", selectedTypes.value);
};

</script>

<template>
    <div>
      <label class="filter-checkbox">
        <input
          type="checkbox"
          value="single"
          @change="toggleType('single')"
          :checked="selectedTypes.includes('single')"
        />
        Single
      </label>
      <label class="filter-checkbox">
        <input
          type="checkbox"
          value="double"
          @change="toggleType('double')"
          :checked="selectedTypes.includes('double')"
        />
        Double
      </label>
    </div>
</template>

<style lang="scss" scoped>
</style>
