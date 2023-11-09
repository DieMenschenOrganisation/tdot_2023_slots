<script setup lang="ts">

import Jeton from "~/components/Jeton.vue";
import {betMoney} from "~/stores/money";

const values = [1, 5, 10, 25, 50, 100, 500];

let valIndex = 0;

for (let i = values.length - 1; i >= 0; i--) {
  if (betMoney.value >= values[i]) {
    valIndex = i;
  }
}

function onLeft() {
  valIndex--;

  if (valIndex < 0) {
    valIndex = values.length - 1;
  }

  betMoney.value = values[valIndex];
}

function onRight() {
  valIndex++;

  if (valIndex > values.length - 1) {
    valIndex = 0;
  }

  betMoney.value = values[valIndex];
}
</script>

<template>
  <div id="main">
    <button @click="onLeft" id="minus">
      <img src="/minus.svg" alt="minus">
    </button>
    <div id="jeton">
      <jeton :value="betMoney"></jeton>
    </div>
    <button @click="onRight" id="plus">
      <img src="/plus.svg" alt="plus">
    </button>
  </div>
</template>

<style scoped lang="scss">
#main {
  display: flex;
  justify-content: space-between;
  align-items: center;

  #jeton {
    width: 100px;
  }

  button {
    width: 50px;

    img {
      width: 100%;
      height: 100%;

      filter: drop-shadow(2px 2px 2px #00000066);
    }
  }
}
</style>