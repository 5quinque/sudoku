'use strict';

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

    if (!this.isRowValid("."+row[0]) ||
        !this.isRowValid("."+col[0]) ||
        !this.isSquareValid(square))
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

  isBoxProbemSquare(i, value) {
    let x, y;
    let isProblem = false;
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
      if (!el.childNodes[0].value)
        continue;
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

    if (this.isBoxProblemRow("."+row[0], value) ||
        this.isBoxProblemRow("."+col[0], value) ||
        this.isBoxProbemSquare(square, value))
      isProblem = true;
 
    return isProblem;
  }
  
  applyErrorClass(element) {
   if (this.isBoxProblem(element.classList, element.childNodes[0].value)) {
     element.classList.add("error");
   } else {
     element.classList.remove("error");
   }
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
   *
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
   * @description Remove 'error' class from all divs in the grid
   * @returns {undefined}
   */
  clearErrors() {
    const tiles = document.querySelectorAll(".ninexnine_wrapper > *");

    for (let el of tiles)
      el.classList.remove("error");
  }

}

export default ErrorArray;
