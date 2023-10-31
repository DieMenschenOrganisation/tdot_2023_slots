<script setup lang="ts">

import {Deck} from "~/utils/blackjack/deck";
import {BlackJackCard, getMaxValidSum} from "~/utils/blackjack/blackJackCard";
import Hand from "~/components/blackjack/hand.vue";
import {breakStatement} from "@babel/types";

let deck = new Deck();

let yourCards = ref<BlackJackCard[]>([])
let croupierCards = ref<BlackJackCard[]>([])

let running = ref<boolean>(false)
let yourTurn = ref<boolean>(false)

let betValue = ref<number>(0);
let money = ref<number>(1000);

function next() {
  yourCards.value.push(deck.getRandomCard());

  if (getMaxValidSum(yourCards.value) > 21) {
    loss()
  }
}

async function loss() {
  yourTurn.value = false;
  console.log("noop")

  await sleep(2000)
  reset();
}

async function win() {
  yourTurn.value = false;
  console.log("easy W")

  if (getMaxValidSum(yourCards.value) == 21 && yourCards.value.length == 2) {
    money.value += betValue.value * 2.5;
  } else {
    money.value += betValue.value * 2;
  }

  await sleep(2000)
  reset();
}

function reset() {
  yourCards.value = [];
  croupierCards.value = [];

  running.value = false;
  yourTurn.value = false;

  deck = new Deck();
}

async function check() {
  yourTurn.value = false;

  if (getMaxValidSum(yourCards.value) == 21 && yourCards.value.length == 2) {
    await win();
    return
  }

  croupierCards.value[1].back = false;
  while (getMaxValidSum(croupierCards.value) < 16) {
    await sleep(2000)
    croupierCards.value.push(deck.getRandomCard())
  }

  if (getMaxValidSum(croupierCards.value) > 21 || getMaxValidSum(croupierCards.value) < getMaxValidSum(yourCards.value)) {
    await win()
  } else {
    await loss()
  }
}

async function onBet() {
  running.value = true;
  yourTurn.value = true;

  money.value -= betValue.value;

  yourCards.value.push(deck.getRandomCard());

  await sleep(500)
  croupierCards.value.push(deck.getRandomCard())

  await sleep(500)
  yourCards.value.push(deck.getRandomCard());

  await sleep(500)
  let hiddenCard = deck.getRandomCard();
  hiddenCard.back = true;
  croupierCards.value.push(hiddenCard)
}

</script>-

<template>
  <div v-if="running" id="game">
    <div id="head">
      <hand :cards="croupierCards"></hand>
    </div>
    <div>
      {{ betValue }}
    </div>
    <div id="base">
      <div id="buttons">
        <button @click="next" :disabled="!yourTurn">
          next
        </button>
        <button @click="check" :disabled="!yourTurn">
          check
        </button>
      </div>
      <hand :cards="yourCards"></hand>
    </div>
  </div>
  <div v-else id="betting">
    <button @click="onBet">
      bet
    </button>
    <input type="number" name="betValue" id="betValue" v-model="betValue">
  </div>
  <div id="money">
    money: {{ money }}
  </div>
</template>

<style scoped lang="scss">
#game {

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  height: 90vh;
  margin: 5vh;

  #head {
    width: 100%;

    display: flex;

    flex-direction: column;
    align-items: center;
  }

  #base {
    width: 100%;

    display: flex;

    flex-direction: column;
    align-items: center;

    #buttons {
      display: flex;
      width: 200px;

      justify-content: space-around;
    }
  }
}

#betting {
  display: flex;

  height: 100vh;

  justify-content: center;
  align-items: center;
}

#money {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

</style>