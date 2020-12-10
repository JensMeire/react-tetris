import Shape from "infrastructure/shape/Shape";

export default class ZShape extends Shape {
  constructor() {
    const color = "#6d0cad";
    const grid = [
      [false, true, true],
      [true, true, false]
    ];
    super(grid, color);
  }
}