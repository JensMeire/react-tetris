import IShape from "infrastructure/shape/IShape";

export default interface IShapeQueueModule {
  getCurrentShape: () => IShape;
  getNextShape: () => IShape;
  subscribeQueueChanged: (cb: (shapes?: [IShape, IShape]) => void) => string;
  unsubscribeQueueChanged: (subscriptionId: string) => void;
  shiftShapes: () => void;
}