
class Sudoku {
  constructor(gameElement, input) {
    this.score = 0;
    this.gameElement = gameElement;
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    //this.drawGame();
  
    //this.input = new Input(this);
  }

  drawGame() {
    // check difficulty
    // create new puzzle
    let puzzle = this.getPuzzle();

    // add to DOM
    this.drawPuzzle(puzzle);
  }

  drawPuzzle(puzzle) {
    let col, row;

    for (let i = 0; i < 81; i++) {
      col = i % 9;
      row = Math.floor(i / 9);

      let el = document.querySelector(".col"+(col+1)+".row"+(row+1));
      if (puzzle[i]) {
        el.innerHTML = "<input type=\"text\" value=\""+puzzle[i]+"\" disabled>";
        el.classList.add("default");
      } else {
        el.innerHTML = "<input type=\"text\">";
      }
    }
  }

  getPuzzle() {
    let p = [
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

  highlightLine(rc, x) {
    let matches = document.querySelectorAll("."+rc+x);

    for (let el of matches) {
      if (!el.classList.contains("error"))
        el.classList.add("error");
    }
  }

  /**
   * 
   * @description Remove 'error' class from all divs in the grid
   * @returns {undefined}
   */
  clearErrors() {
    let tiles = document.querySelectorAll(".ninexnine_wrapper > *");

    for (let el of tiles) {
      el.classList.remove("error");
    }
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
    let matches = document.querySelectorAll("."+rc+x);

    for (let el of matches) {
      if (!el.childNodes[0].value) {
        //isGood = false;
        if (el.classList.contains("error")) {
          el.classList.remove("error");
        }
        continue;
      }
      if (values.includes(el.childNodes[0].value)) {
        //this.highlightLine(rc, x);
        // highlight this and previous value
        if (el.childNodes[0].value) {
          //console.log("Duplicate at. ", test[el.childNodes[0].value]);
          
          el.classList.add("error");
          
          document.querySelector(this.test[el.childNodes[0].value]).classList.add("error");
          isGood = false;
        }

        //return false;

        isGood = false;
      } else if (el.childNodes[0].value) {
        // ?
        //if (el.classList.contains("error")) {
        //  //console.log('removing error from', el);
        //  el.classList.remove("error");
        //}

        values.push(el.childNodes[0].value);

        // 
        classes = "."+el.classList[0]+"."+el.classList[1];
        this.test[el.childNodes[0].value] = classes;
      }
    }


    //console.log(test);

    //if (isGood) console.log(rc, x, " is good");
    return isGood;
  }

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

  clearSquare(i, val) {
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
        let el = document.querySelector(".col"+i+".row"+j);
        if (el.childNodes[0].value == val) {
          el.classList.remove("error");
        }
      }
    }
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
        let el = document.querySelector(".col"+i+".row"+j);
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
    console.log(x, y);
    let el = document.querySelector("."+y+"."+x);
    let value = el.childNodes[0].value;

    console.log(value);
  }

  getSquareIndexFromClassList(classList) {
    // this.parentElement.classList.value
    let row = /row(\d)/.exec(classList);
    let col = /col(\d)/.exec(classList);
    
    let tempCol = Math.ceil(col[1] / 3);
    let tempRow = (Math.ceil(row[1] / 3) - 1) * 3;
    let square = tempRow + tempCol;

    return square;
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

    // row start
    let matches = document.querySelectorAll("."+row[0]);
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
    // row end

    // col start
    matches = document.querySelectorAll("."+col[0]);
    values = [];
    for (let el of matches) {
      if (!el.childNodes[0].value) {
        continue;
      }
      if (values.includes(el.childNodes[0].value)) {
        isValid = false;
        break;
      }
      values.push(el.childNodes[0].value);
    }
    // col end
 
    return isValid;
  }
}

var sud = new Sudoku(".ninexnine_wrapper", false);

sud.drawGame();

let checkel = document.getElementsByClassName("btn-check")[0];
checkel.addEventListener("click", check);

function check() {
  sud.checkEverything();
}

let clearel = document.getElementsByClassName("btn-clear")[0];
clearel.addEventListener("click", clear);

function clear() {
  sud.clearErrors();
}


let inputs = document.querySelectorAll(".ninexnine_wrapper > div > input");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", checkValid);
  inputs[i].addEventListener("focus", hint);
}

function checkValid() {
  let key = this.parentElement.classList[0] + this.parentElement.classList[1];
  // [TODO]
  // Dont remove '.error' if row is error, but not in square..
  // On input, check neighbours
  //

  console.log("New", this.value);

  sud.test = {};

  let error = false;

  let row = /row(\d)/.exec(this.parentElement.classList.value);
  let col = /col(\d)/.exec(this.parentElement.classList.value);

  if (!sud.checkLine("row", row[1])) error = true;
  if (!sud.checkLine("col", col[1])) error = true;
  
  let square = sud.getSquareIndexFromClassList(this.parentElement.classList.value);
  if (!sud.checkSquare(square)) error = true;

  if (error) {
    if (!this.parentElement.classList.contains("error"))
      this.parentElement.classList.add("error");
  }

  if (this.value != sud.currentValues[key] && sud.currentValues[key]) {
    console.log("Clear all neighbouring errors with value", sud.currentValues[key]);
    sud.clearLine("row", row[1], sud.currentValues[key]);
    sud.clearLine("col", col[1], sud.currentValues[key]);

    //sud.clearSquare(square, sud.currentValues[key]);
  }

  sud.currentValues[key] = this.value;

  if (!this.value) {
    this.parentElement.classList.remove("error");
  }

}

function hint() {
  let key = this.parentElement.classList[0] + this.parentElement.classList[1];
  //console.log(this.parentElement.classList);
  //sud.getPossibleValues(this.parentElement.classList[0], this.parentElement.classList[1]);
  if (this.value) {
    console.log("Current", this.value);

    sud.currentValues[key] = this.value;
  }

  return;
}

//1   2
//x * y
//
//123456789
//1
//2
//323456
//4
//5
//6
//7
//8
//9



//
/*
1 2 3 4 5 6 7 8 9

1 4 7 1 4 7 1 4 7


1 2 3 4 5 6 7 8 9

1 1 1 4 4 4 7 7 7

%
1 2 0 1 2 0 1 2 0

*/


