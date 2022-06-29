const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");

// Print the number on result text content

clearBtn.addEventListener("click", clear);

const calculator = {
    opperatorSelected: false,
    firstSelected: false,
    firstNum: "",
    opperator: "",
    secondNum: "",
    preview: "",
    result: "",
};

buttons.forEach(btn => btn.addEventListener("click", () => {

    // Clear button behaviour
    if (btn.getAttribute("data-btn") === "clear"){
        return;
    };

    // Equals button behaviour
    if (btn.getAttribute("data-btn") === "equals"){

        console.log(`Soy first num y : ${!calculator.firstNum}, yo opeartor y: ${!calculator.opperator} y yo el secondNum: ${!calculator.secondNum}`);

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
        
        if (!calculator.opperatorSelected){

            calculator.firstNum += btn.textContent;
            calculator.result = calculator.firstNum;
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
    console.log(btn.textContent);


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
    console.table(calculator);
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
        console.log("hola");
        return pow(parseInt(firstNum), parseInt(secondNum));
    }
    
}



window.addEventListener("keydown", pressButton);

function pressButton(e){
    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;
    if (btn.getAttribute("data-key") === "13"){
        registerOnPreview();
        return;
    }
    if (btn.getAttribute("data-key") === "67"){
        clear();
        return;
    }
    
    btn.classList.add("active");
    calculator.result += btn.textContent
    result.textContent = calculator.result;
};

function removeTransition(e){
    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;
    console.log(btn);
    btn.classList.remove("active");
}

function registerOnPreview(){
    preview.textContent = result.textContent;
    result.textContent = "0";
}

function clear(){
    calculator.result = "";
    preview.textContent = "0";
    result.textContent = "0";
    firstSelected = false
    resetValues();
}
function resetValues(){
    calculator.preview = "";
    calculator.opperatorSelected = false;
    calculator.firstSelected = true;
    calculator.firstNum = calculator.result;
    calculator.opperator = "";
    calculator.secondNum = "";
}

window.addEventListener("keyup", removeTransition);