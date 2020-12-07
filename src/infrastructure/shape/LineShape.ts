import IShape from "./IShape";

export default class LineShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#444444";
    this.grid = [
      [true],
      [true],
      [true],
      [true]
    ];
  }
}