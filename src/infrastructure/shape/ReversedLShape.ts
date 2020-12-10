import Shape from "infrastructure/shape/Shape";

export default class ReversedLShape extends Shape {
  constructor() {
    const color = "#3fc20c";
    const grid = [
      [false, true],
      [false, true],
      [true, true]
    ];
    super(grid, color);
  }
}