import IShape from "./IShape";

export default class SquareShape implements IShape {
  color: string;
  grid: Array<Array<boolean>>;

  constructor() {
    this.color = "#888888";
    this.grid = [
      [true, true],
      [true, true]
    ]; 
  }
}