import Shape from "infrastructure/shape/Shape";

export default class LShape extends Shape {
  constructor() {
    const color = "#000000";
    const grid = [
      [true, false],
      [true, false],
      [true, true]
    ];
    super(grid, color)
  }
}