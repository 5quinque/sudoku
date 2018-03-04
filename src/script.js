'use strict';

import Error from './errorCheck.js'
import Input from './input.js'

class Sudoku {
  constructor() {
    this.score = 0;
    this.difficulty = false;

    this.test = {};

    this.currentValues = {};

    this.drawGame();

    this.input = new Input(this);
    this.error = new Error(this);
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

}

var sud = new Sudoku();




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



