export default interface IShape {
  getSize: () => [number, number];
  getGrid: () => Array<Array<boolean>>;
  getColor: () => string;
  rotateLeft: () => IShape;
  rotateRight: () => IShape;
}