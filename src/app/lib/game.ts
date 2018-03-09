export function addRandomNumber(grid) {
  let randomPiece = getRandomNumber(1, 2) * 2;
  let randomIndex = getNextCell(grid);
  if (randomIndex > -1) {
    grid[randomIndex] = randomPiece;
  }
  return grid;
}

export function getCellGroups(grid, blRows, blReverse) {
  let groups = [];
  for (let i = 1; i <= 4; i++) {
    let group = blRows ? getRow(grid, i) : getColumn(grid, i);
    groups.push(mergeFourCellsLeft(blReverse ? group.reverse() : group));
  }
  return groups;
}

export function getColumn(grid, columnNum) {
  switch (columnNum) {
    case 1: return [grid[0], grid[4], grid[8], grid[12]];
    case 2: return [grid[1], grid[5], grid[9], grid[13]];
    case 3: return [grid[2], grid[6], grid[10], grid[14]];
    case 4: return [grid[3], grid[7], grid[11], grid[15]];
  }
}

export function getRow(grid, rowNum) {
  switch(rowNum) {
    case 1: return [grid[0], grid[1], grid[2], grid[3]];
    case 2: return [grid[4], grid[5], grid[6], grid[7]];
    case 3: return [grid[8], grid[9], grid[10], grid[11]];
    case 4: return [grid[12], grid[13], grid[14], grid[15]];
  }
}

export function getNextCell(grid) {
  let availableCells = [];
  grid.forEach((c, i) => {
    if (c === 0) {
      availableCells.push(i);
    }
  });
  let maxIndex = (availableCells.length > 0) ? availableCells.length - 1 : 0;
  let randomIndex = getRandomNumber(0, maxIndex);
  if (availableCells.length == 0) {
    return -1;
  }
  return availableCells[randomIndex];
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function merge(grid: Number[], direction: string) {
  switch(direction) {
    case 'LEFT':
      return recombine(getCellGroups(grid, true, false), direction);
    case 'RIGHT':
      return recombine(getCellGroups(grid, true, true), direction);
    case 'UP':
      return recombine(getCellGroups(grid, false, false), direction);
    case 'DOWN':
      return recombine(getCellGroups(grid, false, true), direction);
  }
}

export function mergeFourCellsLeft(fourcells: Number[]) {
  fourcells = removeZeroesLeft(fourcells);
  let cellA = fourcells[0];
  let cellB = fourcells[1];
  let cellC = fourcells[2];
  let cellD = fourcells[3];
  let cells;

  if (cellA === cellB && cellC === cellD) {
    cells = [cellA + cellB, cellC + cellD, 0, 0];
  } else if (cellA === cellB && cellC !==  cellD) {
    cells = [cellA + cellB, cellC, cellD, 0];
  } else if (cellB === cellC) {
    cells = [cellA, cellB + cellC, cellD, 0];
  } else if (cellC === cellD) {
    cells = [cellA, cellB, cellC + cellD, 0];
  } else {
    cells = [cellA, cellB, cellC, cellD];
  }

  return removeZeroesLeft(cells);
}

export function recombine(group: any[], direction: string) {
  switch (direction) {
    case 'UP':
      return [
        group[0][0],group[1][0],group[2][0],group[3][0],
        group[0][1],group[1][1],group[2][1],group[3][1],
        group[0][2],group[1][2],group[2][2],group[3][2],
        group[0][3],group[1][3],group[2][3],group[3][3],
      ];
    case 'DOWN':
    return [
      group[0][3],group[1][3],group[2][3],group[3][3],
      group[0][2],group[1][2],group[2][2],group[3][2],
      group[0][1],group[1][1],group[2][1],group[3][1],
      group[0][0],group[1][0],group[2][0],group[3][0],
    ];
    case 'LEFT':
      return [
        ...group[0],
        ...group[1],
        ...group[2],
        ...group[3],
      ];
    case 'RIGHT':
      return [
        ...group[0].reverse(),
        ...group[1].reverse(),
        ...group[2].reverse(),
        ...group[3].reverse(),
      ];
    default:
      break;
  }
}

export function removeZeroesLeft(fourcells: Number[]) {
  let cells = fourcells.filter(c => c > 0);
  let zeroes = Array(4 - cells.length).fill(0);
  cells = [...cells, ...zeroes];
  return cells;
}

export function setupInitialCells(): Numer[] {
  let grid = Array(16).fill(0);
  grid = addRandomNumber(grid);
  grid = addRandomNumber(grid);
  return grid;
}
