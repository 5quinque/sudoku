// @format

// prettier-ignore
const startingPuzzle = [
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

let tempPuzzle = startingPuzzle;

let movingForward = true;

let loops = 0;

for (let i = 0; i < startingPuzzle.length; i++) {
  loops++;
  if (loops > 14000) {
    console.log('Too many loops');
    break;
  }
  // Skip default tiles
  if (
    tempPuzzle[i] !== 0 &&
    tempPuzzle[i] === startingPuzzle[i] &&
    !movingForward
  ) {
    i -= 2;
    tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
  }
  if (tempPuzzle[i] !== 0 && tempPuzzle[i] === startingPuzzle[i]) continue;

  // Increment our current tile
  //isStarValid(i, tempPuzzle);
  movingForward = incrementTile(tempPuzzle, i);

  //
  if (!movingForward) {
    // Move back two spaces
    i -= 2;
    tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
  }
}

let line;
for (let i = 0; i < tempPuzzle.length; i++) {
  if (i % 9 == 0) {
    console.log(`${line}\n`);
    line = '';
  }

  line += `${tempPuzzle[i]} `;
}

function incrementTile(tempPuzzle, i) {
  tempPuzzle[i]++;

  if (tempPuzzle[i] > 9) {
    tempPuzzle[i] = 0;
    return false;
  }

  while (!isStarValid(i, tempPuzzle) && tempPuzzle[i] < 9) tempPuzzle[i]++;

  if (!isStarValid(i, tempPuzzle)) {
    tempPuzzle[i] = 0;
    return false;
  } else {
    return true;
  }
}

function clearAhead(element, index) {
  const startingPuzzle = this[0];
  const greaterThan = this[1];

  if (index < greaterThan || startingPuzzle[index] !== 0) return element;

  return 0;
}

function isStarValid(i, tempPuzzle) {
  // Get the row and column index
  const rowIndex = Math.floor(i / 9) + 1;
  const colIndex = i % 9 + 1;
  // Using the above values, calculate the square index
  const colO3 = Math.ceil(colIndex / 3);
  const rowT3 = (Math.ceil(rowIndex / 3) - 1) * 3;
  const squareIndex = rowT3 + colO3;

  // Filter the row, column and 3x3 square from our puzzle array
  let rowValues = tempPuzzle.filter(isRow, rowIndex);
  let colValues = tempPuzzle.filter(isCol, colIndex);
  let squareValues = getSquare(squareIndex, tempPuzzle);

  // Remove all '0's
  rowValues = rowValues.filter(removeZero);
  colValues = colValues.filter(removeZero);
  squareValues = squareValues.filter(removeZero);

  // Check if we have any duplicates
  if (
    hasDuplicateValue(rowValues) ||
    hasDuplicateValue(colValues) ||
    hasDuplicateValue(squareValues)
  )
    return false;
  return true;
}

function removeZero(element) {
  return element !== 0;
}

function isRow(element, index) {
  return Math.floor(index / 9) + 1 == this;
}

function isCol(element, index) {
  return index % 9 + 1 == this;
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
    if (unit[i] === unit[i + 1]) return true;
  return false;
}
