import "./style.css";
import { Operator } from "./Operator";

let firstOperand = "";
let secondOperand = "";
let operator: Operator | null = null;
let result: number = 0;

const clear = document.querySelector<HTMLButtonElement>(".clear");

clear?.addEventListener("click", function () {
  operator = null;
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
    if (operator === null) {
      firstOperand += button.innerHTML;
    } else {
      secondOperand += button.innerHTML;
    }
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
    operator = attribute as Operator;
    showCalculation(firstOperand + operator);
  });
});

const display = document.querySelector(".displayButton");
display?.addEventListener("click", () => {
  switch (operator) {
    case Operator.Add:
      result = parseInt(firstOperand) + parseInt(secondOperand);
      break;
    case Operator.Subtract:
      result = parseInt(firstOperand) - parseInt(secondOperand);
      break;
    case Operator.Multiply:
      result = parseInt(firstOperand) * parseInt(secondOperand);
      break;
    case Operator.Divide:
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
