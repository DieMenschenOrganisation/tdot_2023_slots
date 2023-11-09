import {cardColors, cardValues} from "~/utils/blackjack/blackJackCard";

export function prefetchJetons() {

  let jetons = ["1", "5", "10", "25", "50", "100", "500"]

  let links = [];

  for (let jeton of jetons) {
    links.push({
      rel: 'preload',
      href: `/jeton/jeton${jeton}.png`,
      as: 'image',
    })
  }

  useHead({
    link: links as any
  })
}

export function prefetchCards() {

  let links = [];

  for (let cardValue of cardValues) {
    for (let cardColor of cardColors) {
      links.push({
        rel: 'preload',
        href: `/cards/${cardValue}-${cardColor}.png`,
        as: 'image',
      })
    }
  }

  useHead({
    link: links as any
  })
}