!function(e){var t={};function s(r){if(t[r])return t[r].exports;var l=t[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,s),l.l=!0,l.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);var r=class{constructor(e){this.sudoku=e}isValidStar(e){let t=!0;const s=/row(\d)/.exec(e),r=/col(\d)/.exec(e);this.isRowValid("."+s[0])||(t=!1),this.isRowValid("."+r[0])||(t=!1);const l=this.sudoku.getSquareIndex(e);return this.isSquareValid(l)||(t=!1),t}isRowValid(e){let t=!0,s=[];const r=document.querySelectorAll(e);for(let e of r)if(e.childNodes[0].value){if(s.includes(e.childNodes[0].value)){t=!1;break}s.push(e.childNodes[0].value)}return t}isSquareValid(e){let t,s,r=!0,l=[];t=this.sudoku.getStartingCol(e),s=this.sudoku.getStartingRow(e);for(let e=t;e<t+3;e++)for(let e=s;e<s+3;e++)if(el.childNodes[0].value){if(l.includes(el.childNodes[0].value)){r=!1;break}l.push(el.childNodes[0].value)}return r}clearLine(e,t,s){const r=document.querySelectorAll("."+e+t);for(let e of r)e.childNodes[0].value==s&&(this.isValidStar(e.classList)?e.classList.remove("error"):console.log("Still an error, not removing error class",e.classList))}clearSquare(e,t){let s,r;console.log("Clearing square"),s=this.sudoku.getStartingCol(e),r=this.sudoku.getStartingRow(e);for(let e=s;e<s+3;e++)for(let s=r;s<r+3;s++){let r=document.querySelector(".col"+e+".row"+s);r.childNodes[0].value==t&&this.isValidStar(r.classList)&&r.classList.remove("error")}}highlightLine(e,t){const s=document.querySelectorAll("."+e+t);for(let e of s)e.classList.contains("error")||e.classList.add("error")}clearErrors(){const e=document.querySelectorAll(".ninexnine_wrapper > *");for(let t of e)t.classList.remove("error")}};var l=class{constructor(e){this.sudoku=e,this.addInputListeners()}addInputListeners(){const e=this,t=document.querySelectorAll(".ninexnine_wrapper > div > input");for(let s=0;s<t.length;s++)t[s].addEventListener("input",function(){e.checkValid(this)}),t[s].addEventListener("focus",function(){e.storeBoxValue(this)})}checkValid(e){const t=e.parentElement.classList[0]+e.parentElement.classList[1];console.log("New",e.value),this.sudoku.test={};let s=!1;const r=/row(\d)/.exec(e.parentElement.classList.value),l=/col(\d)/.exec(e.parentElement.classList.value);this.sudoku.checkLine("row",r[1])||(s=!0),this.sudoku.checkLine("col",l[1])||(s=!0);const o=this.sudoku.getSquareIndex(e.parentElement.classList.value);this.sudoku.checkSquare(o)||(s=!0),s&&(e.parentElement.classList.contains("error")||e.parentElement.classList.add("error")),e.value!=this.sudoku.currentValues[t]&&this.sudoku.currentValues[t]&&(console.log("Clear all neighbouring errors with value",this.sudoku.currentValues[t]),this.sudoku.error.clearLine("row",r[1],this.sudoku.currentValues[t]),this.sudoku.error.clearLine("col",l[1],this.sudoku.currentValues[t]),this.sudoku.error.clearSquare(o,this.sudoku.currentValues[t])),this.sudoku.currentValues[t]=e.value,e.value||e.parentElement.classList.remove("error")}storeBoxValue(e){const t=e.parentElement.classList[0]+e.parentElement.classList[1];e.value&&(console.log("Current",e.value),this.sudoku.currentValues[t]=e.value)}};new class{constructor(){this.score=0,this.difficulty=!1,this.test={},this.currentValues={},this.drawGame(),this.input=new l(this),this.error=new r(this)}drawGame(){const e=this.getPuzzle();this.drawGrid(),this.drawPuzzle(e)}drawGrid(){const e=document.querySelector(".ninexnine_wrapper");for(let t=1;t<=9;t++)for(let s=1;s<=9;s++)e.innerHTML+='<div class="row'+t+" col"+s+'"></div>'}drawPuzzle(e){let t,s;for(let r=0;r<81;r++){t=r%9,s=Math.floor(r/9);const l=document.querySelector(".col"+(t+1)+".row"+(s+1));e[r]?(l.innerHTML='<input type="text" value="'+e[r]+'" disabled>',l.classList.add("default")):l.innerHTML='<input type="text">'}}getPuzzle(){return[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9]}checkEverything(){let e=!0;this.clearErrors(),this.checkLine("row",3)||(e=!1),e?console.log("Sudoku puzzle complete!"):console.log("Problem in the puzzle")}checkLine(e,t){let s,r=[],l=!0;const o=document.querySelectorAll("."+e+t);for(let e of o)e.childNodes[0].value&&(r.includes(e.childNodes[0].value)?(e.classList.add("error"),document.querySelector(this.test[e.childNodes[0].value]).classList.add("error"),l=!1):(r.push(e.childNodes[0].value),s="."+e.classList[0]+"."+e.classList[1],this.test[e.childNodes[0].value]=s));return l}getStartingCol(e){let t;switch(e%3){case 1:t=1;break;case 2:t=4;break;case 0:t=7}return t}getStartingRow(e){let t;return t=e<4?1:e<7?4:7}checkSquare(e){let t,s,r,l=[],o=!0;switch(e%3){case 1:s=1;break;case 2:s=4;break;case 0:s=7}r=e<4?1:e<7?4:7;for(let e=s;e<s+3;e++)for(let s=r;s<r+3;s++){const r=document.querySelector(".col"+e+".row"+s);r.childNodes[0].value?l.includes(r.childNodes[0].value)?(r.classList.contains("error")||r.classList.add("error"),document.querySelector(this.test[r.childNodes[0].value]).classList.add("error"),o=!1):r.childNodes[0].value&&(l.push(r.childNodes[0].value),t="."+r.classList[0]+"."+r.classList[1],this.test[r.childNodes[0].value]=t):r.classList.contains("error")&&r.classList.remove("error")}return o}getPossibleValues(e,t){console.log(e,t);const s=document.querySelector("."+t+"."+e).childNodes[0].value;console.log(s)}getSquareIndex(e){const t=/row(\d)/.exec(e),s=/col(\d)/.exec(e),r=Math.ceil(s[1]/3);return 3*(Math.ceil(t[1]/3)-1)+r}}}]);
//# sourceMappingURL=main.js.map