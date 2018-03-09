// @format

// prettier-ignore
const p = [
  7, 1, 0, 0, 0, 9, 0, 0, 6,
  0, 5, 0, 0, 0, 0, 2, 7, 0,
  0, 0, 2, 0, 7, 3, 0, 0, 1,
  0, 0, 0, 0, 2, 0, 1, 9, 0,
  0, 0, 9, 4, 0, 0, 7, 0, 3,
  4, 7, 0, 0, 0, 1, 6, 0, 0,
  0, 3, 0, 6, 0, 0, 0, 1, 0,
  6, 0, 0, 0, 0, 0, 0, 8, 2,
  2, 0, 7, 1, 8, 0, 0, 0, 0,
];

const i = 7;

const row = Math.floor(i / 9) + 1;
const col = i % 9 + 1;

const rowResult = p.filter(isRow);
const colResult = p.filter(isCol);

const tempCol = Math.ceil(col / 3);
const tempRow = (Math.ceil(row / 3) - 1) * 3;
const square = tempRow + tempCol;

const squareResult = getSquare(square, p);

if (hasDuplicateValue(rowResult)) console.log('Row has duplicate value');

if (hasDuplicateValue(colResult)) console.log('Col has duplicate value');

if (hasDuplicateValue(squareResult)) console.log('Square has duplicate value');

function isRow(value, index) {
  return Math.floor(index / 9) + 1 == row;
}

function isCol(value, index) {
  return index % 9 + 1 == col;
}

function getSquare(i, puzzleArray) {
  const x = getStartingCol(i);
  const y = getStartingRow(i);
  let index;
  let squareArray = [];

  for (let i = x; i < x + 3; i++) {
    for (let j = y; j < y + 3; j++) {
      index = j * 9 + i;
      squareArray.push(puzzleArray[index]);
    }
  }

  return squareArray;
}

function getStartingCol(i) {
  let x;
  switch (i % 3) {
    case 1:
      x = 0;
      break;
    case 2:
      x = 3;
      break;
    case 0:
      x = 6;
      break;
  }
  return x;
}

function getStartingRow(i) {
  let y;
  if (i < 4) {
    y = 0;
  } else if (i < 7) {
    y = 3;
  } else {
    y = 6;
  }
  return y;
}

function hasDuplicateValue(unit) {
  unit.sort();
  for (let i = 0; i < unit.length; i++)
    if (unit[i] === unit[i + 1]) return false;
  return true;
}
