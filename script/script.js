const history = document.querySelector("[data-p=history]");
const result = document.querySelector("[data-p=result]");
const buttons = document.querySelectorAll("button");

// Print the number on result text content

buttons.forEach( button => button.addEventListener("click", () => {
    console.log(button.getAttribute("data-key"))

}));

window.addEventListener("keydown", pressButton);

function pressButton(e){
    const btn = document.querySelector(`[data-key="${e.keyCode}"]`);
    if (!btn) return;
    if (btn.getAttribute("data-key") === "13"){
        registerOnHistory();
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

function registerOnHistory(){
    history.textContent = result.textContent;
    result.textContent = "";
}

window.addEventListener("keyup", removeTransition);