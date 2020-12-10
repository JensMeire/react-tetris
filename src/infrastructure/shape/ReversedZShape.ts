import Shape from "infrastructure/shape/Shape";

export default class ReversedZShape extends Shape {
  constructor() {
    const color = "#09d9cb";
    const grid = [
      [true, true, false],
      [false, true, true]
    ];
    super(grid, color);
  }
}