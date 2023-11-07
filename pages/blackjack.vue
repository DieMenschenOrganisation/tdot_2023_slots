<script setup lang="ts">

import {Deck} from "~/utils/blackjack/deck";
import {BlackJackCard, getMaxValidSum} from "~/utils/blackjack/blackJackCard";
import Hand from "~/components/blackjack/hand.vue";
import {betMoney, changeMoney, hasEnoughMoney, money} from "~/stores/money";
import {onLeave} from "~/utils/Utils";

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

let wins = ref<boolean[]>([false, false]);
let losses = ref<boolean[]>([false, false]);

//todo
const route = useRoute();
console.log(route.query.test);

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
  losses.value[hand] = true;
  yourTurn.value[hand] = false;
  await sleep(1000);
}

async function win(hand: number, winMulti: number) {
  wins.value[hand] = true;
  yourTurn.value[hand] = false;
  await sleep(1000);

  changeMoney(betMoney.value * winMulti)
}

function reset() {
  if (yourTurn.value[0] || yourTurn.value[1])
    return

  yourCards.value = [[], []];
  croupierCards.value = [];

  running.value = false;
  yourTurn.value = [false, false];
  firstTurn.value = false;

  wins.value = [false, false];
  losses.value = [false, false];

  deck = new Deck();
}

async function check(hand: number) {
  yourTurn.value[hand] = false;

  if (getMaxValidSum(yourCards.value[hand]) == 21 && yourCards.value[hand].length == 2) {
    await win(hand, 2.5);
    reset()
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
      await win(hand, 2)
    } else if (getMaxValidSum(croupierCards.value) == getMaxValidSum(yourCards.value[hand])) {
      await win(hand, 1)
    } else {
      await loss(hand)
    }
    await sleep(2000)
  }

  reset();
}

async function onDouble(hand: number) {
  changeMoney(-betMoney.value)

  firstTurn.value = false;
  yourTurn.value[hand] = false;

  betMoney.value *= 2;

  await next(hand)

  if (running) {
    await sleep(2000)
    await check(hand)
  }

  betMoney.value /= 2;
}

async function onSplit() {
  changeMoney(-betMoney.value)

  firstTurn.value = false;

  let card = yourCards.value[0].splice(1, 1)[0];
  yourCards.value[1].push(card);

  yourTurn.value[1] = true;
}

async function onBet() {
  running.value = true;
  firstTurn.value = true;

  changeMoney(-betMoney.value)

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
  <main>
    <div id="leave">
      <button @click="onLeave()">
        Leave
      </button>
    </div>
    <div id="money">
      money: {{ money }}
    </div>
    <div v-if="running" id="game">
      <div id="head">
        <hand :cards="croupierCards"></hand>
      </div>
      <div id="base">
        <div v-for="(cards, index) in yourCards" id="hand">
          <template v-if="cards.length > 0">
            <div id="bet" :class="{loss: losses[index],win: wins[index]}">
              <jeton :value="betMoney"></jeton>
            </div>
            <div id="buttons">
              <button @click="next(index)" :disabled="!yourTurn[index]">
                next
              </button>
              <button @click="check(index)" :disabled="!yourTurn[index]">
                check
              </button>
              <button @click="onDouble(index)" v-if="firstTurn" :disabled="!yourTurn[index] || !hasEnoughMoney">
                double
              </button>
              <button @click="onSplit" v-if="canSplit" :disabled="!yourTurn[index] || !hasEnoughMoney">
                split
              </button>
            </div>
            <hand :cards="cards"></hand>
          </template>
        </div>
      </div>
    </div>
    <div v-else id="betting">
      <button @click="onBet" :disabled="!hasEnoughMoney">
        bet
      </button>
      <BetSelect></BetSelect>
    </div>
  </main>
</template>

<style scoped lang="scss">

#leave {
  position: absolute;
}

#game {

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  height: 90vh;
  padding: 5vh;

  overflow: hidden;

  #head {
    width: 100%;

    display: flex;

    flex-direction: column;
    align-items: center;
  }

  #base {
    width: 100%;

    display: flex;

    overflow: hidden;

    justify-content: center;

    #hand {

      display: flex;
      align-items: center;

      flex-direction: column;

      #buttons {
        display: flex;
        width: 200px;

        justify-content: space-around;
      }

      #bet {
        position: absolute;

        top: calc(50vh - 50px);

        transition: 1s;

        width: 100px;

        z-index: 100;

        &.loss {
          top: -100px;
        }

        &.win {
          top: calc(100vh + 100px);
        }
      }
    }
  }
}

#betting {
  display: flex;
  flex-direction: column;

  height: 100vh;

  justify-content: center;
  align-items: center;
}

#money {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

main {
  height: 100vh;
  width: 100vw;

  background-image: url('/backgroundSlots.svg');
  background-repeat: no-repeat;
  background-size: cover;

  z-index: -10;
}
</style>