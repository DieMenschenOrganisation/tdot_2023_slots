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
  return Math.min(Math.floor(Math.random() * 14), 6) as SlotSymbol
}