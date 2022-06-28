const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");

// Print the number on result text content

clearBtn.addEventListener("click", clear);

const calculator = {
    opperatorSelected: false,
    firstNum: "",
    opperator: "",
    secondNum: "",
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


    // Operator buttons behaviour

    if (btn.getAttribute("data-btn") === "opperator"){
        if(calculator.opperatorSelected){
            return;
        }
        calculator.opperatorSelected = true;
        calculator.opperator = btn.textContent;
        result.textContent = calculator.firstNum + calculator.opperator;
        return;
    }

    // Number buttons behaviour
    if(btn.getAttribute("data-btn") === "number"){
        if (!calculator.opperatorSelected){

            calculator.firstNum += btn.textContent;
            result.textContent = calculator.firstNum;
            console.log(calculator.firstNum);
            return;
        }

        calculator.secondNum += parseInt(btn.textContent);
        result.textContent = calculator.firstNum + calculator.opperator + calculator.secondNum;
        preview.textContent = operate(calculator.firstNum,calculator.secondNum,calculator.opperator);
        console.log(calculator.secondNum);
        return;
    }
    console.log(btn.textContent);

    result.textContent += btn.textContent;
}));


// Operations

function makeResult(){
    if (!calculator.firstNum && !calculator.opperator && !calculator.secondNum){
        return;
    }
    result.textContent = preview.textContent;
    resetValues();
    console.log(result.textContent);
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
    for(let i=1; i<pow; i++){
        base *= base;
    }
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
    result.textContent += btn.textContent
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
    preview.textContent = "0";
    result.textContent = "0";
    calculator.opperatorSelected = false;
}
function resetValues(){
    calculator.firstNum = "";
    calculator.opperator = "";
    calculator.secondNum = "";
    
}

window.addEventListener("keyup", removeTransition);