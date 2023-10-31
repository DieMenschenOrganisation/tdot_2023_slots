<script setup lang="ts">
import SlotEntry from "~/components/slots/SlotEntry.vue";
import {Wheel} from "~/utils/slots/Wheel";
import {sleep} from "@antfu/utils";
import {Selection} from "~/utils/slots/Selection";

const SLOTS_PER_REEL = 16;

let spinner1 = ref<HTMLElement | null>(null);
let spinner2 = ref<HTMLElement | null>(null);
let spinner3 = ref<HTMLElement | null>(null);
let spinner4 = ref<HTMLElement | null>(null);
let spinner5 = ref<HTMLElement | null>(null);

let selectedIndex = ref([-1, -1, -1, -1, -1]);

let panelWidth = 100;
const REEL_RADIUS = Math.round((panelWidth / 2) / Math.tan(Math.PI / SLOTS_PER_REEL));
const slotAngle = 360 / SLOTS_PER_REEL;

let wheel = new Wheel(SLOTS_PER_REEL, [spinner1, spinner2, spinner3, spinner4, spinner5]);

let state = true;
let running = false;

let winnings = ref(0);

let currentMoney = ref(1000);
let bet = ref(0)

async function spin() {

  if (running)
    return;

  currentMoney.value -= bet.value;

  let currentBet = bet.value;

  state = !state;
  running = true;
  winnings.value = 0;

  selectedIndex.value = [-1, -1, -1, -1, -1];

  let winningLanes = wheel.spin(state)

  await sleep(5000 + 200 * selectedIndex.value.length);

  for (let lane of winningLanes) {

    switch (lane.length) {
      case 3: {
        winnings.value += currentBet;
        currentMoney.value += currentBet;
        break;
      }
      case 4: {
        winnings.value += currentBet * 3;
        currentMoney.value += currentBet * 3;
        break;
      }
      case 5: {
        winnings.value += currentBet * 10;
        currentMoney.value += currentBet * 10;
      }
    }

    for (let i = 0; i < lane.length; i++) {
      selectedIndex.value[i] = wheel.getIndexFromHeight(state, lane[i]);
    }

    await sleep(500);

    selectedIndex.value = [-1, -1, -1, -1, -1];
  }

  running = false;

  outer:
      while (!running && winningLanes.length > 0) {
        for (let lane of winningLanes) {
          if (running) {
            break outer;
          }

          for (let i = 0; i < lane.length; i++) {
            selectedIndex.value[i] = wheel.getIndexFromHeight(state, lane[i]);
          }

          await sleep(1000);

          selectedIndex.value = [-1, -1, -1, -1, -1];
        }
      }
}

function getSelectionState(line: number, index: number): Selection {
  if (selectedIndex.value[line] == index) {
    if (running) {
      return Selection.MARK
    } else {
      return Selection.MINOR_MARK
    }
  }
  return Selection.NONE
}
</script>

<template>
  <main>
    <h1 id="winnings">
      <value-display :value="winnings"></value-display>
    </h1>
    <div id="wheel" @click="spin()">
      <div class="slots" ref="spinner1">
        <template v-for="(val,index) in wheel.lines[0].data">
          <div class="slot"
               :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
            <SlotEntry :value="val" :selection="getSelectionState(0,index)"/>
          </div>
        </template>
      </div>
      <div class="slots" ref="spinner2">
        <template v-for="(val,index) in wheel.lines[1].data">
          <div class="slot"
               :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
            <SlotEntry :value="val" :selection="getSelectionState(1,index)"/>
          </div>
        </template>
      </div>
      <div class="slots" ref="spinner3">
        <template v-for="(val,index) in wheel.lines[2].data">
          <div class="slot"
               :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
            <SlotEntry :value="val" :selection="getSelectionState(2,index)"/>
          </div>
        </template>
      </div>
      <div class="slots" ref="spinner4">
        <template v-for="(val,index) in wheel.lines[3].data">
          <div class="slot"
               :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
            <SlotEntry :value="val" :selection="getSelectionState(3,index)"/>
          </div>
        </template>
      </div>
      <div class="slots" ref="spinner5">
        <template v-for="(val,index) in wheel.lines[4].data">
          <div class="slot"
               :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
            <SlotEntry :value="val" :selection="getSelectionState(4,index)"/>
          </div>
        </template>
      </div>
    </div>
    <div>
      <div>
        current Money: {{ currentMoney }}
      </div>
      <div>
        <input type="number" name="bet" id="bet" v-model="bet">
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

main {

  flex-direction: column;

  display: flex;
  justify-content: center;
  align-items: center;

  #winnings {
    color: black;

    height: 50px;
  }

  #wheel {
    border: gray 40px solid;
    border-radius: 20px;

    overflow: hidden;

    width: 500px;
    height: 350px;

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
}

</style>