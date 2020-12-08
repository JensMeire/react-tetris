import Shape from "infrastructure/shape/Shape";

export default class ReversedLShape extends Shape {
  constructor() {
    const color = "#666666";
    const grid = [
      [false, true],
      [false, true],
      [true, true]
    ];
    super(grid, color);
  }
}