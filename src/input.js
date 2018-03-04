'use strict';

class Input {
  constructor(sudoku) {
    let self = this;
    this.sudoku = sudoku;

    this.addInputListeners(); 
  }

  addInputListeners() {
    let inputs = document.querySelectorAll(".ninexnine_wrapper > div > input");
    
    // Loop through all inputs adding event listeners
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("input", function() {
        // Everytime the value is updated check if it's valid
        self.checkValid(this);
      });
      inputs[i].addEventListener("focus", function() {
        // Store the box value for comparison when it's updated
        self.storeBoxValue(this);
      });
    }
  }

  checkValid(el) {
    let key = el.parentElement.classList[0] + el.parentElement.classList[1];
    console.log("New", el.value);
  
    this.sudoku.test = {};
  
    let error = false;
  
    let row = /row(\d)/.exec(el.parentElement.classList.value);
    let col = /col(\d)/.exec(el.parentElement.classList.value);
  
    if (!this.sudoku.checkLine("row", row[1])) error = true;
    if (!this.sudoku.checkLine("col", col[1])) error = true;
    
    let square = this.sudoku.getSquareIndexFromClassList(el.parentElement.classList.value);
    if (!this.sudoku.checkSquare(square)) error = true;
  
    if (error) {
      if (!el.parentElement.classList.contains("error"))
        el.parentElement.classList.add("error");
    }
  
    if (el.value != this.sudoku.currentValues[key] && this.sudoku.currentValues[key]) {
      console.log("Clear all neighbouring errors with value", this.sudoku.currentValues[key]);
      this.sudoku.error.clearLine("row", row[1], this.sudoku.currentValues[key]);
      this.sudoku.error.clearLine("col", col[1], this.sudoku.currentValues[key]);
  
      this.sudoku.error.clearSquare(square, this.sudoku.currentValues[key]);
    }
  
    this.sudoku.currentValues[key] = el.value;
  
    if (!el.value) {
      el.parentElement.classList.remove("error");
    }
  
  }
  
  /**
   * 
   * @description Store the value of of box, for future comparison
   * @returns {undefined}
   */
  storeBoxValue(el) {
    let key = el.parentElement.classList[0] + el.parentElement.classList[1];

    if (el.value) {
      console.log("Current", el.value);
      this.sudoku.currentValues[key] = el.value;
    }
  }

}

export default Input;
