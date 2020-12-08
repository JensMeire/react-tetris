import Shape from "infrastructure/shape/Shape";

export default class LineShape extends Shape {
  constructor() {
    const color = "#444444";
    const grid = [
      [true],
      [true],
      [true],
      [true]
    ];
    super(grid, color);
  }
}