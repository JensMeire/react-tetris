import IShape from "infrastructure/shape/IShape";
import ICollisionDetector from "infrastructure/modules/CollisionDetector/ICollisionDetector";
import {Position} from "infrastructure/modules/PlayableShape/IPlayableShapeModule";
import {Grid} from "infrastructure/modules/Board/IBoardModule";

export class CollisionDetector implements ICollisionDetector {
  canMoveDown(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;
    const rowCount = grid[0].length;

    if (currentY === rowCount - 1)
      return false;

    const checkY = currentY + 1;
    const shapeGrid = shape.getGrid();

    for (let x = currentX, i = 0; i < width; x++, i++) {
      for (let y = height - 1, j = 0; y >= 0; y--, j++)
        if (grid[checkY - j][x] && shapeGrid[y][i])
          return false;
    }

    return true;
  }

  canMoveLeft(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;

    if (currentX === 0) return false;

    const endY = currentY;
    const checkX = currentX - 1;
    const shapeGrid = shape.getGrid();

    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      for (let x = 0; x < width; x++)
        if (grid[y][checkX + x] && shapeGrid[i][x])
          return false;
    }

    return true;
  }

  canMoveRight(shape: IShape, position: Position, grid: Grid): boolean {
    if (!shape)
      return false;

    const [width, height] = shape.getSize();
    const [currentX, currentY] = position;
    const columnCount = grid.length;

    if (currentX === (columnCount - width))
      return false;

    const endY = currentY;
    const checkX = currentX + width;
    const shapeGrid = shape.getGrid();
    for (let y = endY, i = height - 1; i >= 0; y--, i--) {
      for (let x = width - 1, j = 0; x >= 0; x--, j++)
        if (grid[y][checkX - j] && shapeGrid[i][x])
          return false;
    }
    return true;
  }

}