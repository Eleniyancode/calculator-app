"use strict";

//selecting all necessary element for the calculation
const resetBtnEl = document.getElementById("reset-btn");
const calcScreenEl = document.querySelector(".calc-screen");
const calcNumberEl = document.querySelectorAll(".calc-number");
const equalBtnEl = document.getElementById("equal-btn");
const deleteBtnEl = document.getElementById("delete-btn");
const toggleBoxDiv = document.querySelector(".theme-toggle-box");

let result;
let expression = "";

//reseting the calculator screen
resetBtnEl.addEventListener("click", function () {
  expression = calcScreenEl.textContent = "0";
});

//adding numbers to the calculator screen
calcNumberEl.forEach((number) => {
  number.addEventListener("click", function (e) {
    //making digit zero functional when using th calculator for the first time
    if (calcScreenEl.textContent === "0" || result) {
      if (
        e.currentTarget.textContent === "-" ||
        e.currentTarget.textContent === "+" ||
        e.currentTarget.textContent === "/" ||
        e.currentTarget.textContent === "*"
      ) {
        calcScreenEl.textContent = "";
      } else expression = "";
    }

    // input.push(number.textContent)
    expression += number.textContent;
    console.log(expression);
    calcScreenEl.textContent = formatExpression(expression);
    
    preventAddingMultipleOperator(e, number);
    result = undefined;
  });
});

//evaluating the input on the calculator screen
equalBtnEl.addEventListener("click", function () {
  result = eval(expression);
  expression = result.toString();
  calcScreenEl.textContent = formatExpression(expression);
});

//deleting an input from the calculator screen
deleteBtnEl.addEventListener("click", function () {
  let output = calcScreenEl.textContent;
  if (output.length === 1) {
    calcScreenEl.textContent = output = 0;
  } else {
    calcScreenEl.textContent = output.slice(0, -1);
  }
});

//preventing adding multiple operator to the screen
const preventAddingMultipleOperator = function (e, number) {
  let output = calcScreenEl.textContent;
  //get the last input made
  const lastInput = output[output.length - 2];
  // console.log(lastInput);
  if (
    lastInput === "-" ||
    lastInput === "+" ||
    lastInput === "*" ||
    lastInput === "/"
  ) {
    if (
      e.currentTarget.textContent === "-" ||
      e.currentTarget.textContent === "+" ||
      e.currentTarget.textContent === "/" ||
      e.currentTarget.textContent === "*"
    ) {
        console.log(expression);
        console.log(expression.slice(0, -1));
        // console.log(calcScreenEl.textContent);
        // number.textContent = ''
      calcScreenEl.textContent = calcScreenEl.textContent.slice(0, -1);
    // calcScreenEl.textContent += ''
    }
  }
};

//Setting different themes for the calculator
function setTheme(theme) {
  const root = document.documentElement;

  //remove all theme classes first
  root.classList.remove("theme-gray", "theme-gold");

  //add selected theme
  if (theme === "gray") {
    root.classList.add("theme-gray");
    toggleBoxDiv.style.display = "flex";
    toggleBoxDiv.style.justifyContent = "center";
  } else if (theme === "gold") {
    root.classList.add("theme-gold");
    toggleBoxDiv.style.display = "flex";
    toggleBoxDiv.style.justifyContent = "flex-end";
  } else if (theme === "default") {
    toggleBoxDiv.style.display = "flex";
    toggleBoxDiv.style.justifyContent = "flex-start";
  }

  localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) setTheme(savedTheme);
});

//formatting the number before displaying on the calculator screen
function formatExpression(expression) {
  const numbers = expression.split(/[\+\-\*\/]/);
  const operators = expression.match(/[\+\-\*\/]/g) || [];

  const formattedNumbers = numbers.map((num) => Number(num).toLocaleString());

  let formattedExpression = "";
  for (let i = 0; i < formattedNumbers.length; i++) {
    formattedExpression += formattedNumbers[i];
    if (operators[i]) {
      formattedExpression += `${operators[i]}`;
    }
  }
  return formattedExpression;
}
