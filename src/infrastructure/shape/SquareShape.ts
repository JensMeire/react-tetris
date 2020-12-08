import Shape from "infrastructure/shape/Shape";

export default class SquareShape extends Shape {
  constructor() {
    const color = "#888888";
    const grid = [
      [true, true],
      [true, true]
    ];
    super(grid, color);
  }
}