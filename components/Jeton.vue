<script setup lang="ts">
defineProps<{ value: number }>()
</script>

<template>
  <div>
    <img v-if="value <= 1" src="/jeton/jeton1.png" alt="jeton1">
    <img v-else-if="value <= 5" src="/jeton/jeton5.png" alt="jeton5">
    <img v-else-if="value <= 10" src="/jeton/jeton10.png" alt="jeton10">
    <img v-else-if="value <= 25" src="/jeton/jeton25.png" alt="jeton25">
    <img v-else-if="value <= 50" src="/jeton/jeton50.png" alt="jeton50">
    <img v-else-if="value <= 100" src="/jeton/jeton100.png" alt="jeton100">
    <img v-else src="/jeton/jeton500.png" alt="jeton500">

    <p>{{ value }}</p>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    filter: drop-shadow(5px 5px 3px #00000088);
  }

  p {
    position: absolute;

    font-size: 30px;
    color: white;
  }
}
</style>