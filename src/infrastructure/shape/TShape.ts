import IShape from "./IShape";

export default class TShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#AAAAAA";
    this.grid = [
      [true, true, true],
      [false, true, false]
    ];
  }
}