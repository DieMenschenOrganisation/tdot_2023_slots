<script setup lang="ts">
import SlotEntry from "~/components/SlotEntry.vue";

const props = defineProps<{ values: string[] }>()

const SLOTS_PER_REEL = 12;
let panelWidth = 100;
const REEL_RADIUS = Math.round((panelWidth / 2) / Math.tan(Math.PI / SLOTS_PER_REEL));

console.log(REEL_RADIUS);

const slotAngle = 360 / SLOTS_PER_REEL;

</script>

<template>
  <div id="slots">
    <template v-for="(val,index) in props.values">
      <div id="slot"
           :style="{transform: 'rotateX('+  (slotAngle * index) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
        <SlotEntry :value="val"/>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
#slots {
  transform-style: preserve-3d;
  animation: spin-0 5s infinite ease-out;

  position: relative;

  width: 100px;

  #slot {
    -webkit-perspective: 200px;
    -moz-perspective: 200px;
    perspective: 200px;

    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    backface-visibility: hidden;

    top: -50px;

    position: absolute;

    box-sizing: border-box;
  }
}


@keyframes spin-0 {
  0% {
    transform: rotateX(0);
  }
  100% {
    transform: rotateX(calc(-360deg * 10));
  }
}

</style>