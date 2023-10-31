<script setup lang="ts">
import {BlackJackCard} from "~/utils/blackjack/blackJackCard";
import Card from "~/components/blackjack/Card.vue";

let props = defineProps<{ cards: BlackJackCard[] }>();
</script>

<template>
  <div>
    <Card v-for="card in props.cards" :card="card"></Card>
  </div>
</template>

<style scoped lang="scss">
div {
  height: 20vh;
  width: 50vw;

  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>