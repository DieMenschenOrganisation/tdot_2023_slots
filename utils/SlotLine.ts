import {UnwrapNestedRefs} from "vue";

export class SlotLine {
  private readonly _data: UnwrapNestedRefs<string[]> = reactive([])
  private readonly size: number;

  constructor(data: string[], size: number) {
    this._data = reactive(data);
    this.size = size;
  }

  public static random(size: number): SlotLine {

    let data = [];

    for (let i = 0; i < size; i++) {
      data.push("" + Math.round(Math.random() * size));
    }

    return new SlotLine(data, size);
  }

  public static debug(size: number): SlotLine {

    let data = [];

    for (let i = 0; i < size; i++) {
      data.push("" + i);
    }

    return new SlotLine(data, size);
  }

  public randomize(front: boolean): string {

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
      this._data[i] = "" + Math.round(Math.random() * this.size);
    }

    return this._data[(min + max) / 2];
  }

  get data(): UnwrapNestedRefs<string[]> {
    return this._data;
  }

  get dataValue(): string[] {
    return this._data;
  }
}