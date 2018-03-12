/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @format



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
      uniquePuzzle = true;
    }

    //this.consoleLogPuzzle(finalPuzzle);
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
    const squareIndex = this.getSquareIndex(rowIndex, colIndex);

    // Filter the row, column and 3x3 square from our puzzle array
    let rowValues = tempPuzzle.filter(this.isRow, rowIndex);
    let colValues = tempPuzzle.filter(this.isCol, colIndex);
    let squareValues = this.getSquare(squareIndex, tempPuzzle);

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

  // Start of our filter functions
  removeZero(element) {
    return element !== 0;
  }
  isRow(element, index) {
    return Math.floor(index / 9) + 1 == this;
  }
  isCol(element, index) {
    return index % 9 + 1 == this;
  }
  // End of our filter function

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

  /**
   *
   * @description Get the starting column of a given square
   *  E.g, 1 = 1, 2 = 4, 3 =  7, 4 = 1
   * @returns int x
   */
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

  /**
   *
   * @description Get the starting row of a given square
   * @returns int y
   */
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

  getSquareIndex(row, col) {
    const tempRow = (Math.ceil(row / 3) - 1) * 3;
    const tempCol = Math.ceil(col / 3);
    const square = tempRow + tempCol;

    return square;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Engine);


/***/ }),

/***/ "./src/errorCheck.js":
/*!***************************!*\
  !*** ./src/errorCheck.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @format


class Error {
  constructor(sudoku) {
    this.sudoku = sudoku;
  }

  /**
   *
   * @description Check if a row is valid for given tile class
   * @returns {undefined}
   */
  isRowValid(elClass) {
    let isValid = true;
    let values = [];
    const matches = document.querySelectorAll(elClass);

    for (let el of matches) {
      if (!el.childNodes[0].value) continue;
      if (values.includes(el.childNodes[0].value)) {
        isValid = false;
        break;
      }
      values.push(el.childNodes[0].value);
    }

    return isValid;
  }

  isSquareValid(i) {
    let el;
    let values = [];

    // Get starting col
    let x = this.sudoku.engine.getStartingCol(i) + 1;
    // Get starting row
    let y = this.sudoku.engine.getStartingRow(i) + 1;

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        el = document.querySelector(`.col${i}.row${j}`);

        if (!el.childNodes[0].value) continue;
        if (values.includes(el.childNodes[0].value)) return false;

        values.push(el.childNodes[0].value);
      }
    }
    return true;
  }

  isBoxProblemSquare(i, value) {
    let el;
    let values = [];

    // Get starting col
    let x = this.sudoku.engine.getStartingCol(i) + 1;
    // Get starting row
    let y = this.sudoku.engine.getStartingRow(i) + 1;

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        el = document.querySelector('.col' + i + '.row' + j);

        if (!el.childNodes[0].value) continue;
        if (
          values.includes(el.childNodes[0].value) &&
          el.childNodes[0].value == value
        )
          return true;

        values.push(el.childNodes[0].value);
      }
    }
    return false;
  }

  isBoxProblemRow(elClass, value) {
    let values = [];
    const matches = document.querySelectorAll(elClass);

    for (let el of matches) {
      if (!el.childNodes[0].value) continue;
      if (
        values.includes(el.childNodes[0].value) &&
        el.childNodes[0].value == value
      )
        return true;

      values.push(el.childNodes[0].value);
    }

    return false;
  }

  /**
   *
   * @description Does the given tile have a duplicate
   * @returns {undefined}
   */
  isTileProblem(classList, value) {
    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.engine.getSquareIndex(row[1], col[1]);

    return (
      this.isBoxProblemRow(`.${row[0]}`, value) ||
      this.isBoxProblemRow(`.${col[0]}`, value) ||
      this.isBoxProblemSquare(square, value)
    );
  }

  /**
   *
   * @description Check row, col and 3x3 square for given tile
   * @returns {undefined}
   */
  isValidStar(classList) {
    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.engine.getSquareIndex(row[1], col[1]);

    return !(
      !this.isRowValid(`.${row[0]}`) ||
      !this.isRowValid(`.${col[0]}`) ||
      !this.isSquareValid(square)
    );
  }

  applyErrorClass(element) {
    if (this.isTileProblem(element.classList, element.childNodes[0].value)) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Error);


/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @format


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

/* harmony default export */ __webpack_exports__["default"] = (Input);


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sudoku_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sudoku.js */ "./src/sudoku.js");
// @format




var sud = new _sudoku_js__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./src/solver.js":
/*!***********************!*\
  !*** ./src/solver.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @format


class Solver {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.moveForward = true;
  }

  async solve() {
    let loops = 0;
    this.boxes = document.querySelector('.ninexnine_wrapper').childNodes;

    // Clear any user inputted values
    this.clearAhead(1);

    for (let i = 0; i < 80; i++) {
      // Skip over 'default' boxes
      if (this.boxes[i].classList.contains('default') && !this.moveForward) {
        i -= 2;
        this.clearAhead(i + 2);
        continue;
      }
      if (this.boxes[i].classList.contains('default')) {
        continue;
      }

      await this.slowSolve(i);
      //this.moveForward = this.incrementTile(this.boxes[i]);

      // If we're not moving forward we're moving back
      if (!this.moveForward) {
        i -= 2;
        this.clearAhead(i + 2);
      }
    }
  }

  // It looks pretty
  slowSolve(i, x) {
    let self = this;
    return new Promise(resolve =>
      setTimeout(function() {
        self.moveForward = self.incrementTile(self.boxes[i]);

        resolve();
      }, 0),
    );
  }

  incrementTile(boxEl) {
    if (parseInt(boxEl.childNodes[0].value)) {
      boxEl.childNodes[0].value++;
      if (boxEl.childNodes[0].value > 9) {
        boxEl.childNodes[0].value = '';
        return false;
      }
    } else {
      boxEl.childNodes[0].value = 1;
    }

    while (
      !this.sudoku.error.isValidStar(boxEl.classList) &&
      boxEl.childNodes[0].value < 9
    ) {
      boxEl.childNodes[0].value++;
    }

    if (!this.sudoku.error.isValidStar(boxEl.classList)) {
      boxEl.childNodes[0].value = '';
      return false;
    } else {
      return true;
    }
  }

  clearAhead(i) {
    for (; i < 81; i++) {
      if (this.boxes[i].classList.contains('default')) continue;
      this.boxes[i].childNodes[0].value = '';
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Solver);


/***/ }),

/***/ "./src/sudoku.js":
/*!***********************!*\
  !*** ./src/sudoku.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _errorCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorCheck.js */ "./src/errorCheck.js");
/* harmony import */ var _engine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine.js */ "./src/engine.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.js */ "./src/input.js");
/* harmony import */ var _solver_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solver.js */ "./src/solver.js");
// @format







class Sudoku {
  constructor() {
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    this.engine = new _engine_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.error = new _errorCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.solver = new _solver_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    this.input = new _input_js__WEBPACK_IMPORTED_MODULE_2__["default"](this);

    this.drawGame();

    this.input.addInputListeners();
  }

  drawGame() {
    const puzzle = this.engine.generateNewPuzzle();

    this.drawGrid();

    // add to DOM
    this.drawPuzzle(puzzle);
  }

  /**
   *
   * @description Add the divs to our grid
   * @returns {undefined}
   */
  drawGrid() {
    const puzzleWrapper = document.querySelector('.ninexnine_wrapper');

    // Rows
    for (let i = 1; i <= 9; i++) {
      // Columns
      for (let j = 1; j <= 9; j++) {
        puzzleWrapper.innerHTML += `<div class="row${i} col${j}"></div>`;
      }
    }
  }

  drawPuzzle(puzzle) {
    let col, row;

    for (let i = 0; i < 81; i++) {
      col = i % 9;
      row = Math.floor(i / 9);

      const el = document.querySelector(`.col${col + 1}.row${row + 1}`);
      if (puzzle[i]) {
        el.innerHTML = `<input type="text" value="${puzzle[i]}" disabled>`;
        el.classList.add('default');
      } else {
        el.innerHTML = '<input type="text">';
      }
    }
  }

  async newPuzzle() {
    const puzzleWrapper = document.querySelector('.ninexnine_wrapper');
    puzzleWrapper.innerHTML = '';

    this.input.deleteInputListeners();
    this.drawGame();
    this.input.addInputListeners();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Sudoku);


/***/ })

/******/ });
//# sourceMappingURL=main.js.map