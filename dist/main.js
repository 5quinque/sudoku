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
   * @description Check row, col and 3x3 square for given tile
   * @returns {undefined}
   */
  isValidStar(classList) {
    let isValid = true;

    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.getSquareIndex(classList);

    if (
      !this.isRowValid('.' + row[0]) ||
      !this.isRowValid('.' + col[0]) ||
      !this.isSquareValid(square)
    )
      isValid = false;

    return isValid;
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
    let x, y;
    let isValid = true;
    let values = [];

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (!el.childNodes[0].value) continue;
        if (values.includes(el.childNodes[0].value)) {
          isValid = false;
          break;
        }
        values.push(el.childNodes[0].value);
      }
    }
    return isValid;
  }

  isBoxProbemSquare(i, value) {
    let x, y;
    let isProblem = false;
    let values = [];

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (!el.childNodes[0].value) continue;
        if (values.includes(el.childNodes[0].value)) {
          if (el.childNodes[0].value == value) {
            isProblem = true;
            break;
          }
        }
        values.push(el.childNodes[0].value);
      }
    }
    return isProblem;
  }

  isBoxProblemRow(elClass, value) {
    let isProblem = false;
    let values = [];
    const matches = document.querySelectorAll(elClass);

    for (let el of matches) {
      if (!el.childNodes[0].value) continue;
      if (values.includes(el.childNodes[0].value)) {
        if (el.childNodes[0].value == value) {
          isProblem = true;
          break;
        }
      }
      values.push(el.childNodes[0].value);
    }

    return isProblem;
  }

  /**
   *
   * @description Is the given box an incorrect invalid
   * @returns {undefined}
   */
  isBoxProblem(classList, value) {
    let isProblem = false;

    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.getSquareIndex(classList);

    if (
      this.isBoxProblemRow('.' + row[0], value) ||
      this.isBoxProblemRow('.' + col[0], value) ||
      this.isBoxProbemSquare(square, value)
    )
      isProblem = true;

    return isProblem;
  }

  applyErrorClass(element) {
    if (this.isBoxProblem(element.classList, element.childNodes[0].value)) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
    }
  }

  /**
   *
   * @description Remove 'error' class from valid boxes on given line
   * @returns {undefined}
   */
  clearLine(rc, x, val) {
    const matches = document.querySelectorAll('.' + rc + x);

    for (let el of matches) {
      if (el.childNodes[0].value == val) {
        // Check if removal is valid..
        if (this.isValidStar(el.classList)) {
          el.classList.remove('error');
          //console.log("Valid square, removing error class", el.classList);
        } else {
          console.log('Still an error, not removing error class', el.classList);
        }
      }
    }
  }

  /**
   *
   * @description Remove 'error' calss from valid boxes on given square
   * @returns {undefined}
   */
  clearSquare(i, val) {
    let x, y;

    console.log('Clearing square');

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (el.childNodes[0].value == val && this.isValidStar(el.classList))
          el.classList.remove('error');
      }
    }
  }

  /**
   * [UNUSED]
   * @description Remove 'error' class from all divs in the grid
   * @returns {undefined}
   */
  clearErrors() {
    const tiles = document.querySelectorAll('.ninexnine_wrapper > *');

    for (let el of tiles) el.classList.remove('error');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Error);


/***/ }),

/***/ "./src/errorCheckArray.js":
/*!********************************!*\
  !*** ./src/errorCheckArray.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// @format


class ErrorArray {
  constructor(sudoku) {
    this.sudoku = sudoku;
  }

  /**
   *
   * @description Check row, col and 3x3 square for given tile
   * @returns {undefined}
   */
  isValidStar(tilePos) {
    let isValid = true;

    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.getSquareIndex(classList);

    if (
      !this.isRowValid('.' + row[0]) ||
      !this.isRowValid('.' + col[0]) ||
      !this.isSquareValid(square)
    )
      isValid = false;

    return isValid;
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
    let x, y;
    let isValid = true;
    let values = [];

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (!el.childNodes[0].value) continue;
        if (values.includes(el.childNodes[0].value)) {
          isValid = false;
          break;
        }
        values.push(el.childNodes[0].value);
      }
    }
    return isValid;
  }

  isBoxProbemSquare(i, value) {
    let x, y;
    let isProblem = false;
    let values = [];

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (!el.childNodes[0].value) continue;
        if (values.includes(el.childNodes[0].value)) {
          if (el.childNodes[0].value == value) {
            isProblem = true;
            break;
          }
        }
        values.push(el.childNodes[0].value);
      }
    }
    return isProblem;
  }

  isBoxProblemRow(elClass, value) {
    let isProblem = false;
    let values = [];
    const matches = document.querySelectorAll(elClass);

    for (let el of matches) {
      if (!el.childNodes[0].value) continue;
      if (values.includes(el.childNodes[0].value)) {
        if (el.childNodes[0].value == value) {
          isProblem = true;
          break;
        }
      }
      values.push(el.childNodes[0].value);
    }

    return isProblem;
  }

  /**
   *
   * @description Is the given box an incorrect invalid
   * @returns {undefined}
   */
  isBoxProblem(classList, value) {
    let isProblem = false;

    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);
    const square = this.sudoku.getSquareIndex(classList);

    if (
      this.isBoxProblemRow('.' + row[0], value) ||
      this.isBoxProblemRow('.' + col[0], value) ||
      this.isBoxProbemSquare(square, value)
    )
      isProblem = true;

    return isProblem;
  }

  applyErrorClass(element) {
    if (this.isBoxProblem(element.classList, element.childNodes[0].value)) {
      element.classList.add('error');
    } else {
      element.classList.remove('error');
    }
  }

  /**
   *
   * @description Remove 'error' class from valid boxes on given line
   * @returns {undefined}
   */
  clearLine(rc, x, val) {
    const matches = document.querySelectorAll('.' + rc + x);

    for (let el of matches) {
      if (el.childNodes[0].value == val) {
        // Check if removal is valid..
        if (this.isValidStar(el.classList)) {
          el.classList.remove('error');
          //console.log("Valid square, removing error class", el.classList);
        } else {
          console.log('Still an error, not removing error class', el.classList);
        }
      }
    }
  }

  /**
   *
   * @description Remove 'error' calss from valid boxes on given square
   * @returns {undefined}
   */
  clearSquare(i, val) {
    let x, y;

    console.log('Clearing square');

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        let el = document.querySelector('.col' + i + '.row' + j);
        if (el.childNodes[0].value == val && this.isValidStar(el.classList))
          el.classList.remove('error');
      }
    }
  }

  /**
   * [UNUSED]
   * @description Remove 'error' class from all divs in the grid
   * @returns {undefined}
   */
  clearErrors() {
    const tiles = document.querySelectorAll('.ninexnine_wrapper > *');

    for (let el of tiles) el.classList.remove('error');
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ErrorArray);


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

    this.addInputListeners();
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

    // Add event listeners for buttons
    let solveEl = document.getElementsByClassName('btn-solve')[0];
    solveEl.addEventListener('click', function() {
      self.sudoku.solver.solve();
    });

    let newEl = document.getElementsByClassName('btn-new')[0];
    newEl.addEventListener('click', function() {
      self.sudoku.newPuzzle();
    });
  }

  //
  checkValid(el) {
    let tempRow, tempCol;
    let tempEl, rowEl, colEl;
    const square = this.sudoku.getSquareIndex(el.parentElement.classList.value);

    // Check rows/cols if valid and apply/remove .error classes
    const row = /row(\d)/.exec(el.parentElement.classList);
    const col = /col(\d)/.exec(el.parentElement.classList);
    for (let i = 1; i <= 9; i++) {
      rowEl = document.getElementsByClassName(`${row[0]} col${i}`)[0];
      colEl = document.getElementsByClassName(`row${i} ${col[0]}`)[0];
      this.sudoku.error.applyErrorClass(rowEl);
      this.sudoku.error.applyErrorClass(colEl);
    }

    // Check if square is valid and apply/remove .error classes
    const x = this.sudoku.getStartingCol(square);
    const y = this.sudoku.getStartingRow(square);
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
    this.clearAhead(0);

    for (let i = 1; i < 82; i++) {
      loops++;
      if (loops > 985000) {
        console.log('Too many loops, exiting');
        break;
      }
      if (i < 0) {
        console.log('Not solvable?');
        return false;
      }

      //?
      if (!(i in this.boxes)) continue;

      // Skip over 'default' boxes
      if (this.boxes[i].classList.contains('default') && !this.moveForward) {
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i + 2);
        continue;
      }

      await this.func2(i);
      //this.moveForward = this.elSol(this.boxes[i]);

      if (!this.moveForward) {
        // Move back two spaces
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i + 2);
      }
    }

    console.log(`Completed in ${loops} loops`);
  }

  func2(i, x) {
    let self = this;
    return new Promise(resolve =>
      setTimeout(function() {
        self.moveForward = self.elSol(self.boxes[i]);

        resolve();
      }, 1),
    );
  }

  elSol(boxEl, x) {
    //let boxEl = document.querySelector(".row"+i+".col"+j);

    if (boxEl.classList.contains('default')) return true;

    if (parseInt(boxEl.childNodes[0].value)) {
      boxEl.childNodes[0].value++;
      if (boxEl.childNodes[0].value > 9) {
        boxEl.childNodes[0].value = '';
        return false;
      }
    } else {
      boxEl.childNodes[0].value = 1;
    }

    // When making array backtrack
    // /maybe/ insteadof ++ store array of values treied for each index
    // and randomly use one of them
    // will prob help with creating puzzle and finding unique solution
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
      let col = i % 9 + 1;
      let row = Math.floor(i / 9) + 1;
      let boxEl = document.querySelector('.row' + row + '.col' + col);

      if (boxEl.classList.contains('default')) continue;

      boxEl.childNodes[0].value = '';
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
/* harmony import */ var _errorCheckArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errorCheckArray.js */ "./src/errorCheckArray.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.js */ "./src/input.js");
/* harmony import */ var _solver_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./solver.js */ "./src/solver.js");
// @format







class Sudoku {
  constructor() {
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    this.drawGame();

    this.error = new _errorCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.solver = new _solver_js__WEBPACK_IMPORTED_MODULE_3__["default"](this);
    this.input = new _input_js__WEBPACK_IMPORTED_MODULE_2__["default"](this);
  }

  drawGame() {
    // check difficulty
    // create new puzzle
    const puzzle = this.getPuzzle();

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
        puzzleWrapper.innerHTML +=
          '<div class="row' + i + ' col' + j + '"></div>';
      }
    }
  }

  drawPuzzle(puzzle) {
    let col, row;

    for (let i = 0; i < 81; i++) {
      col = i % 9;
      row = Math.floor(i / 9);

      const el = document.querySelector(
        '.col' + (col + 1) + '.row' + (row + 1),
      );
      if (puzzle[i]) {
        el.innerHTML = '<input type="text" value="' + puzzle[i] + '" disabled>';
        el.classList.add('default');
      } else {
        el.innerHTML = '<input type="text">';
      }
    }
  }

  async newPuzzle() {
    const puzzleWrapper = document.querySelector('.ninexnine_wrapper');
    const puzzle = this.createPuzzle();

    puzzleWrapper.innerHTML = '';
    this.drawGrid();

    this.backSolvePuzzle(puzzle);

    //this.drawPuzzle(puzzle);
  }

  createPuzzle() {
    let p = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    p[0] = this.getRandomInt(p);
    p[1] = this.getRandomInt(p);
    p[2] = this.getRandomInt(p);

    p[9] = this.getRandomInt(p);
    p[10] = this.getRandomInt(p);
    p[11] = this.getRandomInt(p);

    p[18] = this.getRandomInt(p);
    p[19] = this.getRandomInt(p);
    p[20] = this.getRandomInt(p);

    p[30] = this.getRandomInt(p.slice(30, 50));
    p[31] = this.getRandomInt(p.slice(30, 50));
    p[32] = this.getRandomInt(p.slice(30, 50));

    p[39] = this.getRandomInt(p.slice(30, 50));
    p[40] = this.getRandomInt(p.slice(30, 50));
    p[41] = this.getRandomInt(p.slice(30, 50));

    p[48] = this.getRandomInt(p.slice(30, 50));
    p[49] = this.getRandomInt(p.slice(30, 50));
    p[50] = this.getRandomInt(p.slice(30, 50));

    p[60] = this.getRandomInt(p.slice(60, 80));
    p[61] = this.getRandomInt(p.slice(60, 80));
    p[62] = this.getRandomInt(p.slice(60, 80));

    p[69] = this.getRandomInt(p.slice(60, 80));
    p[70] = this.getRandomInt(p.slice(60, 80));
    p[71] = this.getRandomInt(p.slice(60, 80));

    p[78] = this.getRandomInt(p.slice(60, 80));
    p[79] = this.getRandomInt(p.slice(60, 80));
    p[80] = this.getRandomInt(p.slice(60, 80));

    return p;
  }

  getRandomInt(p) {
    let i;
    do i = Math.floor(Math.random() * 9) + 1;
    while (p.indexOf(i) != -1);
    return i;
  }

  getPuzzle() {
    //const p = [
    //  5, 3, 0, 0, 7, 0, 0, 0, 0,
    //  6, 0 ,0, 1, 9, 5, 0, 0, 0,
    //  0, 9, 8, 0, 0, 0, 0, 6, 0,
    //  8, 0, 0, 0, 6, 0, 0, 0, 3,
    //  4, 0, 0, 8, 0, 3, 0, 0, 1,
    //  7, 0, 0, 0, 2, 0, 0, 0, 6,
    //  0, 6, 0, 0, 0, 0, 2, 8, 0,
    //  0, 0, 0, 4, 1, 9, 0, 0, 5,
    //  0, 0, 0, 0, 8, 0, 0, 7, 9
    //];

    //const p = [
    //  7, 8, 9, 1, 2, 3, 4 ,5, 6,
    //  3, 0, 0, 0, 4, 0, 0, 0, 8,
    //  5, 0, 0, 0, 9, 0, 0, 0, 1,
    //  8, 0, 0, 0, 3, 0, 0, 0, 4,
    //  1, 2, 3, 4, 5, 6, 7, 8, 9,
    //  6, 0, 0, 0, 7, 0, 0, 0, 2,
    //  9, 0, 0, 0, 1, 0, 0, 0, 5,
    //  2, 0, 0, 0, 6, 0, 0, 0, 7,
    //  4, 5, 6, 7, 8, 9, 1, 2, 3
    //];

    //const p = [
    //  6, 0, 0, 0, 0, 0, 0, 0, 3,
    //  0, 0, 1, 0, 9, 0, 6, 0, 0,
    //  0, 5, 8, 0, 7, 0, 2, 4, 0,
    //  0, 0, 0, 7, 0, 1, 0, 0, 0,
    //  0, 8, 6, 0, 0, 0, 5, 7, 0,
    //  0, 0, 0, 6, 0, 9, 0, 0, 0,
    //  0, 6, 4, 0, 1, 0, 8, 2, 0,
    //  0, 0, 7, 0, 6, 0, 4, 0, 0,
    //  8, 0, 0, 0, 0, 0, 0, 0, 6
    //];

    //const p = [
    //  0, 0, 6, 3, 0, 0, 0, 0, 5,
    //  0, 5, 0, 0, 4, 0, 0, 9, 0,
    //  8, 0, 0, 0, 0, 9, 1, 0, 0,
    //  3, 0, 0, 0, 0, 1, 4, 0, 0,
    //  0, 6, 0, 0, 7, 0, 0, 2, 0,
    //  0, 0, 7, 5, 0, 0, 0, 0, 8,
    //  0, 0, 4, 9, 0, 0, 0, 0, 3,
    //  0, 1, 0, 0, 3, 0, 0, 6, 0,
    //  2, 0, 0, 0, 0, 8, 9, 0, 0
    //];

    //const p = [
    //  0, 0, 0, 0, 0, 0, 0, 0, 0,
    //  0, 0, 0, 0, 0, 3, 0, 8, 5,
    //  0, 0, 1, 0, 2, 0, 0, 0, 0,
    //  0, 0, 0, 5, 0, 7, 0, 0, 0,
    //  0, 0, 4, 0, 0, 0, 1, 0, 0,
    //  0, 9, 0, 0, 0, 0, 0, 0, 0,
    //  5, 0, 0, 0, 0, 0, 0, 7, 3,
    //  0, 0, 2, 0, 1, 0, 0, 0, 0,
    //  0, 0, 0, 0, 4, 0, 0, 0, 9
    //];

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

    return p;
  }
  /**
   *
   *
   * @returns {undefined}
   */
  checkEverything() {
    let isGood = true;

    this.clearErrors();
    if (!this.checkLine('row', 3)) isGood = false;
    //if (!this.checkLine("col", 5)) isGood = false;

    //for (let i = 1; i < 10; i++) {
    //  if (!this.checkSquare(i)) isGood = false;
    //  if (!this.checkLine("row", i)) isGood = false;
    //  if (!this.checkLine("col", i)) isGood = false;
    //}

    if (isGood) {
      console.log('Sudoku puzzle complete!');
    } else {
      console.log('Problem in the puzzle');
    }
  }

  /**
   *
   *
   * @returns {undefined}
   */
  checkLine(rc, x) {
    let values = [];
    let classes;
    let isGood = true;
    const matches = document.querySelectorAll('.' + rc + x);

    for (let el of matches) {
      // Skip empty boxes
      if (!el.childNodes[0].value) continue;

      // If we have come across the value on this line previously
      if (values.includes(el.childNodes[0].value)) {
        // highlight this and previous value

        el.classList.add('error');
        document
          .querySelector(this.test[el.childNodes[0].value])
          .classList.add('error');
        isGood = false;
      } else {
        values.push(el.childNodes[0].value);
        //
        classes = '.' + el.classList[0] + '.' + el.classList[1];
        this.test[el.childNodes[0].value] = classes;
      }
    }

    return isGood;
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
        x = 1;
        break;
      case 2:
        x = 4;
        break;
      case 0:
        x = 7;
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
      y = 1;
    } else if (i < 7) {
      y = 4;
    } else {
      y = 7;
    }
    return y;
  }

  /**
   *
   *
   * @returns {undefined}
   */
  checkSquare(i) {
    let values = [];
    let classes;
    let isGood = true;
    let x, y;

    // Get starting col
    switch (i % 3) {
      case 1:
        x = 1;
        break;
      case 2:
        x = 4;
        break;
      case 0:
        x = 7;
        break;
    }

    // Get starting row
    if (i < 4) {
      y = 1;
    } else if (i < 7) {
      y = 4;
    } else {
      y = 7;
    }

    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        const el = document.querySelector('.col' + i + '.row' + j);
        //console.log(".col"+i+".row"+j);
        //console.log("X: ",i, "Y: ", j);
        //console.log(".col"+i+".row"+j, el.childNodes[0].value);
        if (!el.childNodes[0].value) {
          //isGood = false;
          if (el.classList.contains('error')) {
            el.classList.remove('error');
          }
          continue;
        }

        if (values.includes(el.childNodes[0].value)) {
          if (!el.classList.contains('error')) {
            el.classList.add('error');
          }
          document
            .querySelector(this.test[el.childNodes[0].value])
            .classList.add('error');
          isGood = false;
        } else if (el.childNodes[0].value) {
          //if (el.classList.contains("error")) {
          //  el.classList.remove("error");
          //}
          values.push(el.childNodes[0].value);

          classes = '.' + el.classList[0] + '.' + el.classList[1];
          this.test[el.childNodes[0].value] = classes;
        }
      }
    }

    return isGood;
  }

  getPossibleValues(x, y) {
    // [TODO] finish this
    console.log(x, y);
    const el = document.querySelector('.' + y + '.' + x);
    const value = el.childNodes[0].value;

    console.log(value);
  }

  getSquareIndex(classList) {
    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);

    const tempCol = Math.ceil(col[1] / 3);
    const tempRow = (Math.ceil(row[1] / 3) - 1) * 3;
    const square = tempRow + tempCol;

    return square;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Sudoku);

//let checkel = document.getElementsByClassName("btn-check")[0];
//checkel.addEventListener("click", check);
//
//function check() {
//  sud.checkEverything();
//}
//
//let clearel = document.getElementsByClassName("btn-clear")[0];
//clearel.addEventListener("click", clear);
//
//function clear() {
//  sud.clearErrors();
//}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map