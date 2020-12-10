import Shape from "infrastructure/shape/Shape";

export default class LineShape extends Shape {
  constructor() {
    const color = "#eb4034";
    const grid = [
      [true],
      [true],
      [true],
      [true]
    ];
    super(grid, color);
  }
}