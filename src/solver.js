'use strict';

class Solver {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.x = false;
  }

  async test() {
    let problemIncrement = 2;
    let checkpoint = 0;
    let loops = 0;
    for (let i = 2; i < 18; i++) {
      loops++;
      if (loops > 250) {
        console.log("Too many loops, exiting");
        break;
      }

      await this.func2(i);

      if (!this.x) {
        checkpoint = i;

        problemIncrement++;
        i = checkpoint - problemIncrement;

        this.clearAhead(i+2);
      } else if (i > checkpoint) {
        problemIncrement = 2;
        checkpoint = 0;
        console.log("Clearing checkpoint");
      }
    }
    
  }

  func2(i, x) {
    let self = this;
    return new Promise(resolve => setTimeout(function() {
     let col = (i % 9) + 1;
     let row = (Math.floor(i / 9)) + 1;
     self.x = self.sol(row, col, x);

     resolve();
    }, 100));
  }

  sol(i, j, x) {
    let boxEl = document.querySelector(".row"+i+".col"+j);

    if (boxEl.classList.contains("default"))
      return true;

    console.log("Curernt valeu", boxEl.childNodes[0].value);
    if (parseInt(boxEl.childNodes[0].value)) {
      boxEl.childNodes[0].value++;
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



  // old



  test2() {
    let col, row;

    const el = document.querySelector(".ninexnine_wrapper");

    let x = true;
    let loops = 0;

    let problemIncrement = 1;

    let checkpoint = false;

    //for (let i = 0; i < 81; i++) {
    for (let i = 0; i < 18; i++) {
      loops++;
      if (loops > 450) {
        console.log("Too many loops, exiting");
        break;
      }

      continue;

      col = (i % 9) + 1;
      row = (Math.floor(i / 9)) + 1;
      x = this.sol(row, col, x);

      //if (!x) {
      //  i-=2;
      //  console.log("going back", i);
      //}


      if (!x) {
        //if (!checkpoint) {
        checkpoint = i;
        //}

        console.log("Need to go back", i, problemIncrement);


        i = checkpoint - problemIncrement;

        problemIncrement++;
      }

      //  //if (i < 0) {
      //  //  i = 1;
      //  //  problemIncrement = 1;
      //  //}

      //}

      if (x && i > checkpoint) {
        checkpoint = false;
        problemIncrement = 1;
      }// else if (x) {
      //  ;
      //  //problemIncrement++;
      //}
    }

  }

  sol2(i, j, x) {
    let boxEl = document.querySelector(".row"+i+".col"+j);

    if (boxEl.classList.contains("default"))
        return true;

    let value = 1;
    //if (!x) {
    //  value = boxEl.childNodes[0].value;
    //  if (value < 9) {
    //    boxEl.childNodes[0].value++;
    //    value = boxEl.childNodes[0].value;
    //  }
    //}
    //boxEl.childNodes[0].value = value;
    //
    if (boxEl.childNodes[0].value === parseInt(boxEl.childNodes[0].value, 10)) {
      //console.log("Valid and inc");
      boxEl.childNodes[0].value++;
      value = boxEl.childNodes[0].value;
    } else {
      boxEl.childNodes[0].value = value;
    }

    if (boxEl.childNodes[0].value > 9) {
      //console.log("Above nine, emptying");
      boxEl.childNodes[0].value = "";
      return false;
    }

    //console.log("Val", value);
    while (!this.sudoku.error.isValidStar(boxEl.classList) && value < 9) {
      value++;
      boxEl.childNodes[0].value = value;
    }

    // If this is the case, we need to move backwards
    if (!this.sudoku.error.isValidStar(boxEl.classList)) {
      boxEl.childNodes[0].value = "";
      return false;
    }

    return true;
  }



}

export default Solver;
