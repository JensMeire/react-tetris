import IShape from "./IShape";

export default class LShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#222222";
    this.grid = [
      [true, false],
      [true, false],
      [true, true]
    ];
  }
}