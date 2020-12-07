import IShape from "infrastructure/shape/IShape";
import {generateUniqueID} from "web-vitals/dist/lib/generateUniqueID";
import getRandomShape from "infrastructure/shape/ShapeFactory";

export default class Grid {
    private playField: Array<Array<boolean>>
    private currentShape: IShape | undefined;
    private currentShapePosition: [number, number];
    private readonly rowsCount: number;
    private readonly columnCount: number;

    constructor() {
        this.rowsCount = 40;
        this.columnCount = 10;
        this.playField = [];
        for (let row = 0; row < this.rowsCount; row++) {
            const row = [];
            for (let column = 0; column < this.columnCount; column++) row.push(true);
            this.playField.push(row);
        }
        this.currentShapePosition = [0, 0]
    }

    private setCurrentPosition(x: number, y: number) {
        this.currentShapePosition = [x, y];
    }

    private setNewCurrentShape(shape: IShape): void {
        this.currentShape = shape;
        const centerY = shape.grid.length;
        const centerX = Math.floor((this.columnCount - shape.grid[0].length) / 2);
        this.setCurrentPosition(centerX, centerY);
    }

    private moveLeft(): void {

    }

    private moveDown(): void {

    }
}