import { Grid } from './grid';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Game2048 {
  private grid: Grid;

  /**
   * Establish a grid, but don't start a game. See newGame().
   */
  constructor() {}

  public newGame() {
    this.grid = new Grid(4, 4);
    this.grid.addNewNumber();
    this.grid.addNewNumber();
  }

  public getGridArray(): Array<number> {
    return this.grid.toFlatArray();
  }

  public getPoints() {
    return 0;
  }

  public merge(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        this.grid.mergeGridUp();
        break;
      case Direction.Down:
        this.grid.mergeGridDown();
        break;
      case Direction.Left:
        this.grid.mergeGridLeft();
        break;
      case Direction.Right:
        this.grid.mergeGridRight();
        break;
      default:
        break;
    }
  }
}
