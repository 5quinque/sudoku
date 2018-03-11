// @format

let startingPuzzle, solvedPuzzle, finalPuzzle;
let removeIndex;

while (!solvedPuzzle) {
  startingPuzzle = createPuzzleTemplate();
  solvedPuzzle = solvePuzzle(startingPuzzle);
}
finalPuzzle = solvedPuzzle.slice(0);

//consoleLogPuzzle(startingPuzzle);
consoleLogPuzzle(solvedPuzzle);

// remove 2, solve
// remove 1, solve
// remove 1, solve

do removeIndex = Math.floor(Math.random() * 80);
while (finalPuzzle[removeIndex] == 0);
finalPuzzle[removeIndex] = 0;

do removeIndex = Math.floor(Math.random() * 80);
while (finalPuzzle[removeIndex] == 0);
finalPuzzle[removeIndex] = 0;

consoleLogPuzzle(finalPuzzle);

x = solvePuzzle(finalPuzzle);

consoleLogPuzzle(x);

//if (JSON.stringify(x) == JSON.stringify(solvedPuzzle)) {
if (compareArrays(x, solvedPuzzle)) {
  console.log('Both the same :) ');
} else {
  console.log('Not the same..');
}

function compareArrays(x, y) {
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      console.log(`i: ${i}, x:${x[i]} y: ${y[i]}`);
      return false;
    }
  }
  return true;
}

//console.log('Hi');
//tempPuzzle = startingPuzzle.slice(0);
//tempPuzzle = solvePuzzle(tempPuzzle, startingPuzzle);
//consoleLogPuzzle(tempPuzzle);

function solvePuzzle(startingPuzzle) {
  let movingForward = true;
  let loops = 0;
  let validMoves = createValidMoves();
  let tempPuzzle = startingPuzzle.slice(0);

  for (let i = 0; i < startingPuzzle.length; i++) {
    if (loops++ > 250) return false;

    // Skip default tiles
    if (startingPuzzle[i] != 0 && !movingForward) {
      i -= 2;
      tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
      continue;
    }
    if (startingPuzzle[i] != 0) continue;

    movingForward = incrementTile(tempPuzzle, i, validMoves);

    if (!movingForward) {
      // Move back two spaces
      i -= 2;
      tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
    }
  }

  return tempPuzzle;
}

function createValidMoves() {
  let validMoves = {};
  for (let i = 0; i < 81; i++) validMoves[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return validMoves;
}

function consoleLogPuzzle(tempPuzzle) {
  let line = '';
  for (let i = 0; i < tempPuzzle.length + 1; i++) {
    if (i % 9 == 0) {
      console.log(`${line}`);
      line = '';
    }

    line += `${tempPuzzle[i]} `;
  }
}

function incrementTile(tempPuzzle, i, validMoves) {
  let validIndex;

  do {
    validIndex = Math.floor(Math.random() * validMoves[i].length);
    tempPuzzle[i] = validMoves[i][validIndex];
    validMoves[i].splice(validIndex, 1);
  } while (!isStarValid(i, tempPuzzle) && validMoves[i].length > 0);

  // If we have exhausted the valid moves and we're still not valid
  if (!isStarValid(i, tempPuzzle)) {
    tempPuzzle[i] = 0;
    validMoves[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return false;
  }

  return true;
}

function createPuzzleTemplate() {
  let p = [];
  // Create array full of '0's
  for (let i = 0; i < 81; i++) p[i] = 0;

  // Fill our the first 3x3 box (First row, first column)
  [0, 1, 2, 9, 10, 11, 18, 19, 20].forEach(function(i) {
    p[i] = getRandomInt(p);
  });

  // Fill the second 3x3 box (Second row, second column)
  [30, 31, 32, 39, 40, 41, 48, 49, 50].forEach(function(i) {
    p[i] = getRandomInt(p.slice(30, 50));
  });

  // Fill our final 3x3 box (Third row, third column)
  [60, 61, 62, 69, 70, 71, 78, 79, 80].forEach(function(i) {
    p[i] = getRandomInt(p.slice(60, 80));
  });

  return p;
}

function getRandomInt(p) {
  let i;
  do i = Math.floor(Math.random() * 9) + 1;
  while (p.indexOf(i) != -1);
  return i;
}

function clearAhead(element, index) {
  const startingPuzzle = this[0];
  const greaterThan = this[1];

  if (index < greaterThan) return element;

  return startingPuzzle[index];
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
