import Shape from "infrastructure/shape/Shape";

export default class TShape extends Shape {
  constructor() {
    const color = "#AAAAAA";
    const grid = [
      [true, true, true],
      [false, true, false]
    ];
    super(grid, color);
  }
}