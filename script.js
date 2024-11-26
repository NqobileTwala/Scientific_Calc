let display = document.getElementById("display");
let resetOnNextNumber = false;

function clearDisplay() {
  display.value = "0";
  resetOnNextNumber = false;
}

function backspace() {
  display.value = display.value.slice(0, -1) || "0";
}

function insert(value) {
  if (resetOnNextNumber && !isNaN(value)) {
    display.value = ""; // Clear display if entering a number after calculation
    resetOnNextNumber = false;
  }

  if (display.value === "0") display.value = "";

  if (value === "sqrt") {
    display.value += "sqrt("; //Append "sqrt("
  } else if (value === "sq") {
    display.value += "sq(";
  } else {
    display.value += value;
  }
}

function toggleSign() {
  if (display.value.startsWith("-")) {
    display.value = display.value.slice(1);
  } else {
    display.value = "-" + display.value;
  }
}

function calculate() {
  try {
    let expression = display.value;

    expression = expression.replace(/(\d)(\()/g, "$1*$2"); //multiplication between a number and an open parenthesis

    expression = expression
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/exp\(/g, "Math.exp(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/sin\(/g, "Math.sin(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/sq\(/g, "Math.pow(");

    let openParentheses = (expression.match(/\(/g) || []).length;
    let closeParentheses = (expression.match(/\)/g) || []).length;
    if (openParentheses > closeParentheses) {
      expression += ")".repeat(openParentheses - closeParentheses);
    }

    display.value = Function('"use strict"; return (' + expression + ")")();
    resetOnNextNumber = true;
  } catch (error) {
    display.value = "Error";
    resetOnNextNumber = true;
  }
}
