import Shape from "infrastructure/shape/Shape";

export default class TShape extends Shape {
  constructor() {
    const color = "#0952d9";
    const grid = [
      [true, true, true],
      [false, true, false]
    ];
    super(grid, color);
  }
}