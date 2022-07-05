const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");

const calculator = {
    operatorSelected: false,
    firstSelected: false,
    secondSelected: false,
    equalPressed: false,
    firstPeriodPressed: false,
    secondPeriodPressed: false,
    firstNum: "",
    operator: "",
    secondNum: "",
    preview: "",
    result: "",
};

buttons.forEach(btn => btn.addEventListener("click", () => {

    // Period button behaviour

    if (btn.getAttribute("data-btn") === "period") {
        dialPeriod();
    }


    // Clear button behaviour
    if (btn.getAttribute("data-btn") === "clear") {
        clear();
    }

    // Equals button behaviour
    if (btn.getAttribute("data-btn") === "equals") {
        makeResult();
        return;
    }

    // Delete button behaviour

    if (btn.getAttribute("data-btn") === "delete") {
        deleteInputs();
        return
    }

    // Operator buttons behaviour

    if (btn.getAttribute("data-btn") === "operator" && calculator.firstSelected) {

        if (calculator.secondNum) {
            makeResult();
        }
        dialOperator(btn);
    }

    // Number buttons behaviour
    if (btn.getAttribute("data-btn") === "number") {

        dialNumber(btn);
    }
}));

function dialNumber(btn) {

    //  Picking first operand
    if (!calculator.operatorSelected) {

        // Set calcultor.firstnum to the new value if the 
        // equals button have already been pressed
        // This makes possible to do a new operation and clearing the one before

        if (calculator.equalPressed === true) {
            calculator.firstNum = "";
            calculator.equalPressed = false;
        }
        calculator.firstNum += btn.textContent;
        calculator.result = String(calculator.firstNum);
        result.textContent = calculator.result;
        calculator.firstSelected = true;
        return;
    }

    // Picking second oppperand
    calculator.secondNum += btn.textContent;
    calculator.result = calculator.firstNum + calculator.operator + calculator.secondNum;
    result.textContent = calculator.result;
    calculator.preview = operate(calculator.firstNum, calculator.secondNum, calculator.operator);
    preview.textContent = calculator.preview;
    calculator.secondSelected = true;
    return;
}

function dialOperator(btn) {
    if (calculator.operatorSelected) {
        return;
    }
    calculator.operatorSelected = true;
    calculator.operator = btn.textContent;
    calculator.result = calculator.firstNum + calculator.operator;
    result.textContent = calculator.result;
    return;
};

function dialPeriod(){
    if (calculator.secondPeriodPressed) {
        return;
    }
    if (calculator.operatorSelected) {
        calculator.secondPeriodPressed = true;
        calculator.secondNum += ".";
        calculator.result = calculator.firstNum + calculator.operator + calculator.secondNum;
        result.textContent = calculator.result;
        calculator.preview = operate(calculator.firstNum, calculator.secondNum, calculator.operator);
        preview.textContent = calculator.preview;
        calculator.secondSelected = true;
        return;
    }

    if (calculator.firstPeriodPressed) {
        return;
    }
    calculator.firstPeriodPressed = true;
    calculator.firstNum += ".";
    calculator.result = String(calculator.firstNum);
    result.textContent = calculator.result;
    calculator.firstSelected = true;
    return;
}



// Operations
function makeResult() {

    // Doing this if will prevent firstNum resulting in NaN
    if (!calculator.operator && !calculator.secondNum) {
        return;
    };
    if (!calculator.secondSelected) {
        return;
    }
    if (operate(calculator.firstNum, calculator.secondNum, calculator.operator) === "cero") {
        clear();
        result.textContent = "Error!";
        return;
    }

    calculator.equalPressed = true;
    calculator.result = calculator.preview;
    result.textContent = calculator.result;
    preview.textContent = "0";
    resetValues();
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {

    // Escape dividing by zero
    if (a === 0) {

        return "cero";
    };

    let res = a / b;
    if (res % 1 === 0) {
        result.textContent;
        return res;
    }

    return parseFloat(res.toFixed(4));
}

function pow(base, pow) {
    let result = base;
    for (let i = 1; i < pow; i++) {
        result *= base;
    }
    return result;
}

function deleteInputs() {

    // Deletes from second operand

    if (calculator.secondSelected) {

        // Checks if second number has period and avoids stacking them
        if ((calculator.secondNum % 1 === 0)) {
            calculator.secondPeriodPressed = false;
        }
        calculator.secondNum = calculator.secondNum.toString().substring(0, calculator.secondNum.toString().length - 1);
        calculator.result = calculator.firstNum + calculator.operator + calculator.secondNum;
        result.textContent = calculator.result;
        calculator.preview = operate(calculator.firstNum, calculator.secondNum, calculator.operator);
        preview.textContent = calculator.preview;

        if (!calculator.secondNum) {
            calculator.result = calculator.firstNum + calculator.operator;
            calculator.secondSelected = false;
            calculator.preview = "0"
            preview.textContent = calculator.preview;
            return;
        }
        return;
    }
    // Deletes operator

    if (calculator.operatorSelected) {
        calculator.operator = "";
        calculator.operatorSelected = false;
        calculator.result = calculator.firstNum;
        result.textContent = calculator.result;
        return;
    }
    // Deletes first selected  

    if (calculator.firstSelected) {

        // Checks if first number has period and avoids stacking periods

        if ((calculator.firstNum % 1 === 0)) {
            calculator.firstPeriodPressed = false;
        }
        calculator.firstNum = calculator.firstNum.toString().substring(0, calculator.firstNum.toString().length - 1);
        calculator.result = calculator.firstNum;
        result.textContent = calculator.result;

        if (!calculator.firstNum) {
            clear();
            return;
        }
        return;
    }


}

function operate(firstNum, secondNum, operand) {
    if (operand === "+") {

        return parseFloat(add(parseFloat(firstNum), parseFloat(secondNum)).toFixed(4));
    }
    if (operand === "−") {
        return parseFloat(substract(parseFloat(firstNum), parseFloat(secondNum)).toFixed(4));
    }
    if (operand === "×") {
        return parseFloat(multiply(parseFloat(firstNum), parseFloat(secondNum)).toFixed(4));
    }
    if (operand === "÷") {
        return parseFloat(divide(parseFloat(firstNum), parseFloat(secondNum)).toFixed(4));
    }
    if (operand === "xy") {
        return parseFloat(pow(parseFloat(firstNum), parseFloat(secondNum)).toFixed(4));
    }

}

// Keyboard input interaction

window.addEventListener("keydown", pressButton);

function pressButton(e) {
    if (e.repeat) {
        // This method prevents doing the rest of the action of the keydown 
        // multiple times if you hold it
        e.preventDefault();
        return;
    }

    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;

    // Equals key behaviour
    // The equals key was supposed to be the enter key but got problems 
    // with chrome inputing the focused element
    // This can be avoided with: 
    // document.activeElement.blur();
    btn.classList.add("active");

    if (btn.getAttribute("data-btn") === "period") {
        dialPeriod();
    }

    if (btn.getAttribute("data-key") === "69") {
        makeResult();
        return;
    }

    // Clear key behaviour
    if (btn.getAttribute("data-key") === "67") {
        clear();
        return;
    }
    if (btn.getAttribute("data-key") === "8") {

        deleteInputs();
        return;

    }


    if (btn.getAttribute("data-btn") === "operator" && calculator.firstSelected) {
        if (calculator.secondNum) {
            makeResult();
        }
        dialOperator(btn);
        return;
    }
    if (btn.getAttribute("data-btn") === "number") {
        dialNumber(btn);
    }
};

// Returns the button styles after keyup

window.addEventListener("keyup", removeTransition);
function removeTransition(e) {
    bottonPressed = false;
    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;
    btn.classList.remove("active");
}

// Had to make to separate funcitons to clear values due to the makeResult method only using one

// For clearing values on equals and when linking multiply operations
function resetValues() {
    calculator.preview = "";
    calculator.operatorSelected = false;
    calculator.firstSelected = true;
    calculator.firstNum = parseFloat(calculator.result);
    calculator.operator = "";
    calculator.secondNum = "";
    calculator.secondSelected = false;
}

function clear() {
    resetValues();
    calculator.result = "";
    calculator.firstNum = "";
    preview.textContent = "0";
    result.textContent = "0";
    calculator.firstPeriodPressed = false;
    calculator.secondPeriodPressed = false;
    calculator.firstSelected = false;
    calculator.equalPressed = false;
}