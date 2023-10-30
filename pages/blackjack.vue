<script setup lang="ts">

import {Deck} from "~/utils/blackjack/deck";
import {BlackJackCard} from "~/utils/blackjack/blackJackCard";

let deck = new Deck();

let cards = ref<BlackJackCard[]>([])

function click() {
  cards.value.push(deck.getRandomCard());
}
</script>-

<template>

  <div>
    <Card v-for="card in cards" :card="card"></Card>
  </div>

  <button @click="click">
    click22323
  </button>
</template>

<style scoped lang="scss">

</style>