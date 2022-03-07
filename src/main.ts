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
    if (operator !== null && firstOperand !== "" && secondOperand !== "") {
      calculateResult();
      firstOperand = result.toString();
      secondOperand = "";
      showInput();
    }
    operator = attribute as Operator;
    showCalculation(firstOperand + operator);
  });
});

function calculateResult() {
  switch (operator) {
    case Operator.Add:
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case Operator.Subtract:
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case Operator.Multiply:
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case Operator.Divide:
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
  }
}

const display = document.querySelector(".displayButton");
display?.addEventListener("click", () => {
  calculateResult();
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

const deleteButton = document.querySelector(".delete");
deleteButton?.addEventListener("click", () => {
  if (operator === null) {
    firstOperand = firstOperand.slice(0, -1);
  } else {
    secondOperand = secondOperand.slice(0, -1);
  }
  const resultDisplay = document.querySelector(".input");
  if (resultDisplay === null) {
    return;
  } else if (secondOperand === "") {
    resultDisplay.textContent = firstOperand;
  } else {
    resultDisplay.textContent = secondOperand;
  }
});

const decimalButton = document.querySelector(".decimal");
decimalButton?.addEventListener("click", () => {
  if (operator === null) {
    firstOperand = firstOperand + ".";
  } else {
    secondOperand = secondOperand + ".";
  }
  const resultDisplay = document.querySelector(".input");
  if (resultDisplay === null) {
    return;
  } else if (secondOperand === "") {
    resultDisplay.textContent = firstOperand;
  } else {
    resultDisplay.textContent = secondOperand;
  }
});
