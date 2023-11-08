<script setup lang="ts">

import SlotWheel from "~/components/slots/SlotWheel.vue";
import {onLeave} from "~/utils/Utils";
import {money} from "~/stores/money";
</script>

<template>
  <div id="leave">
    <button @click="onLeave()">
      Leave
    </button>
  </div>
  <div id="money">
    <div>Jetons</div>
    <div>{{ money }}</div>
  </div>
  <main>
    <slot-wheel/>
  </main>
</template>

<style scoped lang="scss">
#leave {
  position: absolute;
}

#money {
  position: absolute;
  top: 5px;
  right: 5px;

  height: 50px;

  border: none;
  border-radius: 10px;

  font-size: 20px;

  background-color: #2c4557;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  transition: 0.1s ease-in-out;

  margin: 20px;
  padding: 10px;

  color: #00adb5;
}

main {
  height: 100vh;
  width: 100vw;

  background-image: url('/backgroundSlots.svg');
  background-repeat: no-repeat;
  background-size: cover;

  z-index: -10;
}
</style>