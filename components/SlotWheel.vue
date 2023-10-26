<script setup lang="ts">
import SlotEntry from "~/components/SlotEntry.vue";
import {Wheel} from "~/utils/Wheel";

const SLOTS_PER_REEL = 16;

let spinner1 = ref<HTMLElement | null>(null);
let spinner2 = ref<HTMLElement | null>(null);
let spinner3 = ref<HTMLElement | null>(null);
let spinner4 = ref<HTMLElement | null>(null);
let spinner5 = ref<HTMLElement | null>(null);

let selected = ref([-1, -1, -1, -1, -1]);

let lanes = [[1, 1, 1, 1, 1], [0, 0, 0, 0, 0], [-1, -1, -1, -1, -1], [1, 1, 0, -1, -1], [-1, -1, 0, 1, 1], [1, 0, 0, 0, 1], [-1, 0, 0, 0, -1], [0, 1, 1, 1, 0], [0, -1, -1, -1, 0], [1, 0, 0, 0, -1], [-1, 0, 0, 0, 1], [0, 0, 1, 1, 1], [0, 0, -1, -1, -1], [-1, 0, -1, 0, -1], [0, -1, 0, -1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, -1, 0, 1], [-1, 0, 1, 0, -1]];

let panelWidth = 100;
const REEL_RADIUS = Math.round((panelWidth / 2) / Math.tan(Math.PI / SLOTS_PER_REEL));
const slotAngle = 360 / SLOTS_PER_REEL;

let wheel = new Wheel(SLOTS_PER_REEL, [spinner1, spinner2, spinner3, spinner4, spinner5]);

let state = false;
let running = false;

async function spin() {

  if (running)
    return;

  running = true;
  wheel.spin(state)

  await sleep(5000 + 200 * selected.value.length);

  for (let lane of lanes) {
    selected.value = [-1, -1, -1, -1, -1];

    let values = wheel.getValues(state, lane);

    let start_value = values[0];

    let count = 0;

    for (let i = 0; i < values.length; i++) {
      if (start_value == values[i]) {
        selected.value[i] = wheel.getIndexFromHeight(state, lane[i]);
        count++;
      } else {
        break
      }
    }

    if (count >= 3)
      await sleep(1000);
  }

  selected.value = [-1, -1, -1, -1, -1];
  state = !state;
  running = false;
}

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
</script>

<template>
  <div id="wheel" @click="spin()">
    <div class="slots" ref="spinner1">
      <template v-for="(val,index) in wheel.lines[0].data">
        <div class="slot"
             :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
          <SlotEntry :value="val" :selected="selected[0] == index"/>
        </div>
      </template>
    </div>
    <div class="slots" ref="spinner2">
      <template v-for="(val,index) in wheel.lines[1].data">
        <div class="slot"
             :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
          <SlotEntry :value="val" :selected="selected[1] == index"/>
        </div>
      </template>
    </div>
    <div class="slots" ref="spinner3">
      <template v-for="(val,index) in wheel.lines[2].data">
        <div class="slot"
             :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
          <SlotEntry :value="val" :selected="selected[2] == index"/>
        </div>
      </template>
    </div>
    <div class="slots" ref="spinner4">
      <template v-for="(val,index) in wheel.lines[3].data">
        <div class="slot"
             :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
          <SlotEntry :value="val" :selected="selected[3] == index"/>
        </div>
      </template>
    </div>
    <div class="slots" ref="spinner5">
      <template v-for="(val,index) in wheel.lines[4].data">
        <div class="slot"
             :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
          <SlotEntry :value="val" :selected="selected[4] == index"/>
        </div>
      </template>
    </div>
  </div>

</template>

<style lang="scss" scoped>

#wheel {

  border: gray 40px solid;
  border-radius: 20px;

  overflow: hidden;

  width: 500px;
  height: 50vh;

  display: flex;

  justify-content: center;
  align-items: center;

  .slots {
    transform-style: preserve-3d;

    position: relative;

    width: 100px;

    .slot {
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
}
</style>