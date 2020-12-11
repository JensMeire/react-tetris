import IShape from "infrastructure/shape/IShape";
import {Grid, Position} from "infrastructure/game/GameContext";

type ShapeSetter = (shape: IShape) => void;
type PositionSetter = (x: number, y: number) => void;

export const getColor = (x: number, y: number, grid: Grid, currentShape: IShape | undefined, currentShapePosition: Position): string | undefined => {
  if(!currentShape) return;
  const value = grid[y][x];
  if (value) return value;

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
}

export const canMoveLeft = (currentShape: IShape | undefined, currentShapePosition: Position, grid: Grid): boolean => {
  if (!currentShape)
    return false;

  const [width, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  if (currentX === 0) return false;

  const endY = currentY;
  const checkX = currentX - 1;
  const shapeGrid = currentShape.getGrid();

  for (let y = endY, i = height - 1; i >= 0; y--, i--) {
    for (let x = 0; x < width; x++)
      if (grid[y][checkX + x] && shapeGrid[i][x])
        return false;
  }

  return true;
}

export const moveLeft = (currentShapePosition: Position, setCurrentShapePosition: PositionSetter): void => {
  const [currentX, currentY] = currentShapePosition;
  setCurrentShapePosition(currentX - 1, currentY);
}

export const canMoveRight = (currentShape: IShape | undefined, currentShapePosition: Position, grid: Grid, columnCount: number): boolean => {
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
    for (let x = width - 1, j = 0; x >= 0; x--, j++)
      if (grid[y][checkX - j] && shapeGrid[i][x])
        return false;
  }
  return true;
}


export const moveRight = (currentShapePosition: Position, setCurrentShapePosition: PositionSetter): void => {
  const [currentX, currentY] = currentShapePosition;
  setCurrentShapePosition(currentX + 1, currentY);
}

export const canMoveDown = (currentShape: IShape | undefined, currentShapePosition: Position, grid: Grid, rowCount: number): boolean => {
  if (!currentShape)
    return false;

  const [width, height] = currentShape.getSize();
  const [currentX, currentY] = currentShapePosition;

  if (currentY === rowCount - 1)
    return false;

  const checkY = currentY + 1;
  const shapeGrid = currentShape.getGrid();

  for (let x = currentX, i = 0; i < width; x++, i++) {
    for (let y = height - 1, j = 0; y >= 0; y--, j++)
      if (grid[checkY - j][x] && shapeGrid[y][i])
        return false;
  }

  return true;
}

export const lockShape = (currentShape: IShape | undefined, currentShapePosition: Position, grid: Grid): void => {
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