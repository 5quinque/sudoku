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
    let memx = {};
    let memy = {};
    let memsq = {};

    const row = /row(\d)/.exec(classList);
    const col = /col(\d)/.exec(classList);

    if (!this.isRowValid("."+row[0])) {
      //console.log("Row is invalid");
      isValid = false;
    }
    if (!this.isRowValid("."+col[0])) {
      //console.log("Col is invalid");
      isValid = false;
    }

    const square = this.sudoku.getSquareIndex(classList);
    if (!this.isSquareValid(square)) {
      //console.log("Square is invalid");
      isValid = false
    }
 
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
      if (!el.childNodes[0].value)
        continue;
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
 
    for (let i = x; i < x+3; i++) {
      for (let j = y; j < y+3; j++) {
        let el = document.querySelector(".col"+i+".row"+j);
        if (!el.childNodes[0].value)
          continue;
        if (values.includes(el.childNodes[0].value)) {
          isValid = false;
          break;
        }
        values.push(el.childNodes[0].value);
      }
    }
    return isValid;
  }

  /**
   * 
   * @description Remove 'error' class from valid boxes on given line
   * @returns {undefined}
   */
  clearLine(rc, x, val) {
    const matches = document.querySelectorAll("."+rc+x);

    for (let el of matches) {
      if (el.childNodes[0].value == val) {
        // Check if removal is valid..
        if (this.isValidStar(el.classList)) {
          el.classList.remove("error");
          //console.log("Valid square, removing error class", el.classList);
        } else {
          console.log("Still an error, not removing error class", el.classList);
        }
      }
    }
  }

  /**
   * [TODO] Make this the same as clearLine
   * @description Remove 'error' calss from valid boxes on given square
   * @returns {undefined}
   */
  clearSquare(i, val) {
    let x, y;

    console.log("Clearing square");

    // Get starting col
    x = this.sudoku.getStartingCol(i);
    // Get starting row
    y = this.sudoku.getStartingRow(i);

    for (let i = x; i < x+3; i++) {
      for (let j = y; j < y+3; j++) {
        let el = document.querySelector(".col"+i+".row"+j);
        if (el.childNodes[0].value == val &&
            this.isValidStar(el.classList))
          el.classList.remove("error");
      }
    }
  }

  /**
   * [UNUSED]
   * @description Highlights a given line 
   * @returns {undefined}
   */
  highlightLine(rc, x) {
    const matches = document.querySelectorAll("."+rc+x);

    for (let el of matches) {
      if (!el.classList.contains("error"))
        el.classList.add("error");
    }
  }

  /**
   * [UNUSED]
   * @description Remove 'error' class from all divs in the grid
   * @returns {undefined}
   */
  clearErrors() {
    const tiles = document.querySelectorAll(".ninexnine_wrapper > *");

    for (let el of tiles)
      el.classList.remove("error");
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


class Input {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.addInputListeners(); 
  }

  addInputListeners() {
    const self = this;
    const inputs = document.querySelectorAll(".ninexnine_wrapper > div > input");
    
    // Loop through all inputs adding event listeners
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", function() {
        // Everytime the value is updated check if it's valid
        self.checkValid(this);
      });
      inputs[i].addEventListener("focus", function() {
        // Store the box value for comparison when it's updated
        self.storeBoxValue(this);
      });
    }

    // Add event listeners for buttons
    let solveEl = document.getElementsByClassName("btn-solve")[0];
    solveEl.addEventListener("click", function() {
      self.sudoku.solver.solve();
    });
  }

  // [TODO] Split this up a bit
  checkValid(el) {
    const key = el.parentElement.classList[0] + el.parentElement.classList[1];
    console.log("New", el.value);
  
    this.sudoku.test = {};
  
    let error = false;
  
    const row = /row(\d)/.exec(el.parentElement.classList.value);
    const col = /col(\d)/.exec(el.parentElement.classList.value);
  
    if (!this.sudoku.checkLine("row", row[1])) error = true;
    if (!this.sudoku.checkLine("col", col[1])) error = true;
    
    const square = this.sudoku.getSquareIndex(el.parentElement.classList.value);
    if (!this.sudoku.checkSquare(square)) error = true;
  
    if (error) {
      if (!el.parentElement.classList.contains("error"))
        el.parentElement.classList.add("error");
    }
  
    if (el.value != this.sudoku.currentValues[key] && this.sudoku.currentValues[key]) {
      console.log("Clear all neighbouring errors with value", this.sudoku.currentValues[key]);
      this.sudoku.error.clearLine("row", row[1], this.sudoku.currentValues[key]);
      this.sudoku.error.clearLine("col", col[1], this.sudoku.currentValues[key]);
  
      this.sudoku.error.clearSquare(square, this.sudoku.currentValues[key]);
    }
  
    this.sudoku.currentValues[key] = el.value;
  
    if (!el.value) {
      el.parentElement.classList.remove("error");
    }
  
  }
  
  /**
   * 
   * @description Store the value of of box, for future comparison
   * @returns {undefined}
   */
  storeBoxValue(el) {
    const key = el.parentElement.classList[0] + el.parentElement.classList[1];

    if (el.value) {
      console.log("Current", el.value);
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


class Solver {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.moveForward = true;
  }

  async solve() {
    let loops = 0;
    this.boxes = document.querySelector(".ninexnine_wrapper").childNodes;

    //for (let i = 2; i < 27; i++) {
    for (let i = 2; i < 81; i++) {
      loops++;
      if (loops > 45000) {
        console.log("Too many loops, exiting");
        break;
      }

      // Skip over 'default' boxes
      if (this.boxes[i].classList.contains("default") && !this.moveForward) {
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i+2);
        continue;
      }

      //await this.func2(i);
      this.moveForward = this.elSol(this.boxes[i]);

      if (!this.moveForward) {
        
        //
        // Move back two spaces
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i+2);
      }

    }

    console.log(`Completed in ${loops} loops`);
  }

  func2(i, x) {
    let self = this;
    return new Promise(resolve => setTimeout(function() {
      self.moveForward = self.elSol(self.boxes[i]);

     resolve();
    }, 10));
  }

  elSol(boxEl, x) {
    //let boxEl = document.querySelector(".row"+i+".col"+j);
    
    if (boxEl.classList.contains("default"))
      return true;

    if (parseInt(boxEl.childNodes[0].value)) {
      boxEl.childNodes[0].value++;
      if (boxEl.childNodes[0].value > 9) {
        boxEl.childNodes[0].value = "";
        return false;
      }
    } else {
      boxEl.childNodes[0].value = 1;
    }

    while (!this.sudoku.error.isValidStar(boxEl.classList) &&
       boxEl.childNodes[0].value < 9) {
      boxEl.childNodes[0].value++;
    }

    if (!this.sudoku.error.isValidStar(boxEl.classList)) {
      boxEl.childNodes[0].value = "";
      return false;
    } else {
      return true;
    }
  }

  clearAhead(i) {
    for (; i < 81; i++) {
      let col = (i % 9) + 1;
      let row = (Math.floor(i / 9)) + 1;
      let boxEl = document.querySelector(".row"+row+".col"+col);

      if (boxEl.classList.contains("default"))
        continue;

      boxEl.childNodes[0].value = "";
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
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.js */ "./src/input.js");
/* harmony import */ var _solver_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solver.js */ "./src/solver.js");






class Sudoku {
  constructor() {
    this.score = 0;
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    this.drawGame();

    this.error = new _errorCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.solver = new _solver_js__WEBPACK_IMPORTED_MODULE_2__["default"](this);
    this.input = new _input_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
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
    const el = document.querySelector(".ninexnine_wrapper");

    // Rows
    for (let i = 1; i <= 9; i++) {
      // Columns
      for (let j = 1; j <= 9; j++) {
        el.innerHTML += "<div class=\"row"+i+" col"+j+"\"></div>";
      }
    }
  }

  drawPuzzle(puzzle) {
    let col, row;

    for (let i = 0; i < 81; i++) {
      col = i % 9;
      row = Math.floor(i / 9);

      const el = document.querySelector(".col"+(col+1)+".row"+(row+1));
      if (puzzle[i]) {
        el.innerHTML = "<input type=\"text\" value=\""+puzzle[i]+"\" disabled>";
        el.classList.add("default");
      } else {
        el.innerHTML = "<input type=\"text\">";
      }
    }
  }

  getPuzzle() {
    const p = [
      5, 3, 0, 0, 7, 0, 0, 0, 0,
      6, 0 ,0, 1, 9, 5, 0, 0, 0,
      0, 9, 8, 0, 0, 0, 0, 6, 0,
      8, 0, 0, 0, 6, 0, 0, 0, 3,
      4, 0, 0, 8, 0, 3, 0, 0, 1,
      7, 0, 0, 0, 2, 0, 0, 0, 6,
      0, 6, 0, 0, 0, 0, 2, 8, 0,
      0, 0, 0, 4, 1, 9, 0, 0, 5,
      0, 0, 0, 0, 8, 0, 0, 7, 9
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
    if (!this.checkLine("row", 3)) isGood = false;
    //if (!this.checkLine("col", 5)) isGood = false;

    //for (let i = 1; i < 10; i++) {
    //  if (!this.checkSquare(i)) isGood = false;
    //  if (!this.checkLine("row", i)) isGood = false;
    //  if (!this.checkLine("col", i)) isGood = false;
    //}

    if (isGood) {
      console.log("Sudoku puzzle complete!");
    } else {
      console.log("Problem in the puzzle");
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
    const matches = document.querySelectorAll("."+rc+x);

    for (let el of matches) {
      // Skip empty boxes
      if (!el.childNodes[0].value)
        continue;
      
      // If we have come across the value on this line previously
      if (values.includes(el.childNodes[0].value)) {
        // highlight this and previous value
        
        el.classList.add("error");
        document.querySelector(this.test[el.childNodes[0].value]).classList.add("error");
        isGood = false;
      } else {
        values.push(el.childNodes[0].value);
        // 
        classes = "."+el.classList[0]+"."+el.classList[1];
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
 
    for (let i = x; i < x+3; i++) {
      for (let j = y; j < y+3; j++) {
        const el = document.querySelector(".col"+i+".row"+j);
        //console.log(".col"+i+".row"+j);
        //console.log("X: ",i, "Y: ", j);
        //console.log(".col"+i+".row"+j, el.childNodes[0].value);
        if (!el.childNodes[0].value) {
          //isGood = false;
          if (el.classList.contains("error")) {
            el.classList.remove("error");
          }
          continue;
        }

        if (values.includes(el.childNodes[0].value)) {
          if (!el.classList.contains("error")) {
            el.classList.add("error");
          }
          document.querySelector(this.test[el.childNodes[0].value]).classList.add("error");
          isGood = false;
        } else if (el.childNodes[0].value) {
          //if (el.classList.contains("error")) {
          //  el.classList.remove("error");
          //}
          values.push(el.childNodes[0].value);

          classes = "."+el.classList[0]+"."+el.classList[1];
          this.test[el.childNodes[0].value] = classes;
        }
      }
    }

    return isGood;
  }

  getPossibleValues(x, y) {
    // [TODO] finish this
    console.log(x, y);
    const el = document.querySelector("."+y+"."+x);
    const value = el.childNodes[0].value;

    console.log(value);
  }

  getSquareIndex(classList) {
    // this.parentElement.classList.value
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