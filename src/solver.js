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
    //console.clear();

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

      await this.func2(i);
      //this.moveForward = this.elSol(this.boxes[i]);

      if (!this.moveForward) {
        // Move back two spaces
        i -= 2;
        this.clearAhead(i + 2);
      }
    }
  }

  func2(i, x) {
    let self = this;
    return new Promise(resolve =>
      setTimeout(function() {
        self.moveForward = self.elSol(self.boxes[i]);

        resolve();
      }, 0),
    );
  }

  elSol(boxEl, x) {
    //let boxEl = document.querySelector(".row"+i+".col"+j);

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
      //let col = i % 9 + 1;
      //let row = Math.floor(i / 9) + 1;
      //let boxEl = document.querySelector('.row' + row + '.col' + col);
      if (this.boxes[i].classList.contains('default')) continue;

      //if (boxEl.classList.contains('default')) continue;

      //boxEl.childNodes[0].value = '';
      this.boxes[i].childNodes[0].value = '';
    }
  }
}

export default Solver;
