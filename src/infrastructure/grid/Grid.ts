import IShape from "infrastructure/shape/IShape";

export default class Grid {
  private playField: Array<Array<boolean>>
  private currentShape: IShape | undefined;
  private currentShapePosition: [number, number];
  private readonly rowCount: number;
  private readonly columnCount: number;

  constructor() {
    this.rowCount = 40;
    this.columnCount = 10;
    this.playField = [];
    this.currentShapePosition = [0, 0]
    this.initializeGrid();
  }

  private initializeGrid() {
    for (let row = 0; row < this.rowCount; row++) {
      const row = [];
      for (let column = 0; column < this.columnCount; column++) row.push(false);
      this.playField.push(row);
    }
  }

  private setCurrentPosition(x: number, y: number) {
    this.currentShapePosition = [x, y];
  }

  public setNewCurrentShape(shape: IShape): void {
    this.currentShape = shape;
    const [width, height] = shape.getSize();
    const centerY = height - 1;
    const centerX = Math.floor(width / 2);
    this.setCurrentPosition(centerX, centerY);
  }

  public moveLeft(): boolean {
    if (!this.currentShape)
      return false;

    const [, height] = this.currentShape.getSize();
    const [currentX, currentY] = this.currentShapePosition;

    if (currentX === 0) return false;

    const endY = currentY;
    const checkX = currentX - 1;
    const shapeGrid = this.currentShape.getGrid();

    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      if (this.playField[y][checkX] && shapeGrid[y][0])
        return false;
    }
    this.currentShapePosition = [currentX - 1, currentY]
    return true;
  }

  public moveRight(): boolean {
    if (!this.currentShape)
      return false;

    const [width, height] = this.currentShape.getSize();
    const [currentX, currentY] = this.currentShapePosition;

    if (currentX === (this.columnCount - width))
      return false;

    const endY = currentY;
    const checkX = currentX + width;
    const shapeGrid = this.currentShape.getGrid();
    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      if (this.playField[y][checkX] && shapeGrid[y][width - 1])
        return false;
    }
    this.currentShapePosition = [currentX + 1, currentY]
    return true;
  }

  public moveDown(): boolean {
    if (!this.currentShape)
      return false;

    const [width, height] = this.currentShape.getSize();
    const [currentX, currentY] = this.currentShapePosition;

    if (currentY === this.rowCount - 1)
      return false;

    const checkY = currentY + 1;
    const shapeGrid = this.currentShape.getGrid();

    for (let x = currentX, i = 0; i < width; x++, i++) {
      if (this.playField[checkY][x] && shapeGrid[height - 1][x])
        return false;
    }

    this.currentShapePosition = [currentX, currentY + 1];
    return true;
  }
}