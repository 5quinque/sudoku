// @format
'use strict';

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

export default Error;
