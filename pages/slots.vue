<script setup lang="ts">

import SlotWheel from "~/components/slots/SlotWheel.vue";
import {onLeave} from "~/utils/Utils";
</script>

<template>
  <div id="leave">
    <button @click="onLeave()">
      Leave
    </button>
  </div>
  <main>
    <slot-wheel/>
  </main>
</template>

<style scoped lang="scss">
#leave {
  position: absolute;
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