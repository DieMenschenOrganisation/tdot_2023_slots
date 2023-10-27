<script setup lang="ts">

</script>

<template>
  <main>
    <slot-wheel/>
  </main>
</template>

<style lang="scss" scoped>
main {

  height: 100vh;
  width: 100vw;

  background-size: 100px 100px;
  background-image: radial-gradient(circle, darkblue 10%, transparent 10%),
  radial-gradient(circle, lightblue 10%, transparent 10%);
  background-position: 0 0, 50px 50px;
}
</style>