<script setup lang="ts">

import {BlackJackCard, cardColors, cardValues} from "~/utils/blackjack/blackJackCard";

let props = defineProps<{ card: BlackJackCard }>()

</script>

<template>
  <div id="main">
    <img v-if="!props.card.back"
         :src="'/cards/' + cardValues[props.card.value] +  '-' + cardColors[props.card.color] + '.png'" alt="">
    <img v-else :src="'/cards/back.png'" alt="">
    <div id="shadow"></div>
  </div>
</template>

<style scoped lang="scss">

#main {
  position: relative;
  width: min-content;

  img {
    border-radius: 10px;
    height: 100%;
  }

  #shadow {
    border-radius: 10px;
    position: absolute;

    -webkit-box-shadow: inset 0 0 0 2px #000000;
    box-shadow: inset 0 0 0 2px #000000;

    height: 100%;
    width: 100%;

  }
}
</style>