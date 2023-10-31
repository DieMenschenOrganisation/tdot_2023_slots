export interface BlackJackCard {
  color: number
  value: number
  back: boolean
}

export const cardColors = ["diamond", "heart", "club", "spade"]
export const cardValues = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "king", "queen"]

export function getMaxValidSum(cards: BlackJackCard[]) {

  let sum = 0;

  for (let card of cards) {
    sum += Math.min(card.value + 1, 10)
  }

  let aceCount = 0;

  for (let card of cards) {
    if (card.value == 0) {
      aceCount++;
    }
  }

  for (let i = 0; i < aceCount; i++) {
    if (sum > 11)
      break

    sum += 10;
  }

  return sum;
}
