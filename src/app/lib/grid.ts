import { GridItem } from './grid-item';

export class Grid {
  private grid: Array<GridItem[]>;

  constructor(private intRows: number = 4, private intColumns: number = 4) {
    let grid = Array<GridItem[]>();
    let row: Array<GridItem> = Array(intRows).fill(new GridItem(0));
    for (let i = 0; i < intColumns; i++) {
      grid.push([...row]);
    }
    this.grid = grid;
  }

  public addNewNumber(): void {
    let randomLevel = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    let randomIndex = this.getRandomAvailableItem();
    if (randomIndex) {
      this.grid[randomIndex[0]][randomIndex[1]] = new GridItem(randomLevel);
    }
  }

  public mergeGridLeft(): void {
    for (let i = 0; i < this.intRows; i++) {
      this.mergeRowLeft(i);
    }
  }

  public mergeGridRight(): void {
    for (let i = 0; i < this.intRows; i++) {
      this.mergeRowRight(i);
    }
  }

  public mergeGridUp(): void {
    for (let i = 0; i < this.intColumns; i++) {
      this.mergeColumnUp(i);
    }
  }

  public mergeGridDown(): void {
    for (let i = 0; i < this.intColumns; i++) {
      this.mergeColumnDown(i);
    }
  }

  public toFlatArray(): Array<number> {
    let flatArray: Array<number> = [];
    this.grid.forEach(row => {
      row.forEach(item => {
        flatArray.push(item.getLevel());
      })
    });
    return flatArray;
  }

  private getRandomAvailableItem(): Array<number>|boolean {
    let availableCells = [];
    this.grid.forEach((row: Array<GridItem>, rowIndex) => {
      row.forEach((item: GridItem, columnIndex) => {
        if (item.getLevel() === 0) {
          availableCells.push([rowIndex, columnIndex]);
        }
      });
    });
    let maxIndex = (availableCells.length > 0) ? availableCells.length - 1 : 0;
    let randomIndex = Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
    if (availableCells.length == 0) {
      return false;
    }
    return availableCells[randomIndex];
  }

  private getColumn(columnIndex: number): Array<GridItem> {
    let column: Array<GridItem> = [];
    for (let i = 0; i < this.intRows; i++) {
      column.push(this.grid[i][columnIndex]);
    }
    return column;
  }

  private getRow(rowIndex: number): Array<GridItem> {
    return this.grid[rowIndex];
  }

  private levelUpItem(columnIndex: number, rowIndex: number): void {
    this.grid[columnIndex][rowIndex].levelUp();
  }

  private mergeSetLeft(oldSet: Array<GridItem>): Array<GridItem> {
    console.log("old ", oldSet);
    let newSet: Array<GridItem> = [];
    for (let i = 0; i < oldSet.length; i++) {
      if (i + 1 === oldSet.length) {
        newSet.push(new GridItem(oldSet[i].getLevel()));
        continue;
      }
      // matching items are combined, then skip the next item
      if (oldSet[i] === oldSet[i + 1]) {
        oldSet[i].levelUp();
        newSet.push(new GridItem(oldSet[i].getLevel()));
        i++;
        continue;
      }
    }
    // fill newSet with new Grid Items at level 0
    let intAddZeroes: number = oldSet.length - newSet.length;
    for (let i = 0; i < intAddZeroes; i++) {
      newSet.push(new GridItem(0));
    }
    console.log("new ", newSet);
    return newSet;
  }

  private mergeColumnUp(columnIndex: number): void {
    let oldColumn: Array<GridItem> = this.getColumn(columnIndex);
    let newColumn: Array<GridItem> = this.mergeSetLeft(oldColumn);
    this.setColumn(columnIndex, newColumn);
  }

  private mergeColumnDown(columnIndex: number): void {
    let oldColumn: Array<GridItem> = this.getColumn(columnIndex);
    let newColumn: Array<GridItem> = this.mergeSetLeft(oldColumn.reverse());
    this.setColumn(columnIndex, newColumn);
  }

  private mergeRowLeft(rowIndex: number): void {
    let oldRow: Array<GridItem> = this.getRow(rowIndex);
    let newRow: Array<GridItem> = this.mergeSetLeft(oldRow);
    this.setRow(rowIndex, newRow);
  }

  private mergeRowRight(rowIndex: number): void {
    let oldRow: Array<GridItem> = this.getRow(rowIndex);
    let newRow: Array<GridItem> = this.mergeSetLeft(oldRow.reverse());
    this.setRow(rowIndex, newRow);
  }

  private setColumn(columnIndex: number, column: Array<GridItem>): void {
    for (let i = 0; i < this.intRows; i++) {
      this.grid[i][columnIndex] = column[i];
    }
  }

  private setRow(rowIndex: number, row: Array<GridItem>): void {
    this.grid[rowIndex] = row;
  }
}
