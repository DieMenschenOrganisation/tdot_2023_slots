import {Ref} from "@vue/reactivity";
import {SlotLine} from "~/utils/SlotLine";
import {SlotSymbol} from "~/utils/SlotSymbol";

export class Wheel {

  private htmlRefs: Ref<HTMLElement | null>[];
  private readonly _lines: SlotLine[];

  constructor(slotsPerWheel: number, htmlRefs: Ref<HTMLElement | null>[]) {
    this.htmlRefs = htmlRefs;

    this._lines = []

    for (let i = 0; i < htmlRefs.length; i++) {
      this._lines.push(SlotLine.random(slotsPerWheel))
    }
  }

  public spin(front: boolean) {

    let transform;

    if (front) {
      transform = "rotateX(calc(-360deg * 5))"
    } else {
      transform = "rotateX(calc(-360deg * 5.5))"
    }

    for (let i = 0; i < this.htmlRefs.length; i++) {
      this.htmlRefs[i].value!.animate([{transform: "rotateX(0)"}, {transform: transform}], {
        duration: 5000,
        delay: 200 * i,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
      })
    }

    for (let line of this._lines) {
      line.randomize(front)
    }
  }

  public getValues(front: boolean, heights: number[]): SlotSymbol[] {

    let symbols = []

    for (let i = 0; i < heights.length; i++) {
      symbols.push(this.lines[i].getValue(front, heights[i]))
    }

    return symbols
  }

  get lines(): SlotLine[] {
    return this._lines;
  }
}