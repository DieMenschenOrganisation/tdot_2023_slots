import {Ref} from "@vue/reactivity";
import {SlotLine} from "~/utils/slots/SlotLine";
import {SlotSymbol} from "~/utils/slots/SlotSymbol";
import {sleep} from "@antfu/utils";
import {Lanes} from "~/utils/slots/lanes";

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

  public spin(front: boolean): number[][] {

    let transform;

    if (front) {
      transform = "rotateX(calc(-360deg * 5))"
    } else {
      transform = "rotateX(calc(-360deg * 5.5))"
    }

    for (let i = 0; i < this.htmlRefs.length; i++) {
      this.htmlRefs[i].value!.animate([{transform: "rotateX(0)"}, {transform: transform}], {
        duration: 2000,
        delay: 200 * i,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
      })
    }

    for (let line of this._lines) {
      line.randomize(front)
    }

    let winningLanes: number[][] = [];

    for (let lane of Lanes) {
      let values = this.getValues(front, lane);

      let start_value = values[0];

      let winningLane = []

      for (let i = 0; i < lane.length; i++) {
        if (start_value == values[i]) {
          winningLane.push(lane[i])
        } else {
          break
        }
      }

      winningLanes.push(winningLane)
    }

    winningLanes = winningLanes.filter(value => value.length >= 3)
    winningLanes.sort((a, b) => b.length - a.length);

    for (let i = winningLanes.length - 1; i >= 0; i--) {
      outer:
        for (let j = 0; j < i; j++) {
          for (let k = 0; k < winningLanes[i].length; k++) {
            if (winningLanes[i][k] != winningLanes[j][k]) {
              continue outer;
            }
          }
          winningLanes.splice(i, 1)
          break;
        }
    }

    return winningLanes;
  }

  public getValues(front: boolean, heights: number[]): SlotSymbol[] {

    let symbols = []

    for (let i = 0; i < heights.length; i++) {
      symbols.push(this.lines[i].getValue(front, heights[i]))
    }

    return symbols
  }

  public getIndexFromHeight(front: boolean, height: number): number {
    return this.lines[0].getIndexFromHeight(front, height);
  }

  get lines(): SlotLine[] {
    return this._lines;
  }
}