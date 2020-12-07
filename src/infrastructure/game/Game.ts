import Guid from "../Guid";

export default class Game {
  private id: string;
  private startDate: Date;
  private endDate: Date | undefined;
  private score: number;


  constructor() {
    this.id = Guid.newGuid();
    this.startDate = new Date();
    this.endDate = undefined;
    this.score = 0;
  }
}