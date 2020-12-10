import IShape from "infrastructure/shape/IShape";

export default class Shape implements IShape {
  protected color: string;
  protected grid: Array<Array<boolean>>;

  constructor(grid: Array<Array<boolean>>, color: string) {
    this.grid = grid;
    this.color = color;
  }

  getSize(): [number, number] {
    return [this.grid[0].length, this.grid.length];
  }

  rotateLeft(): IShape {
    const [width, height] = this.getSize();
    const newGrid: Array<Array<boolean>> = [];
    for (let x = width - 1; x >= 0; x--) {
      const newRow = [];
      for (let y = 0; y < height; y++) {
        newRow.push(this.grid[y][x]);
      }
      newGrid.push(newRow);
    }
    return new Shape(newGrid, this.color);
  }

  rotateRight(): IShape {
    const [width, height] = this.getSize();
    const newGrid: Array<Array<boolean>> = [];
    for (let x = 0; x < width; x++) {
      const newRow = [];
      for (let y = height - 1; y >= 0; y--) {
        newRow.push(this.grid[y][x]);
      }
      newGrid.push(newRow);
    }

    return new Shape(newGrid, this.color);
  }

  getColor(): string {
    return this.color;
  }

  getGrid(): Array<Array<boolean>> {
    return this.grid;
  }
}