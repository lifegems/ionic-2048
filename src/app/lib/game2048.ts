export enum Direction {
  Up, Down, Left, Right
}

const DEFAULT_COLS: number = 4;
const DEFAULT_ROWS: number = 4;

export class Game2048 {
  private grid: number[] = [];
  private points: number = 0;
  private GAMEOVER_STATE: boolean = null;

  constructor(private rows: number = DEFAULT_ROWS, private cols: number = DEFAULT_COLS, defaultSet: string = "") {
    if (rows === DEFAULT_ROWS && cols === DEFAULT_COLS) {
      this.grid = Array(rows * cols).fill(0);
      this.addNumberToGrid();
      this.addNumberToGrid();
    } else {
      for (let i = 0; i < rows * cols; i++) {
        this.grid.push(Number(defaultSet[i]));
      }
    }
  }

  public getBoardArray(): number[] {
    return this.grid;
  }

  public getBoardAscii(): string {
    let board = "";
    for (let i = 0; i < this.rows * this.cols; i++) {
      board += (this.grid[i] === 0) ? " " : this.grid[i];
      if ((i + 1) % this.cols === 0) {
        board += "\n";
      }
    }
    return board;
  }

  public getBoardString(): string {
    let grid = "0";
    this.grid.forEach(i => grid += `.${i}`);
    return grid;
  }

  public addNumberToGrid(): void {
    let randomIndex = this.getRandomEmptyIndex();
    if (randomIndex > -1) {
      let randomDigit = Math.floor(Math.random() * 2) + 1;
      this.grid[randomIndex] = randomDigit * 2;
    }
  }

  public GameOver(): boolean {
    return this.GAMEOVER_STATE;
  }

  public move(direction: Direction): void {
    let grid = [...this.getBoardArray()];
    let oldGridString = this.getBoardString();
    switch(direction) {
      case Direction.Left: {
        for (let i = 0; i < this.rows; i++) {
          grid = this.setRow(grid, i, this.squashSet(this.getRow(grid, i)));
        }
        break;
      };
      case Direction.Right: {
        for (let i = 0; i < this.rows; i++) {
          grid = this.setRow(grid, i, this.squashSet(this.getRow(grid, i).reverse()).reverse());
        }
        break;
      };
      case Direction.Up: {
        for (let i = 0; i < this.cols; i++) {
          grid = this.setCol(grid, i, this.squashSet(this.getCol(grid, i)));
        }
        break;
      };
      case Direction.Down: {
        for (let i = 0; i < this.cols; i++) {
          grid = this.setCol(grid, i, this.squashSet(this.getCol(grid, i).reverse()).reverse());
        }
        break;
      };
    }
    this.points += this.getRoundScore(grid, this.grid);
    this.grid = grid;
    if (this.isLoss(this.grid)) {
      this.GAMEOVER_STATE = false;
      return;
    }
    if (oldGridString == this.getBoardString()) {
      return;
    }
    this.addNumberToGrid();
  }

  public getPoints() {
    return this.points;
  }

  private getNumberScore(gridNew, gridOld, digit) {
    let count = gridNew.filter(c => c === digit).length - gridOld.filter(c => c === digit).length;
    return (count > 0) ? count * digit : 0;
  }

  private getRoundScore(gridNew, gridOld) {
    let score = 0;
    score += this.getNumberScore(gridNew, gridOld, 4);
    score += this.getNumberScore(gridNew, gridOld, 8);
    score += this.getNumberScore(gridNew, gridOld, 16);
    score += this.getNumberScore(gridNew, gridOld, 32);
    score += this.getNumberScore(gridNew, gridOld, 64);
    score += this.getNumberScore(gridNew, gridOld, 128);
    score += this.getNumberScore(gridNew, gridOld, 512);
    score += this.getNumberScore(gridNew, gridOld, 1024);
    score += this.getNumberScore(gridNew, gridOld, 2048);
    score += this.getNumberScore(gridNew, gridOld, 5096);
    score += this.getNumberScore(gridNew, gridOld, 11192);
    return score;
  }

  private getCol(grid, intIndex) {
    let col = [];
    for (let i = 0; i < this.rows; i++) {
      col.push(grid[i * this.cols + intIndex]);
    }
    return col;
  }

  private getRow(grid: number[], intIndex) {
    let row = [];
    for (let i = 0; i < this.cols; i++) {
      row.push(grid[i + this.cols * intIndex]);
    }
    return row;
  }

  private getRandomEmptyIndex(): number {
    let aEmptyIndex = [];
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i] === 0) {
        aEmptyIndex.push(i);
      }
    }
    if (aEmptyIndex.length > 0) {
      let randomIndex = Math.floor(Math.random() * (aEmptyIndex.length + 1));
      return aEmptyIndex[randomIndex];
    }
    return -1;
  }

  private isLoss(g: number[]): boolean {
    if (g.filter(c => c === 0).length === 0) {
      for (let i = 0; i < this.rows * this.cols; i++) {
        // check item to the right
        if (((i + 1) % this.cols !== 0) && ((i + 1) < this.rows * this.cols) && (g[i] === g[i + 1])) {
          return false;
        }
        // check item below
        if ((i + this.cols) < this.rows * this.cols && g[i] === g[i + this.cols]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  private setCol(grid: number[], intIndex: number, cells: number[]) {
    for (let i = 0; i < cells.length; i++) {
      grid[intIndex + i * this.rows] = cells[i];
    }
    return grid;
  }

  private setRow(grid: number[], intIndex: number, cells: number[]) {
    for (let i = 0; i < cells.length; i++) {
      grid[intIndex * this.cols + i] = cells[i];
    }
    return grid;
  }

  private squashSet(cells: number[]): number[] {
    let setLength = cells.length;
    cells = cells.filter(i => i !== 0);
    cells.push(...Array(setLength - cells.length).fill(0));

    let newSet = [];
    for (let i = 0; i < cells.length; i++) {
      if ((i + 1) < cells.length && cells[i] === cells[i + 1]) {
        newSet.push(cells[i] + cells[i + 1]);
        i = i + 1;
      } else {
        newSet.push(cells[i]);
      }
    }

    newSet.push(...Array(setLength - newSet.length).fill(0));
    return newSet;
  }
}
