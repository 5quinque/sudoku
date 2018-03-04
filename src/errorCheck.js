'use strict';

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

    let row = /row(\d)/.exec(classList);
    let col = /col(\d)/.exec(classList);

    if (!this.isRowValid("."+row[0]))
      isValid = false;
    if (!this.isRowValid("."+col[0]))
      isValid = false;

    // [TODO] Check is square is valid
 
    return isValid;
  }

  /**
   * 
   * @description Check if a row is valid for given tile class
   * @returns {undefined}
   */
  isRowValid(elClass) {
    let isValid = true;
    let matches = document.querySelectorAll(elClass);
    let values = [];

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

  /**
   * 
   * @description Remove 'error' class from valid boxes on given line
   * @returns {undefined}
   */
  clearLine(rc, x, val) {
    let matches = document.querySelectorAll("."+rc+x);

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

    // Get starting col
    this.sudoku.getStartingCol(i);

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
        let el = document.querySelector(".col"+i+".row"+j);
        if (el.childNodes[0].value == val) {
          el.classList.remove("error");
        }
      }
    }
  }



  /**
   * [UNUSED]
   * @description Highlights a given line 
   * @returns {undefined}
   */
  highlightLine(rc, x) {
    let matches = document.querySelectorAll("."+rc+x);

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
    let tiles = document.querySelectorAll(".ninexnine_wrapper > *");

    for (let el of tiles) {
      el.classList.remove("error");
    }
  }

}

export default Error;
