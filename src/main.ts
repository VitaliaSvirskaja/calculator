import "./style.css";

console.log("Hello World!");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let result: number = 0;

function setOperand(operand: string) {
  if (operator === "") {
    firstOperand += operand;
    console.log(firstOperand);
  } else {
    secondOperand += operand;
    console.log(secondOperand);
  }
}

const clear = document.querySelector<HTMLButtonElement>(".clear");
clear?.addEventListener("click", function () {
  operator = "";
  firstOperand = "";
  secondOperand = "";
  showCalculation("");
  showInput();
});

function showCalculation(output: string) {
  const calculation = document.querySelector(".calculation");
  if (calculation === null) {
    return;
  }
  calculation.textContent = output;
}

function showInput() {
  const input = document.querySelector(".input");
  if (input === null) {
    return;
  }
  if (secondOperand === "") {
    input.textContent = firstOperand;
  } else {
    input.textContent = secondOperand;
  }
}

const buttons = document.querySelectorAll(".number");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperand(button.innerHTML);
    showInput();
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    let attribute = operatorButton.getAttribute("operator");
    if (attribute === null) {
      return;
    }
    operator = attribute;
    showCalculation(firstOperand + operator);
  });
});

const display = document.querySelector(".displayButton");
display?.addEventListener("click", () => {
  switch (operator) {
    case "+":
      result = parseInt(firstOperand) + parseInt(secondOperand);
      break;
    case "-":
      result = parseInt(firstOperand) - parseInt(secondOperand);
      break;
    case "*":
      result = parseInt(firstOperand) * parseInt(secondOperand);
      break;
    case "/":
      result = parseInt(firstOperand) / parseInt(secondOperand);
      break;
  }
  showCalculation(firstOperand + operator + secondOperand + "=");
  changeInputToResult();
});

function changeInputToResult() {
  const showResult = document.querySelector(".input");
  if (showResult === null) {
    return;
  }
  showResult.textContent = result.toString();
}
