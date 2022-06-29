const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");

// Print the number on result text content

clearBtn.addEventListener("click", clear);

let timesFirstNumSelected = 0;
let bottonPressed = false;

const calculator = {
    opperatorSelected: false,
    firstSelected: false,
    firstNum: "",
    opperator: "",
    secondNum: "",
    preview: "",
    result: "",
};

console.table(calculator);

buttons.forEach(btn => btn.addEventListener("click", () => {

    // Clear button behaviour
    if (btn.getAttribute("data-btn") === "clear"){
        return;
    };

    // Equals button behaviour
    if (btn.getAttribute("data-btn") === "equals"){
        console.table(`Soy el calculator en el button behaviour ${console.table(calculator)}`);
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
            if(calculator.firstSelected){
                return;
            }
            timesFirstNumSelected ++;
            console.log({timesFirstNumSelected});
            
            console.log(`soy el calculator en el momento que están guardando mi primer número}`);
            console.table(calculator);

// Por aquí está el erroor!
            calculator.firstNum += btn.textContent;

            console.log(`Me acaban de guardar en el calculator y valgo: ${calculator["firstNum"]}`);
            console.table(calculator);
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
        console.table(`Soy el calculator después de guardar el segundo número ${console.table(calculator)}`);
        return;
    }
    console.log(btn.textContent);


}));




// Operations

function makeResult(){
    if (!calculator.firstNum && !calculator.opperator && !calculator.secondNum){
        return;
    }
    console.log("Soy el resultado antes que me den al preview")
    console.table(calculator);
    console.log("Soy el resultado después que me den al preview")
    calculator.result = calculator.preview;
    console.table(calculator);
    result.textContent = calculator.result;
    preview.textContent = "0";
    resetValues();
    console.table(calculator);

    // por aquí esta el bucle, creo
    console.log("voy a volver a guardar el primer valor");
    console.log(`Soy el calculator en el make result`);

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
    console.log(btn);
    btn.classList.remove("active");
}


function clear(){
    resetValues();
    calculator.result = "";
    calculator.firstNum = 0;
    preview.textContent = "0";
    result.textContent = "0";
    firstSelected = false;
    console.log(`Soy el calculator despues de clear`);
    console.table(calculator);
}

// For clearing values on equals and when linking multiply operations

function resetValues(){
    calculator.preview = "";
    calculator.opperatorSelected = false;
    calculator.firstSelected = true;
    calculator.firstNum = parseInt(calculator.result);
    calculator.opperator = "";
    calculator.secondNum = 0;
    console.log(`Soy el calculator despues de resetValues`);
    console.table(calculator);

}

window.addEventListener("keyup", removeTransition);