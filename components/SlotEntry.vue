<script setup lang="ts">
import {SlotSymbol} from "~/utils/SlotSymbol";

const props = defineProps<{ value: SlotSymbol, selected: boolean }>()

</script>

<template>
  <div id="outer" :class="{'highlight': selected}">
    <template v-if="props.value == SlotSymbol.BAR">
      <img src="../public/bar.png" alt="bar">
    </template>
    <template v-if="props.value == SlotSymbol.BELL">
      <img src="../public/bell.png" alt="bell">
    </template>
    <template v-if="props.value == SlotSymbol.CHERRY">
      <img src="../public/cherry.png" alt="cherry">
    </template>
    <template v-if="props.value == SlotSymbol.DIAMOND">
      <img src="../public/diamond.png" alt="diamond">
    </template>
    <template v-if="props.value == SlotSymbol.LEMON">
      <img src="../public/lemon.png" alt="lemon">
    </template>
    <template v-if="props.value == SlotSymbol.ORANGE">
      <img src="../public/orange.png" alt="orange">
    </template>
    <template v-if="props.value == SlotSymbol.SEVEN">
      <img src="../public/seven.png" alt="seven">
    </template>
  </div>
</template>

<style lang="scss" scoped>
#outer {

  border-radius: 20px;

  height: 100px;
  width: 100px;

  display: flex;

  justify-content: center;
  align-items: center;

  background: lightgray;

  img {
    height: 100%;
    width: 100%;

    padding: 9%;
    box-sizing: border-box;
  }

  &.highlight {
    background: brown;
  }
}
</style>