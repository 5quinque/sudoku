// @format
'use strict';

import Error from './errorCheck.js';
import Engine from './engine.js';
import Input from './input.js';
import Solver from './solver.js';

class Sudoku {
  constructor() {
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    this.engine = new Engine(this);
    this.error = new Error(this);
    this.solver = new Solver(this);
    this.input = new Input(this);

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
    puzzleWrapper.innerHTML = '';

    this.input.deleteInputListeners();
    this.drawGame();
    this.input.addInputListeners();
  }

  createPuzzle() {
    let p = [];
    for (let i = 0; i < 81; i++) p[i] = 0;

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
    // prettier-ignore
    const p = [
0, 0, 0, 0, 7, 0, 0, 2, 0,
1, 9, 8, 4, 0, 2, 0, 0, 0,
0, 0, 0, 3, 6, 0, 8, 9, 0,
0, 8, 0, 0, 0, 7, 4, 6, 0,
9, 0, 0, 0, 0, 0, 0, 0, 7,
0, 0, 0, 5, 0, 0, 0, 1, 0,
8, 0, 9, 7, 0, 0, 2, 4, 0,
6, 2, 0, 9, 0, 0, 7, 0, 1,
4, 0, 1, 2, 8, 0, 6, 5, 9,
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

export default Sudoku;
