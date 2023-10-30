import {UnwrapNestedRefs} from "vue";
import {randomSymbol, SlotSymbol} from "~/utils/slots/SlotSymbol";

export class SlotLine {
  private readonly _data: UnwrapNestedRefs<SlotSymbol[]> = reactive([])
  private readonly size: number;

  constructor(data: SlotSymbol[], size: number) {
    this._data = reactive(data);
    this.size = size;
  }

  public static random(size: number): SlotLine {

    let data: SlotSymbol[] = [];

    for (let i = 0; i < size; i++) {
      data.push(randomSymbol());
    }

    return new SlotLine(data, size);
  }

  public randomize(front: boolean) {

    let min
    let max;

    if (front) {
      min = 0;
      max = (this.size / 2)
    } else {
      min = (this.size / 2);
      max = this.size;
    }

    for (let i = min; i < max; i++) {
      this._data[i] = randomSymbol();
    }
  }

  public getValue(front: boolean, height: number): SlotSymbol {
    return this.data[this.getIndexFromHeight(front, height)];
  }

  public getIndexFromHeight(front: boolean, height: number): number {
    let min
    let max;

    if (front) {
      min = 0;
      max = (this.size / 2)
    } else {
      min = (this.size / 2);
      max = this.size;
    }

    let center = (min + max) / 2

    return center + height;
  }

  get data(): UnwrapNestedRefs<SlotSymbol[]> {
    return this._data;
  }
}