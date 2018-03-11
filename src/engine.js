// @format

'use strict';

// It's called engine, because it drives it all
class Engine {
  constructor(sudoku) {
    this.sudoku = sudoku;
  }

  generateNewPuzzle() {
    let startingPuzzle, solvedPuzzle, finalPuzzle;
    let uniquePuzzle = false;

    while (!solvedPuzzle) {
      startingPuzzle = this.createPuzzleTemplate();
      solvedPuzzle = this.solvePuzzle(startingPuzzle);
    }

    finalPuzzle = solvedPuzzle.slice(0);

    uniquePuzzle = this.shrinkPuzzle(finalPuzzle, solvedPuzzle);

    while (!uniquePuzzle) {
      finalPuzzle = this.generateNewPuzzle();
    }

    this.consoleLogPuzzle(solvedPuzzle);
    return finalPuzzle;
  }

  shrinkPuzzle(finalPuzzle, solvedPuzzle) {
    let tempSolved;
    for (let i = 0; i < 45; i++) {
      this.removeTile(finalPuzzle);
    }

    tempSolved = this.solvePuzzle(finalPuzzle);

    return this.compareArrays(tempSolved, solvedPuzzle);
  }

  compareArrays(x, y) {
    for (let i = 0; i < x.length; i++) {
      if (x[i] !== y[i]) {
        return false;
      }
    }
    return true;
  }

  removeTile(finalPuzzle) {
    let removeIndex;
    do removeIndex = Math.floor(Math.random() * 80);
    while (finalPuzzle[removeIndex] == 0);
    finalPuzzle[removeIndex] = 0;
  }

  solvePuzzle(startingPuzzle) {
    let movingForward = true;
    let loops = 0;
    let validMoves = this.createValidMoves();
    let tempPuzzle = startingPuzzle.slice(0);

    for (let i = 0; i < startingPuzzle.length; i++) {
      if (loops++ > 250) return false;

      // Skip default tiles
      if (startingPuzzle[i] != 0 && !movingForward) {
        i -= 2;
        tempPuzzle = tempPuzzle.map(this.clearAhead, [startingPuzzle, i + 2]);
        continue;
      }
      if (startingPuzzle[i] != 0) continue;

      movingForward = this.incrementTile(tempPuzzle, i, validMoves);

      if (!movingForward) {
        // Move back two spaces
        i -= 2;
        tempPuzzle = tempPuzzle.map(this.clearAhead, [startingPuzzle, i + 2]);
      }
    }

    return tempPuzzle;
  }

  createValidMoves() {
    let validMoves = {};
    for (let i = 0; i < 81; i++) validMoves[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return validMoves;
  }

  consoleLogPuzzle(tempPuzzle) {
    let line = '';
    for (let i = 0; i < tempPuzzle.length + 1; i++) {
      if (i % 9 == 0) {
        console.log(`${line}`);
        line = '';
      }

      line += `${tempPuzzle[i]} `;
    }
  }

  incrementTile(tempPuzzle, i, validMoves) {
    let validIndex;

    do {
      validIndex = Math.floor(Math.random() * validMoves[i].length);
      tempPuzzle[i] = validMoves[i][validIndex];
      validMoves[i].splice(validIndex, 1);
    } while (!this.isStarValid(i, tempPuzzle) && validMoves[i].length > 0);

    // If we have exhausted the valid moves and we're still not valid
    if (!this.isStarValid(i, tempPuzzle)) {
      tempPuzzle[i] = 0;
      validMoves[i] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      return false;
    }

    return true;
  }

  createPuzzleTemplate() {
    let p = [];
    const self = this;
    // Create array full of '0's
    for (let i = 0; i < 81; i++) p[i] = 0;

    // Fill our the first 3x3 box (First row, first column)
    [0, 1, 2, 9, 10, 11, 18, 19, 20].forEach(function(i) {
      p[i] = self.getRandomInt(p);
    });

    // Fill the second 3x3 box (Second row, second column)
    [30, 31, 32, 39, 40, 41, 48, 49, 50].forEach(function(i) {
      p[i] = self.getRandomInt(p.slice(30, 50));
    });

    // Fill our final 3x3 box (Third row, third column)
    [60, 61, 62, 69, 70, 71, 78, 79, 80].forEach(function(i) {
      p[i] = self.getRandomInt(p.slice(60, 80));
    });

    return p;
  }

  getRandomInt(p) {
    let i;
    do i = Math.floor(Math.random() * 9) + 1;
    while (p.indexOf(i) != -1);
    return i;
  }

  clearAhead(element, index) {
    const startingPuzzle = this[0];
    const greaterThan = this[1];

    if (index < greaterThan) return element;

    return startingPuzzle[index];
  }

  isStarValid(i, tempPuzzle) {
    // Get the row and column index
    const rowIndex = Math.floor(i / 9) + 1;
    const colIndex = i % 9 + 1;
    // Using the above values, calculate the square index
    const colO3 = Math.ceil(colIndex / 3);
    const rowT3 = (Math.ceil(rowIndex / 3) - 1) * 3;
    const squareIndex = rowT3 + colO3;

    // Filter the row, column and 3x3 square from our puzzle array
    let rowValues = tempPuzzle.filter(this.isRow, rowIndex);
    let colValues = tempPuzzle.filter(this.isCol, colIndex);
    let squareValues = this.getSquare(this.squareIndex, tempPuzzle);

    // Remove all '0's
    rowValues = rowValues.filter(this.removeZero);
    colValues = colValues.filter(this.removeZero);
    squareValues = squareValues.filter(this.removeZero);

    // Check if we have any duplicates
    if (
      this.hasDuplicateValue(rowValues) ||
      this.hasDuplicateValue(colValues) ||
      this.hasDuplicateValue(squareValues)
    )
      return false;
    return true;
  }

  removeZero(element) {
    return element !== 0;
  }

  isRow(element, index) {
    return Math.floor(index / 9) + 1 == this;
  }

  isCol(element, index) {
    return index % 9 + 1 == this;
  }

  getSquare(i, puzzleArray) {
    const x = this.getStartingCol(i);
    const y = this.getStartingRow(i);
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

  getStartingCol(i) {
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

  getStartingRow(i) {
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

  hasDuplicateValue(unit) {
    unit.sort();
    for (let i = 0; i < unit.length; i++)
      if (unit[i] === unit[i + 1]) return true;
    return false;
  }
}

export default Engine;
