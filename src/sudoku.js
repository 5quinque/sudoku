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

export default Sudoku;
