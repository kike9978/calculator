const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");





const calculator = {
    opperatorSelected: false,
    firstSelected: false,
    firstNum: "",
    opperator: "",
    secondNum: "",
    preview: "",
    result: "",
};

clearBtn.addEventListener("click", clear);

buttons.forEach(btn => btn.addEventListener("click", () => {

    // Clear button behaviour
    if (btn.getAttribute("data-btn") === "clear"){
        return;
    };

    // Equals button behaviour
    if (btn.getAttribute("data-btn") === "equals"){
        makeResult();
        return;
    }

    // Delete button behaviour

    if (btn.getAttribute("data-btn") === "delete"){
        deleteFromResult();
        return
    }


    // Operator buttons behaviour

    if (btn.getAttribute("data-btn") === "opperator" && calculator.firstSelected){
        if(calculator.opperatorSelected){
            return;
        }
        calculator.opperatorSelected = true;
        calculator.opperator = btn.textContent;
        calculator.result = calculator.firstNum + calculator.opperator;
        result.textContent = calculator.result;
        return;
    }


    // if (btn.getAttribute("data-btn") === "opperator" && btn.textContent === "xy"){
    //     calculator.opperatorSelected = true;
    //     calculator.opperator = btn.textContent;
    //     result.textContent = calculator.firstNum + calculator.opperator;
    //     return;
    // }

    // Number buttons behaviour
    if(btn.getAttribute("data-btn") === "number"){

        //  Picking first opperand
        
        if(!calculator.opperatorSelected){
            if(calculator.firstSelected){
                return;
            }

            calculator.firstNum += btn.textContent;
            calculator.result = String(calculator.firstNum);
            result.textContent = calculator.result;
            calculator.firstSelected = true;

            return;
        }

        // Picking second oppperand

        calculator.secondNum += btn.textContent;
        calculator.result = calculator.firstNum + calculator.opperator + calculator.secondNum;
        result.textContent = calculator.result;
        calculator.preview = operate(calculator.firstNum,calculator.secondNum,calculator.opperator);
        preview.textContent = calculator.preview;
        return;
    }



}));




// Operations

function makeResult(){
    if (!calculator.firstNum && !calculator.opperator && !calculator.secondNum){
        return;
    }
    calculator.result = calculator.preview;
    result.textContent = calculator.result;
    preview.textContent = "0";
    resetValues();

    // por aquí esta el bucle, creo

}

function add(a,b){
    return a+b;
}

function substract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function pow(base, pow){
    let result = base;
    for(let i=1; i<pow; i++){
         result *= base;
    }
    return result;
}

function deleteFromResult(){
    calculator.result = calculator.result.slice(calculator.result.length);
    result
}


function operate(firstNum, secondNum, opperand){
    if (opperand === "+"){
        return add(parseInt(firstNum), parseInt(secondNum));
    }
    if (opperand === "−"){
        return substract(parseInt(firstNum), parseInt(secondNum));
    }
    if (opperand === "×"){
        return multiply(parseInt(firstNum), parseInt(secondNum));
    }
    if (opperand === "÷"){
        return divide(parseInt(firstNum), parseInt(secondNum));
    }
    if (opperand === "xy"){
        return pow(parseInt(firstNum), parseInt(secondNum));
    }
    
}

// Keyboard input interaction

window.addEventListener("keydown", pressButton);

function pressButton(e){
    if (e.repeat){
        e.preventDefault();
        return;
    } 

    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;

    // Equals key behaviour
    if (btn.getAttribute("data-key") === "13"){
        makeResult();
        return;
    }
    
    // Clear key behaviour
    if (btn.getAttribute("data-key") === "67"){
        clear();
        return;
    }
    
    
    btn.classList.add("active");
    calculator.result += btn.textContent
    result.textContent = calculator.result;
};

function removeTransition(e){
    bottonPressed = false;
    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;
    btn.classList.remove("active");
}


function resetValues(){
    calculator.preview = "";
    calculator.opperatorSelected = false;
    calculator.firstSelected = true;
    calculator.firstNum = parseInt(calculator.result);
    calculator.opperator = "";
    calculator.secondNum = "";
    console.table(calculator);
}

function clear(){
    resetValues();
    calculator.result = "";
    calculator.firstNum = "";
    preview.textContent = "0";
    result.textContent = "0";
    calculator.firstSelected = false;
    console.table(calculator);
}

// For clearing values on equals and when linking multiply operations


window.addEventListener("keyup", removeTransition);