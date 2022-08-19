const calculator = {
  displayValue: `0`,
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector("#screen-display");
  display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector(".keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  //   if click is not on a button, leave function:
  if (!target.matches("button")) {
    return;
  }
  //   show our clicked button - operator
  if (target.classList.contains("operator")) {
    console.log("operator", target.value);
    return;
  }
  //   if it is a decimal, print decimal
  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  //   if it is all clear - print it
  if (target.classList.contains("AC")) {
    console.log("All Clear", target.value);
    return;
  }
  //   everything else is a digit
  inputDigit(target.value);
  updateDisplay();
});

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { displayValue, firstOperand, operator } = calculator;
  const inputValue = parseFloat(displayValue);
  if (firstOperand === null && isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
    console.log(calculator.firstOperand);
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

// https://freshman.tech/calculator/