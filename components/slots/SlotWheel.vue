<script setup lang="ts">
import SlotEntry from "~/components/slots/SlotEntry.vue";
import {Wheel} from "~/utils/slots/Wheel";
import {sleep} from "@antfu/utils";
import {Selection} from "~/utils/slots/Selection";
import ValueDisplay from "~/components/slots/ValueDisplay.vue";
import {betMoney, changeMoney, hasEnoughMoney, money} from "~/stores/money";
import BetSelect from "~/components/BetSelect.vue";

const SLOTS_PER_REEL = 16;

let spinner1 = ref<HTMLElement | null>(null);
let spinner2 = ref<HTMLElement | null>(null);
let spinner3 = ref<HTMLElement | null>(null);
let spinner4 = ref<HTMLElement | null>(null);
let spinner5 = ref<HTMLElement | null>(null);

let selectedIndex = ref([-1, -1, -1, -1, -1]);

let panelWidth = 150;
const REEL_RADIUS = Math.round((panelWidth / 2) / Math.tan(Math.PI / SLOTS_PER_REEL));
const slotAngle = 360 / SLOTS_PER_REEL;

let wheel = new Wheel(SLOTS_PER_REEL, [spinner1, spinner2, spinner3, spinner4, spinner5]);

let state = true;
let running = false;

let winnings = ref(0);

async function spin() {

  if (running)
    return;

  changeMoney(-betMoney.value)
  let currentBet = betMoney.value;

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
        changeMoney(currentBet)
        break;
      }
      case 4: {
        winnings.value += currentBet * 3;
        changeMoney(currentBet * 3)
        break;
      }
      case 5: {
        winnings.value += currentBet * 10;
        changeMoney(currentBet * 10)
      }
    }

    for (let i = 0; i < lane.length; i++) {
      selectedIndex.value[i] = wheel.getIndexFromHeight(state, lane[i]);
    }

    await sleep(1000);

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
    <div id="wheel">
      <div id="outerWheels">
        <div id="wheels">
          <div class="slots" ref="spinner1">
            <template v-for="(val,index) in wheel.lines[0].data">
              <div class="slot"
                   :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
                <SlotEntry :value="val" :selection="getSelectionState(0,index)"/>
              </div>
            </template>
          </div>
          <div class="splitter"></div>
          <div class="slots" ref="spinner2">
            <template v-for="(val,index) in wheel.lines[1].data">
              <div class="slot"
                   :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
                <SlotEntry :value="val" :selection="getSelectionState(1,index)"/>
              </div>
            </template>
          </div>
          <div class="splitter"></div>
          <div class="slots" ref="spinner3">
            <template v-for="(val,index) in wheel.lines[2].data">
              <div class="slot"
                   :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
                <SlotEntry :value="val" :selection="getSelectionState(2,index)"/>
              </div>
            </template>
          </div>
          <div class="splitter"></div>
          <div class="slots" ref="spinner4">
            <template v-for="(val,index) in wheel.lines[3].data">
              <div class="slot"
                   :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
                <SlotEntry :value="val" :selection="getSelectionState(3,index)"/>
              </div>
            </template>
          </div>
          <div class="splitter"></div>
          <div class="slots" ref="spinner5">
            <template v-for="(val,index) in wheel.lines[4].data">
              <div class="slot"
                   :style="{transform: 'rotateX('+  (slotAngle * index - 90) + 'deg) translateZ(' + (REEL_RADIUS + 5) + 'px)' }">
                <SlotEntry :value="val" :selection="getSelectionState(4,index)"/>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div id="bg"></div>
      <div id="bg2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#2C4557"
                d="M56.7,-67C70.8,-55.8,77.6,-35.3,80.5,-14.8C83.5,5.8,82.5,26.5,72,38.7C61.5,50.9,41.4,54.6,23.9,57.5C6.4,60.4,-8.5,62.4,-24,59.5C-39.5,56.7,-55.6,49,-67.8,35.5C-80,21.9,-88.4,2.4,-85.2,-14.9C-82,-32.1,-67.1,-47.2,-51,-58C-34.8,-68.9,-17.4,-75.4,2,-77.7C21.3,-80.1,42.7,-78.2,56.7,-67Z"
                transform="translate(100 100)"/>
        </svg>
      </div>
    </div>
    <div id="input">
      <div id="spinButton">
        <button @click="spin" :disabled="!hasEnoughMoney">
          Spin
        </button>
      </div>
      <div>
        <BetSelect></BetSelect>
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

    z-index: 100;
  }

  #wheel {
    position: relative;


    display: flex;

    #bg {
      z-index: 100;
      top: 0;
      bottom: 0;

      position: absolute;
      width: 100%;
      height: 100%;

      border-radius: 30px;

      background-image: linear-gradient(#00000099, #00000000, #00000099);
    }

    #bg2 {
      position: absolute;
      width: 100%;
      height: 100%;
      scale: 1.65;

      transform: translate(0, -20%);
    }

    #outerWheels {
      z-index: 50;
      border: 20px #1a889c solid;
      border-radius: 30px;

      background-color: #1a889c;

      #wheels {
        height: calc(150px * 3.25);
        display: flex;

        background-color: #2c4557;
        border-radius: 10px;

        justify-content: center;
        align-items: center;

        overflow: hidden;

        .splitter {
          height: calc(150px * 3.5);
          width: 2px;

          background-image: linear-gradient(#00000000, #1a889c, #00000000);
        }

        .slots {
          transform-style: preserve-3d;

          position: relative;

          width: 150px;

          .slot {
            -webkit-perspective: 200px;
            -moz-perspective: 200px;
            perspective: 200px;


            -webkit-backface-visibility: hidden;
            -moz-backface-visibility: hidden;
            backface-visibility: hidden;

            top: calc(150px / -2);

            position: absolute;

            box-sizing: border-box;
          }
        }
      }
    }
  }

  :deep(button) {
    background-color: #222831;
  }

  #input {

    #spinButton{
      display: flex;
      justify-content: center;
    }

    z-index: 100;
  }
}

</style>