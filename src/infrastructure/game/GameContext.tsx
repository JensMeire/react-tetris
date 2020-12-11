import IShape from "infrastructure/shape/IShape";
import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
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
import Game from "infrastructure/game/Game";

export type Color = string | undefined
export type Grid = Array<Array<Color>>
export type Position = [number, number];
const EmptyGrid = [] as Grid;
const PositionZero = [0, 0] as Position;

interface IGameContext {
  grid: Grid;
  currentShape: IShape | undefined;
  currentShapePosition: Position;
  getColor: (x: number, y: number) => Color;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  lockShape: () => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  startNewGame: () => void;
}

const GameContext = createContext<IGameContext>({
  grid: EmptyGrid,
  currentShape: undefined,
  currentShapePosition: PositionZero,
  getColor: (x: number, y: number) => {
  },
  moveDown: () => {
  },
  moveLeft: () => {
  },
  moveRight: () => {
  },
  lockShape: () => {
  },
  rotateLeft: () => {
  },
  rotateRight: () => {
  },
  startNewGame: () => {
  }
} as IGameContext)

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}


const GameContextProvider = (props: IProps) => {
  const [grid, setGrid] = useState<Grid>(EmptyGrid);
  const [currentShape, setCurrentShape] = useState<IShape | undefined>(undefined);
  const [currentShapePosition, setCurrentShapePosition] = useState<Position>(PositionZero);
  const [game, setGame] = useState<Game | undefined>()
  const columnCount = useMemo(() => 10, []);
  const rowCount = useMemo(() => 25, []);

  const initializeGrid = useCallback(() => {
    const tempGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const row = [];
      for (let column = 0; column < columnCount; column++) row.push(undefined);
      tempGrid.push(row);
    }
    setGrid(tempGrid);
  }, [setGrid, columnCount, rowCount]);


  useEffect(() => {
    initializeGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentPosition = useCallback((x: number, y: number) => {
    setCurrentShapePosition([x, y])
  }, [setCurrentShapePosition]);

  const rotateLeft = useCallback((): void => {
    setCurrentShape(shape => {
      return shape?.rotateLeft();
    })
  }, [setCurrentShape]);

  const rotateRight = useCallback((): void => {
    setCurrentShape(shape => {
      return shape?.rotateRight();
    })
  }, [setCurrentShape]);

  const getColor = useCallback((x: number, y: number): string | undefined => {
    return getColorAction(x, y, grid, currentShape, currentShapePosition);
  }, [grid, currentShape, currentShapePosition])

  const initializeNewCurrentShape = useCallback((): void => {
    return initializeNewCurrentShapeAction(getRandomShape(), setCurrentShape, setCurrentPosition, columnCount);
  }, [setCurrentShape, setCurrentPosition, columnCount]);

  const canMoveLeft = useCallback((): boolean => {
    return canMoveLeftAction(currentShape, currentShapePosition, grid);
  }, [currentShape, currentShapePosition, grid])

  const moveLeft = useCallback((): void => {
    if (canMoveLeft())
      return moveLeftAction(currentShapePosition, setCurrentPosition);
  }, [canMoveLeft, currentShapePosition, setCurrentPosition]);

  const canMoveRight = useCallback((): boolean => {
    return canMoveRightAction(currentShape, currentShapePosition, grid, columnCount);
  }, [currentShape, currentShapePosition, grid, columnCount]);


  const moveRight = useCallback((): void => {
    if (canMoveRight())
      return moveRightAction(currentShapePosition, setCurrentPosition);
  }, [canMoveRight, currentShapePosition, setCurrentPosition]);

  const canMoveDown = useCallback((): boolean => {
    return canMoveDownAction(currentShape, currentShapePosition, grid, rowCount);
  }, [currentShape, currentShapePosition, grid, rowCount]);

  const lockShape = useCallback((): void => {
    return lockShapeAction(currentShape, currentShapePosition, grid);
  }, [currentShapePosition, grid, currentShape])

  const moveDown = useCallback((): void => {
    if (!canMoveDown()) {
      lockShape();
      initializeNewCurrentShape();
      return;
    }
    moveDownAction(currentShapePosition, setCurrentPosition);
  }, [canMoveDown, lockShape, initializeNewCurrentShape, currentShapePosition, setCurrentPosition]);


  const startNewGame = useCallback(() => {
    setGame(new Game());
    initializeNewCurrentShape();
    const interval = setInterval(() => moveDown(), 300);
  }, [setGame, initializeNewCurrentShape]);


  // useEffect(() => {
  //   if(!game) return;
  //   const interval = setInterval(() => moveDown(), 300);
  //   return () => clearInterval(interval);
  // }, [game, moveDown])

  return <GameContext.Provider
    value={
      {
        grid: grid,
        currentShape: currentShape,
        currentShapePosition: currentShapePosition,
        getColor: getColor,
        moveDown: moveDown,
        moveLeft: moveLeft,
        moveRight: moveRight,
        lockShape: lockShape,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
        startNewGame: startNewGame
      }
    }>
    {props.children}
  </GameContext.Provider>;
}

const useGame = () => useContext(GameContext);

export {GameContextProvider, useGame};