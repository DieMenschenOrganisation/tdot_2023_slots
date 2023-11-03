<script setup lang="ts">

import SlotWheel from "~/components/slots/SlotWheel.vue";
</script>

<template>
  <nav>
    <router-link to="/">
      leave
    </router-link>
  </nav>
  <main>
    <slot-wheel/>
  </main>
</template>

<style scoped lang="scss">
nav {
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