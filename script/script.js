const result = document.querySelector("[data-p=result]");
const preview = document.querySelector("[data-p=preview]");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("[data-btn=clear]");

// Print the number on result text content

clearBtn.addEventListener("click", clear);

const calculator = {

};

let firstNum = 0;
let secondNum = 0;
let opperatorSelected = false;
let opperator = "";


buttons.forEach(btn => btn.addEventListener("click", () => {
    if (btn.getAttribute("data-btn") === "clear"){
        return;
    };
    if (btn.getAttribute("data-btn") === "equals"){
        operate();
        return;
    }

    if (btn.getAttribute("data-btn") === "opperator"){
        opperatorSelected = true;
        opperator = parseInt(btn.textContent);
        console.log({opperator});
        return;
    }


    if(btn.getAttribute("data-btn") === "number"){
        if (!opperatorSelected){
            firstNum += btn.textContent;
            console.log({firstNum});
            return;
        }
        secondNum += parseInt(btn.textContent);
        console.log({secondNum});
        return;
    }
    console.log(btn.textContent)

    result.textContent += btn.textContent;
}));


// Operations

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
    if (opperand === "add"){
        return console.log(add(firstNum, secondNum));
    }
}




buttons.forEach( button => button.addEventListener("click", () => {
    console.log(button.getAttribute("data-key"))

}));

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
    opperatorSelected = false;
    firstNum = "";
    secondNum = "";
}

window.addEventListener("keyup", removeTransition);