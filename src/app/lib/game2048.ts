export enum Direction {
  Up, Down, Left, Right
}

const DEFAULT_GRID: string = "16";

export class Game2048 {
  private grid: number[] = [];
  private points: number = 0;
  private GAMEOVER_STATE: boolean = null;

  constructor(grid: string = DEFAULT_GRID) {
    if (grid === DEFAULT_GRID || grid.length !== 16) {
      this.grid = Array(16).fill(0);
      this.addNumberToGrid();
      this.addNumberToGrid();
    } else {
      for (let i = 0; i < grid.length; i++) {
        this.grid.push(Number(grid[i]));
      }
    }
  }

  public getBoardArray(): number[] {
    return this.grid;
  }

  public getBoardAscii(): string {
    return `
    ${this.grid[0]} ${this.grid[1]} ${this.grid[2]} ${this.grid[3]}
    ${this.grid[4]} ${this.grid[5]} ${this.grid[6]} ${this.grid[7]}
    ${this.grid[8]} ${this.grid[9]} ${this.grid[10]} ${this.grid[11]}
    ${this.grid[12]} ${this.grid[13]} ${this.grid[14]} ${this.grid[15]}
    `;
  }

  public getBoardString(): string {
    let grid = "";
    this.grid.forEach(i => grid += i);
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
        grid = this.setRow(grid, 0, this.squashSet(this.getRow(grid, 0)));
        grid = this.setRow(grid, 1, this.squashSet(this.getRow(grid, 1)));
        grid = this.setRow(grid, 2, this.squashSet(this.getRow(grid, 2)));
        grid = this.setRow(grid, 3, this.squashSet(this.getRow(grid, 3)));
        break;
      };
      case Direction.Right: {
        grid = this.setRow(grid, 0, this.squashSet(this.getRow(grid, 0).reverse()).reverse());
        grid = this.setRow(grid, 1, this.squashSet(this.getRow(grid, 1).reverse()).reverse());
        grid = this.setRow(grid, 2, this.squashSet(this.getRow(grid, 2).reverse()).reverse());
        grid = this.setRow(grid, 3, this.squashSet(this.getRow(grid, 3).reverse()).reverse());
        break;
      };
      case Direction.Up: {
        grid = this.setCol(grid, 0, this.squashSet(this.getCol(grid, 0)));
        grid = this.setCol(grid, 1, this.squashSet(this.getCol(grid, 1)));
        grid = this.setCol(grid, 2, this.squashSet(this.getCol(grid, 2)));
        grid = this.setCol(grid, 3, this.squashSet(this.getCol(grid, 3)));
        break;
      };
      case Direction.Down: {
        grid = this.setCol(grid, 0, this.squashSet(this.getCol(grid, 0).reverse()).reverse());
        grid = this.setCol(grid, 1, this.squashSet(this.getCol(grid, 1).reverse()).reverse());
        grid = this.setCol(grid, 2, this.squashSet(this.getCol(grid, 2).reverse()).reverse());
        grid = this.setCol(grid, 3, this.squashSet(this.getCol(grid, 3).reverse()).reverse());
        break;
      };
    }
    this.points += this.getRoundScore(grid, this.grid);
    this.grid = grid;
    if (oldGridString == this.getBoardString()) {
      if (this.isLoss(this.grid)) {
        this.GAMEOVER_STATE = false;
      }
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
    return score;
  }

  private getCol(grid, intIndex) {
    return [
      grid[0 + intIndex],
      grid[4 + intIndex],
      grid[8 + intIndex],
      grid[12 + intIndex],
    ]
  }

  private getRow(grid: number[], intIndex) {
    let rowItem = 4 * intIndex;
    return [
      grid[0 + rowItem],
      grid[1 + rowItem],
      grid[2 + rowItem],
      grid[3 + rowItem],
    ];
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
      if (g[0] === g[1] || g[0] === g[4]
        || g[1] === g[2] || g[1] === g[5]
        || g[2] === g[3] || g[2] === g[6]
                        || g[3] === g[7]
        || g[4] === g[5] || g[4] === g[8]
        || g[5] === g[6] || g[5] === g[9]
        || g[6] === g[7] || g[6] === g[10]
                        || g[7] === g[11]
        || g[8] === g[9] || g[8] === g[12]
        || g[9] === g[10] || g[9] === g[13]
        || g[10] === g[11] || g[10] === g[14]
                          || g[11] === g[15]
        || g[12] === g[13]
        || g[13] === g[14]
        || g[14] === g[15]) {
        return false;
      }
      return true;
    }
    return false;
  }

  private setCol(grid: number[], intIndex: number, cells: number[]) {
    grid[intIndex + 0] = cells[0];
    grid[intIndex + 4] = cells[1];
    grid[intIndex + 8] = cells[2];
    grid[intIndex + 12] = cells[3];
    return grid;
  }

  private setRow(grid: number[], intIndex: number, cells: number[]) {
    grid[intIndex * 4 + 0] = cells[0];
    grid[intIndex * 4 + 1] = cells[1];
    grid[intIndex * 4 + 2] = cells[2];
    grid[intIndex * 4 + 3] = cells[3];
    return grid;
  }

  private squashSet(cells: number[]): number[] {
    cells = cells.filter(i => i !== 0);
    cells.push(...Array(4 - cells.length).fill(0));
    let [cellA, cellB, cellC, cellD] = cells;

    let newSet: number[] = [cellA, cellB, cellC, cellD];
    if (cellA === cellB && cellC === cellD) {
      newSet = [cellA + cellB, cellC + cellD];
    } else if (cellA === cellB) {
      newSet = [cellA + cellB, cellC, cellD];
    } else if (cellB === cellC) {
      newSet = [cellA, cellB + cellC, cellD];
    } else if (cellC === cellD) {
      newSet = [cellA, cellB, cellC + cellD];
    }
    newSet.push(...Array(4 - newSet.length).fill(0));
    return newSet;
  }
}
