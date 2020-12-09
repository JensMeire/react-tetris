import {generateUniqueID} from "web-vitals/dist/lib/generateUniqueID";

export default class Game {
  private id: string;
  private startDate: Date;
  private endDate: Date | undefined;
  private score: number;
  private grid: Array<Array<string | undefined>>;

  constructor() {
    this.id = generateUniqueID();
    this.startDate = new Date();
    this.endDate = undefined;
    this.score = 0;
    this.grid = []
  }
}