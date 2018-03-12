// @format
'use strict';

class Input {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.addButtonListeners();
  }

  addInputListeners() {
    const self = this;
    const inputs = document.querySelectorAll(
      '.ninexnine_wrapper > div > input',
    );

    // Loop through all inputs adding event listeners
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function() {
        // Everytime the value is updated check if it's valid
        self.checkValid(this);
      });
      inputs[i].addEventListener('focus', function() {
        // Store the box value for comparison when it's updated
        self.storeBoxValue(this);
      });
    }
  }

  deleteInputListeners() {
    const self = this;
    const inputs = document.querySelectorAll(
      '.ninexnine_wrapper > div > input',
    );

    // Loop through all inputs adding event listeners
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].removeEventListener('input', function() {
        // Everytime the value is updated check if it's valid
        self.checkValid(this);
      });
      inputs[i].removeEventListener('focus', function() {
        // Store the box value for comparison when it's updated
        self.storeBoxValue(this);
      });
    }
  }

  addButtonListeners() {
    const self = this;
    let buttonRunning = false;

    // Add event listeners for buttons
    let solveEl = document.getElementsByClassName('btn-solve')[0];
    solveEl.addEventListener('click', function() {
      if (!buttonRunning) {
        buttonRunning = true;
        self.sudoku.solver.solve().then(v => {
          buttonRunning = false;
        });
      }
    });

    let newEl = document.getElementsByClassName('btn-new')[0];
    newEl.addEventListener('click', function() {
      if (!buttonRunning) {
        buttonRunning = true;
        self.sudoku.newPuzzle();
        buttonRunning = false;
      }
    });
  }

  // move to error.js?
  checkValid(el) {
    let tempRow, tempCol;
    let tempEl, rowEl, colEl;

    const row = /row(\d)/.exec(el.parentElement.classList);
    const col = /col(\d)/.exec(el.parentElement.classList);

    const square = this.sudoku.engine.getSquareIndex(row[1], col[1]);

    // Check rows/cols if valid and apply/remove .error classes
    for (let i = 1; i <= 9; i++) {
      rowEl = document.getElementsByClassName(`${row[0]} col${i}`)[0];
      colEl = document.getElementsByClassName(`row${i} ${col[0]}`)[0];
      this.sudoku.error.applyErrorClass(rowEl);
      this.sudoku.error.applyErrorClass(colEl);
    }

    // Check if square is valid and apply/remove .error classes
    const x = this.sudoku.engine.getStartingCol(square) + 1;
    const y = this.sudoku.engine.getStartingRow(square) + 1;

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        tempEl = document.getElementsByClassName(`row${j} col${i}`)[0];
        this.sudoku.error.applyErrorClass(tempEl);
      }
    }

    return true;
  }

  /**
   *
   * @description Store the value of of box, for future comparison
   * @returns {undefined}
   */
  storeBoxValue(el) {
    const key = el.parentElement.classList[0] + el.parentElement.classList[1];

    if (el.value) {
      this.sudoku.currentValues[key] = el.value;
    }
  }
}

export default Input;
