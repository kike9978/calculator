const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");

const calculator = {
    operatorSelected: false,
    firstSelected: false,
    equalPressed: false,
    firstNum: "",
    operator: "",
    secondNum: "",
    preview: "",
    result: "",
};

clearBtn.addEventListener("click", clear);

buttons.forEach(btn => btn.addEventListener("click", () => {

    // Clear button behaviour
    if (btn.getAttribute("data-btn") === "clear") {
        return;
    };

    // Equals button behaviour
    if (btn.getAttribute("data-btn") === "equals") {
        makeResult();
        return;
    }

    // Delete button behaviour

    if (btn.getAttribute("data-btn") === "delete") {
        deleteFromResult();
        return
    }


    // Operator buttons behaviour

    if (btn.getAttribute("data-btn") === "operator" && calculator.firstSelected) {

        dialOperator(btn);
        // if (calculator.operatorSelected) {
        //     return;
        // }
        // calculator.operatorSelected = true;
        // calculator.operator = btn.textContent;
        // calculator.result = calculator.firstNum + calculator.operator;
        // result.textContent = calculator.result;
        // return;
    }


    // if (btn.getAttribute("data-btn") === "operator" && btn.textContent === "xy"){
    //     calculator.operatorSelected = true;
    //     calculator.operator = btn.textContent;
    //     result.textContent = calculator.firstNum + calculator.operator;
    //     return;
    // }

    // Number buttons behaviour
    if (btn.getAttribute("data-btn") === "number") {
        dialNumber(btn);
    }
}));

function dialNumber(btn) {
    //  Picking first operand

    if (!calculator.operatorSelected) {

        console.table(calculator);

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
    return;
}

function dialOperator(btn){
    if (calculator.operatorSelected) {
        return;
    }
    calculator.operatorSelected = true;
    calculator.operator = btn.textContent;
    calculator.result = calculator.firstNum + calculator.operator;
    result.textContent = calculator.result;
    return;
};



// Operations
function makeResult() {

    // Doing this if will prevent firstNum resulting in NaN
    if (!calculator.operator && !calculator.secondNum) {
        return;
    };

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
        clear();
        result.textContent = "If you do that the world will explode";
        return
    };

    let result = a / b;
    if (result % 1 === 0) {
        return result;
    }

    return parseFloat(result.toFixed(4));
}

function pow(base, pow) {
    let result = base;
    for (let i = 1; i < pow; i++) {
        result *= base;
    }
    return result;
}

function deleteFromResult() {
    calculator.result = calculator.result.slice(calculator.result.length);
    result
}

function operate(firstNum, secondNum, operand) {
    if (operand === "+") {
        return add(parseInt(firstNum), parseInt(secondNum));
    }
    if (operand === "−") {
        return substract(parseInt(firstNum), parseInt(secondNum));
    }
    if (operand === "×") {
        return multiply(parseInt(firstNum), parseInt(secondNum));
    }
    if (operand === "÷") {
        return divide(parseInt(firstNum), parseInt(secondNum));
    }
    if (operand === "xy") {
        return pow(parseInt(firstNum), parseInt(secondNum));
    }

}

// Keyboard input interaction

window.addEventListener("keydown", pressButton);

function pressButton(e) {
    if (e.repeat) {
        // This method prevents doing the rest of the action of the keydown multiple times if you hold it
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

    if (btn.getAttribute("data-key") === "69") {
        makeResult();
        btn.classList.add("active");
        return;
    }

    // Clear key behaviour
    if (btn.getAttribute("data-key") === "67") {
        clear();
        btn.classList.add("active");
        return;
    }
    if (btn.getAttribute("data-btn") === "operator"){
        
        dialOperator(btn);
    }
    dialNumber(btn);
};

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
    // if(!isNaN(parseInt(calculator.result))){
    //     console.log(!isNaN(parseInt(calculator.result)));
    // }
    calculator.firstNum = parseInt(calculator.result);
    console.table(calculator);
    calculator.operator = "";
    calculator.secondNum = "";

    // Conflict when clearing values on equals return NaN on firstNum;
}

function clear() {
    resetValues();
    calculator.result = "";
    calculator.firstNum = "";
    preview.textContent = "0";
    result.textContent = "0";
    calculator.firstSelected = false;
}