import IShape from "./IShape";

export default class ZShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#CCCCCC";
    this.grid = [
      [false, true, true],
      [true, true, false]
    ];
  }
}