<script setup lang="ts">
import {SlotSymbol} from "~/utils/slots/SlotSymbol";
import {Selection} from "~/utils/slots/Selection";

const props = defineProps<{ value: SlotSymbol, selection: Selection }>()

</script>

<template>
  <div id="outer" :class="{'mark': selection == Selection.MARK,'minorMark': selection == Selection.MINOR_MARK}">
    <template v-if="props.value == SlotSymbol.BAR">
      <img src="/bar.png" alt="bar">
    </template>
    <template v-if="props.value == SlotSymbol.BELL">
      <img src="/bell.png" alt="bell">
    </template>
    <template v-if="props.value == SlotSymbol.CHERRY">
      <img src="/cherry.png" alt="cherry">
    </template>
    <template v-if="props.value == SlotSymbol.DIAMOND">
      <img src="/diamond.png" alt="diamond">
    </template>
    <template v-if="props.value == SlotSymbol.LEMON">
      <img src="/lemon.png" alt="lemon">
    </template>
    <template v-if="props.value == SlotSymbol.ORANGE">
      <img src="/orange.png" alt="orange">
    </template>
    <template v-if="props.value == SlotSymbol.SEVEN">
      <img src="/seven.png" alt="seven">
    </template>
  </div>
</template>

<style lang="scss" scoped>
#outer {
  height: 150px;
  width: 150px;

  display: flex;

  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    width: 100%;

    padding: 9%;
    box-sizing: border-box;

    transition: 0.5s ease-in-out;
  }

  &.mark img {
    filter: drop-shadow(0 0 10px #f00);
  }

  &.minorMark img{
    filter: drop-shadow(0 0 5px #fff);
  }
}
</style>