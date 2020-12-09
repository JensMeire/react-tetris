import IShape from "infrastructure/shape/IShape";
import {Grid, Position} from "infrastructure/game/GameContext";

type ShapeSetter = (shape: IShape) => void;
type PositionSetter = (x: number, y: number) => void;

export const getColor = (x: number, y: number, grid: Grid, currentShape: IShape, currentShapePosition: Position): string | undefined => {
  const value = grid[y][x];
  if (value) return value;
  if (!currentShape) return;
  const [currentX, currentY] = currentShapePosition;
  const [width, height] = currentShape.getSize();
  if (y <= currentY && y >= (currentY - height + 1) && x >= currentX && x <= (currentX + width - 1)) {
    const grid = currentShape.getGrid();
    const collide = grid[y - (currentY - height + 1)][x - currentX]
    if (collide)
      return currentShape.getColor();
  }
  return;
}

export const initializeNewCurrentShape = (shape: IShape, setCurrentShape: ShapeSetter, setCurrentShapePosition: PositionSetter, columnCount: number): void => {
  setCurrentShape(shape);
  const [width, height] = shape.getSize();
  const centerY = height - 1;
  const centerX = Math.floor((columnCount - width) / 2);
  setCurrentShapePosition(centerX, centerY);
  console.log('newshape')
}

export const canMoveLeft = (currentShape: IShape, currentShapePosition: Position, grid: Grid): boolean => {
  if (!currentShape)
    return false;

  const [, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  if (currentX === 0) return false;

  const endY = currentY;
  const checkX = currentX - 1;
  const shapeGrid = currentShape.getGrid();

  for (let y = endY, i = height - 1; i >= 0; y--, i--) {
    if (grid[y][checkX] && shapeGrid[y][0])
      return false;
  }

  return true;
}

export const moveLeft = (currentShapePosition: Position, setCurrentShapePosition: PositionSetter): void => {
  const [currentX, currentY] = currentShapePosition;
  setCurrentShapePosition(currentX - 1, currentY);
}

export const canMoveRight = (currentShape: IShape, currentShapePosition: Position, grid: Grid, columnCount: number): boolean => {
  if (!currentShape)
    return false;

  const [width, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  if (currentX === (columnCount - width))
    return false;

  const endY = currentY;
  const checkX = currentX + width;
  const shapeGrid = currentShape.getGrid();
  for (let y = endY, i = height - 1; i >= 0; y--, i--) {
    if (grid[y][checkX] && shapeGrid[y][width - 1])
      return false;
  }
  return true;
}


export const moveRight = (currentShapePosition: Position, setCurrentShapePosition: PositionSetter): void => {
  const [currentX, currentY] = currentShapePosition;
  setCurrentShapePosition(currentX + 1, currentY);
}

export const canMoveDown = (currentShape: IShape, currentShapePosition: Position, grid: Grid, rowCount: number): boolean => {
  if (!currentShape)
    return false;

  const [width, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  if (currentY === rowCount - 1)
    return false;

  const checkY = currentY + 1;
  const shapeGrid = currentShape.getGrid();

  for (let x = currentX, i = 0; i < width; x++, i++) {
    if (grid[checkY][x] && shapeGrid[height - 1][x])
      return false;
  }

  return true;
}

export const lockShape = (currentShape: IShape, currentShapePosition: Position, grid: Grid): void => {
  if (!currentShape)
    return;

  const [width, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  const shapeGrid = currentShape.getGrid();
  for (let y = currentY, i = height - 1; i >= 0; y--, i--) {
    for (let x = currentX, j = 0; j < width; x++, j++) {
      if (shapeGrid[i][j])
        grid[y][x] = currentShape.getColor();
    }
  }
}

export const moveDown = (currentShapePosition: Position, setCurrentShapePosition: PositionSetter): void => {
  const [currentX, currentY] = currentShapePosition;
  setCurrentShapePosition(currentX, currentY + 1);
}