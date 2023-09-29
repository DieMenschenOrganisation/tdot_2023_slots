import {Ref} from "@vue/reactivity";
import {SlotLine} from "~/utils/SlotLine";

export class Wheel {

  private htmlRefs: Ref<HTMLElement | null>[];
  private _lines: SlotLine[];

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
        delay: 500 * i,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
      })
    }

    for (let line of this._lines) {
      line.randomize(front)
    }
  }


  get lines(): SlotLine[] {
    return this._lines;
  }
}