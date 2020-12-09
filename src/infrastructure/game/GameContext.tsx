import IShape from "infrastructure/shape/IShape";
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {
  getColor as getColorAction,
  lockShape as lockShapeAction,
  canMoveRight as canMoveRightAction,
  canMoveLeft as canMoveLeftAction,
  canMoveDown as canMoveDownAction,
  moveRight as moveRightAction,
  moveLeft as moveLeftAction,
  moveDown as moveDownAction,
  initializeNewCurrentShape as initializeNewCurrentShapeAction
} from "./Actions"
import getRandomShape from "infrastructure/shape/ShapeFactory";

export type Color = string | undefined
export type Grid = Array<Array<Color>>
export type Position = [number, number];
const EmptyGrid = [] as Grid;
const PositionZero = [0, 0] as Position;
const EmptyShape = {} as IShape;


interface IGameContext {
  grid: Grid;
  currentShape: IShape;
  currentShapePosition: Position;
  getColor: (x: number, y: number) => Color;
  initializeNewShape: () => void;
  canMoveDown: () => boolean;
  moveDown: () => void;
  canMoveLeft: () => boolean;
  moveLeft: () => void;
  canMoveRight: () => boolean;
  moveRight: () => void;
  lockShape: () => void;
}

const GameContext = createContext<IGameContext>({
  grid: EmptyGrid,
  currentShape: EmptyShape,
  currentShapePosition: PositionZero,
  getColor: (x: number, y: number) => {
  },
  initializeNewShape: () => {
  },
  canMoveDown: () => {
  },
  moveDown: () => {
  },
  canMoveLeft: () => {
  },
  moveLeft: () => {
  },
  canMoveRight: () => {
  },
  moveRight: () => {
  },
  lockShape: () => {
  }
} as IGameContext)

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}


const GameContextProvider = (props: IProps) => {
  const [grid, setGrid] = useState<Grid>(EmptyGrid);
  const [currentShape, setCurrentShape] = useState<IShape>(EmptyShape);
  const [currentShapePosition, setCurrentShapePosition] = useState<Position>(PositionZero);
  const columnCount = useMemo(() => 10, []);
  const rowCount = useMemo(() => 25, []);

  const initializeGrid = () => {
    for (let row = 0; row < rowCount; row++) {
      const row = [];
      for (let column = 0; column < columnCount; column++) row.push(undefined);
      grid.push(row);
    }
  }

  useEffect(() => {
    initializeGrid();
    initializeNewCurrentShape();
  }, []);

  const setCurrentPosition = (x: number, y: number) => {
    setCurrentShapePosition([x, y])
  }


  const getColor = (x: number, y: number): string | undefined => {
    return getColorAction(x, y, grid, currentShape, currentShapePosition);
  }

  const initializeNewCurrentShape = (): void => {
    return initializeNewCurrentShapeAction(getRandomShape(), setCurrentShape, setCurrentPosition, columnCount);
  }

  const canMoveLeft = (): boolean => {
    return canMoveLeftAction(currentShape, currentShapePosition, grid);
  }

  const moveLeft = (): void => {
    if(canMoveLeft())
      return moveLeftAction(currentShapePosition, setCurrentPosition);
  }

  const canMoveRight = (): boolean => {
    return canMoveRightAction(currentShape, currentShapePosition, grid, columnCount);
  }


  const moveRight = (): void => {
    if(canMoveRight())
      return moveRightAction(currentShapePosition, setCurrentPosition);
  }

  const canMoveDown = (): boolean => {
    return canMoveDownAction(currentShape, currentShapePosition, grid, rowCount);
  }

  const lockShape = (): void => {
    return lockShapeAction(currentShape, currentShapePosition, grid);
  }

  const moveDown = (): void => {
    if (!canMoveDown())
      lockShape();
    moveDownAction(currentShapePosition, setCurrentPosition);
  }

  return <GameContext.Provider
    value={
      {
        grid: grid,
        currentShape: currentShape,
        currentShapePosition: currentShapePosition,
        getColor: getColor,
        initializeNewShape: initializeNewCurrentShape,
        canMoveDown: canMoveDown,
        moveDown: moveDown,
        canMoveLeft: canMoveLeft,
        moveLeft: moveLeft,
        canMoveRight: canMoveRight,
        moveRight: moveRight,
        lockShape: lockShape
      }
    }>
    {props.children}
  </GameContext.Provider>;
}

const useGame = () => useContext(GameContext);

export { GameContextProvider, useGame };