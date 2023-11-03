<script setup lang="ts">

import Jeton from "~/components/Jeton.vue";
import {betMoney} from "~/stores/money";

const values = [1, 5, 10, 25, 50, 100, 500];

let valIndex = 0;

for (let i = values.length - 1; i >= 0; i--) {
  if (betMoney.value <= values[i]) {
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
    <button @click="onLeft">
      -
    </button>
    <div id="jeton">
      <jeton :value="betMoney"></jeton>
    </div>
    <button @click="onRight">
      +
    </button>
  </div>
</template>

<style scoped lang="scss">
#main {
  display: flex;

  #jeton {
    width: 50px;
  }
}
</style>