import IShape from "./IShape";

export default class ReversedZShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#EEEEEE";
    this.grid = [
      [true, true, false],
      [false, true, true]
    ];
  }
}