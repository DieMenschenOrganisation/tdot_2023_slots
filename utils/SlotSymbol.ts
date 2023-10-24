export enum SlotSymbol {
  BAR,
  BELL,
  CHERRY,
  DIAMOND,
  LEMON,
  ORANGE,
  SEVEN
}

export function randomSymbol(): SlotSymbol {
  return Math.floor(Math.random() * 7) as SlotSymbol
}