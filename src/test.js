// @format

let startingPuzzle, tempPuzzle;

while (!tempPuzzle) {
  startingPuzzle = createPuzzleTemplate();
  tempPuzzle = startingPuzzle.slice(0);
  tempPuzzle = solvePuzzle(tempPuzzle, startingPuzzle);
}

consoleLogPuzzle(startingPuzzle);
consoleLogPuzzle(tempPuzzle);

function solvePuzzle(tempPuzzle, startingPuzzle) {
  let movingForward = true;
  let loops = 0;
  for (let i = 0; i < startingPuzzle.length; i++) {
    if (loops++ > 300) return false;

    // Skip default tiles
    if (startingPuzzle[i] != 0 && !movingForward) {
      i -= 2;
      tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
      continue;
    }
    if (startingPuzzle[i] != 0) continue;

    movingForward = incrementTile(tempPuzzle, i);

    if (!movingForward) {
      // Move back two spaces
      i -= 2;
      tempPuzzle = tempPuzzle.map(clearAhead, [startingPuzzle, i + 2]);
    }
  }
  return tempPuzzle;
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
