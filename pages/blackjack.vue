<script setup lang="ts">

import {Deck} from "~/utils/blackjack/deck";
import {BlackJackCard, getMaxValidSum} from "~/utils/blackjack/blackJackCard";
import Hand from "~/components/blackjack/hand.vue";

let deck = new Deck();

let yourCards = ref<BlackJackCard[][]>([[], []])
let croupierCards = ref<BlackJackCard[]>([])

let running = ref<boolean>(false)
let yourTurn = ref<boolean[]>([false, false])
let firstTurn = ref<boolean>(false)
let canSplit = computed(args => {
  let cards = yourCards.value[0];

  if (cards.length != 2 || !firstTurn.value)
    return false

  return cards[0].value == cards[1].value;
})

let betValue = ref<number>(0);
let money = ref<number>(1000);

async function next(hand: number) {
  firstTurn.value = false;

  yourCards.value[hand].push(deck.getRandomCard());

  if (getMaxValidSum(yourCards.value[hand]) > 21) {
    await loss(hand)
    await sleep(2000)
    reset();
  }
}

async function loss(hand: number) {
  yourTurn.value[hand] = false;
  console.log("noop")
}

async function win(hand: number) {
  yourTurn.value[hand] = false;
  console.log("easy W")

  if (getMaxValidSum(yourCards.value[hand]) == 21 && yourCards.value[hand].length == 2) {
    money.value += betValue.value * 2.5;
  } else {
    money.value += betValue.value * 2;
  }
}

function reset() {
  if (yourTurn.value[0] || yourTurn.value[1])
    return

  yourCards.value = [[], []];
  croupierCards.value = [];

  running.value = false;
  yourTurn.value = [false, false];
  firstTurn.value = false;

  deck = new Deck();
}

async function check(hand: number) {
  yourTurn.value[hand] = false;

  if (getMaxValidSum(yourCards.value[hand]) == 21 && yourCards.value[hand].length == 2) {
    await win(hand);
    return
  }

  if (!yourTurn.value[0] && !yourTurn.value[1]) {
    await runCroupier()
  }
}

async function runCroupier() {
  croupierCards.value[1].back = false;

  await sleep(2000)
  while (getMaxValidSum(croupierCards.value) < 16) {
    croupierCards.value.push(deck.getRandomCard())
    await sleep(2000)
  }

  for (let hand = 0; hand < yourCards.value.length; hand++) {

    if (yourCards.value[hand].length <= 0)
      continue

    if (getMaxValidSum(croupierCards.value) > 21 || getMaxValidSum(croupierCards.value) < getMaxValidSum(yourCards.value[hand])) {
      await win(hand)
    } else {
      await loss(hand)
    }
    await sleep(2000)
  }

  reset();
}

async function onDouble(hand: number) {
  firstTurn.value = false;
  yourTurn.value[hand] = false;

  betValue.value *= 2;

  await next(hand)

  if (running) {
    await sleep(2000)
    await check(hand)
  }

  betValue.value /= 2;
}

async function onSplit() {
  firstTurn.value = false;

  let card = yourCards.value[0].splice(1, 1)[0];
  yourCards.value[1].push(card);

  yourTurn.value[1] = true;
}

async function onBet() {
  running.value = true;
  firstTurn.value = true;

  money.value -= betValue.value;

  yourCards.value[0].push(deck.getRandomCard());

  await sleep(500)
  croupierCards.value.push(deck.getRandomCard())

  await sleep(500)
  yourCards.value[0].push(deck.getRandomCard());

  await sleep(500)
  let hiddenCard = deck.getRandomCard();
  hiddenCard.back = true;
  croupierCards.value.push(hiddenCard)

  yourTurn.value[0] = true;
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
      <div v-for="(cards, index) in yourCards">
        <template v-if="cards.length > 0">
          <div id="buttons">
            <button @click="next(index)" :disabled="!yourTurn[index]">
              next
            </button>
            <button @click="check(index)" :disabled="!yourTurn[index]">
              check
            </button>
            <button @click="onDouble(index)" v-if="firstTurn" :disabled="!yourTurn[index]">
              double
            </button>
            <button @click="onSplit" v-if="canSplit" :disabled="!yourTurn[index]">
              split
            </button>
          </div>
          <hand :cards="cards"></hand>
        </template>
      </div>
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