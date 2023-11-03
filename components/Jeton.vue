<script setup lang="ts">
defineProps<{ value: number }>()
</script>

<template>
  <img v-if="value == 1" src="/jeton/jeton1.png" alt="jeton1">
  <img v-if="value == 5" src="/jeton/jeton5.png" alt="jeton5">
  <img v-if="value == 10" src="/jeton/jeton10.png" alt="jeton10">
  <img v-if="value == 25" src="/jeton/jeton25.png" alt="jeton25">
  <img v-if="value == 50" src="/jeton/jeton50.png" alt="jeton50">
  <img v-if="value == 100" src="/jeton/jeton100.png" alt="jeton100">
  <img v-if="value == 500" src="/jeton/jeton500.png" alt="jeton500">
</template>

<style scoped lang="scss">
img {
  width: 100%;
}
</style>