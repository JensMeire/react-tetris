import IShape from "infrastructure/shape/IShape";
import {createContext, useState} from "react";
import Game from "infrastructure/game/Game";

type Color = string | undefined
type Grid = Array<Array<Color>>
type Position = [number, number];
const EmptyGrid = [] as Grid;
const PositionZero = [0, 0] as Position;
const EmptyShape = {} as IShape;


interface IGameContext {
  grid: Grid;
  currentShape: IShape;
  currentShapePosition: Position;
  getColor: () => Color;
  initializeNewShape: () => void;
  canGoDow: () => boolean;
  moveDown: () => void;
  canGoLeft: () => boolean;
  goLeft: () => void;
  canGoRight: () => boolean;
  goRight: () => void;
  lockShape: () => void;
}

const GameContext = createContext<IGameContext>({
  grid: EmptyGrid,
  currentShape: EmptyShape,
  currentShapePosition: PositionZero,
  getColor: () => {
  },
  initializeNewShape: () => {
  },
  canGoDow: () => {
  },
  moveDown: () => {
  },
  canGoLeft: () => {
  },
  goLeft: () => {
  },
  canGoRight: () => {
  },
  goRight: () => {
  },
  lockShape: () => {
  }
} as IGameContext)

interface IProps {

}


const GameContextProvider = (props: IProps) => {
  const [grid, setGrid] = useState<Grid>(EmptyGrid);
  const [currentShape, setCurrentShape] = useState<IShape>(EmptyShape);
  const [currentShapePosition, setCurrentShapePosition] = useState<Position>(PositionZero);
}