// @format
'use strict';

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

export default Solver;
