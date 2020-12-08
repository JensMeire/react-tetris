import Shape from "infrastructure/shape/Shape";

export default class ReversedZShape extends Shape {
  constructor() {
    const color = "#EEEEEE";
    const grid = [
      [true, true, false],
      [false, true, true]
    ];
    super(grid, color);
  }
}