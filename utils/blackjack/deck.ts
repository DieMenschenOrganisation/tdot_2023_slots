import {BlackJackCard, cardColors, cardValues} from "~/utils/blackjack/blackJackCard";

export class Deck {

  private cards: BlackJackCard[] = []

  constructor() {
    for (let cardValue = 0; cardValue < cardValues.length; cardValue++) {
      for (let cardColor = 0; cardColor < cardColors.length; cardColor++) {
        this.cards.push({color: cardColor, value: cardValue, back: false})
      }
    }
  }

  public getRandomCard(): BlackJackCard {
    let index = Math.floor(Math.random() * this.cards.length);

    return this.cards.splice(index, 1)[0];
  }
}