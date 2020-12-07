import IShape from "./IShape";

export default class ReversedLShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#666666";
    this.grid = [
      [false, true],
      [false, true],
      [true, true]
    ];
  }
}