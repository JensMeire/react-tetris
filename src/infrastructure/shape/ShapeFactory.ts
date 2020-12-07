import LineShape from "./LineShape";
import LShape from "./LShape";
import ReversedLShape from "./ReversedLShape";
import SquareShape from "./SquareShape";
import TShape from "./TShape";
import ZShape from "./ZShape";
import ReversedZShape from "./ReversedZShape";
import IShape from "./IShape";

const availableShapes: Array<() => IShape> = [
  () => new LineShape(),
  () => new LShape(),
  () => new ReversedLShape(),
  () => new SquareShape(),
  () => new TShape(),
  () => new ZShape(),
  () => new ReversedZShape()
];

const getRandomShape = (): IShape => {
  const random = Math.floor(Math.random() * availableShapes.length);
  return availableShapes[random]();
};

export default getRandomShape;