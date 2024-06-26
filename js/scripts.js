let firstNumber = 0;
let secondNumber = 0;
let action = "+";
let answer = 0;
let isHistoryOpen = false;
let answerCalculated = false;

const input = document.getElementById("calc-input");
const calculationSpan = document.getElementById("calculation");
const historyToggle = document.getElementById("history-toggle");
const paper = document.querySelector(".paper");
const clearHistoryBtn = document.getElementById("history-clear-btn");

const calculationHistory = [];

const updatePaper = () => {
    if (calculationHistory.length > 0) {
        paper.innerHTML = calculationHistory.map((x) => `<p>${x.firstNumber} ${x.action} ${x.secondNumber} = ${x.answer}</p>`).join('');
    } else {
        paper.innerHTML = "";
    }
}

historyToggle.addEventListener("input", (e) => {
    isHistoryOpen = e.target.checked;
});

clearHistoryBtn.addEventListener("click", () => {
    calculationHistory.length = 0;
    paper.classList.add("trash");
    setTimeout(() => {
        updatePaper();
    }, 500);
    setTimeout(() => {
        paper.classList.remove("trash");
    }, 1000);
});

const onNumberClick = (number) => {
    new Audio("assets/click.mp3").play();

    const splitInput = input.value.split(" ");

    if (number === 0 && splitInput[splitInput.length - 1] === "0") {
        return;
    }

    if (splitInput[splitInput.length - 1] === "0") {
        input.value = input.value.slice(0, -1);
    }

    if (answerCalculated) {
        input.value = "";
        calculationSpan.innerHTML = "";
        answerCalculated = false;
    }

    input.value += number;
}

const onActionClick = (action) => {
    new Audio("assets/click.mp3").play();

    if (input.value === "") {
        return;
    }

    const inputArr = input.value.trim().split(" ");

    if (inputArr.length > 1 && isNaN(parseInt(inputArr[1]))) {
        if (inputArr[1] !== action) {
            inputArr[1] = action;
            input.value = inputArr.join(" ");
            inputArr.length === 2 && (input.value += " ");
        }
        return;
    }
    input.value += " " + action + " ";
    action = action;

    if (answerCalculated) {
        answerCalculated = false;
    }
}

const calculateAnswer = () => {
    switch (action) {
        case "+":
            answer = firstNumber + secondNumber;
            break;
        case "-":
            answer = firstNumber - secondNumber;
            break;
        case "x":
            answer = firstNumber * secondNumber;
            break;
        case "/":
            answer = firstNumber / secondNumber;
            break;
    }
}

const addToHistory = () => {
    const historyItem = {
        firstNumber,
        action,
        secondNumber,
        answer
    };

    calculationHistory.unshift(historyItem);

    if (calculationHistory.length > 6) {
        calculationHistory.length = 6;
    }
}

const onCountClick = () => {
    new Audio("assets/click.mp3").play();
    const splitted = input.value.split(" ");

    if (splitted.length < 3) {
        return;
    }

    firstNumber = parseFloat(splitted[0]);
    action = splitted[1];
    secondNumber = parseFloat(splitted[2]);

    calculateAnswer();
    input.value = answer;

    calculationSpan.innerText = `${firstNumber} ${action} ${secondNumber}`;

    if (isHistoryOpen) {
        addToHistory();
        updatePaper();
    }

    answerCalculated = true;
}

const onCleanClick = () => {
    firstNumber = 0;
    secondNumber = 0;
    action = "+";
    answer = 0;
    answerCalculated = false;
    input.value = "0";
    calculationSpan.innerText = "";

    new Audio("assets/click.mp3").play();
}

const onFractionClick = () => {
    const inputArr = input.value.trim().split(" ");
    const lastIndex = inputArr.length - 1;
    const last = inputArr[lastIndex];

    if (!isNaN(parseFloat(last)) && !last.includes(".")) {
        inputArr[lastIndex] += ".";
        input.value = inputArr.join(" ");
    } else if (last === "") {
        inputArr[0] = "0.";
        input.value = inputArr.join(" ").trim();
    } else if (isNaN(parseFloat(last))) {
        inputArr.push("0.");
        input.value = inputArr.join(" ");
    }

    new Audio("assets/click.mp3").play();
}

const onBackspaceClick = () => {
    let inputValue = input.value;
    if (inputValue.endsWith(" ")) {
        inputValue = inputValue.slice(0, -3);
        input.value = inputValue;
    } else {
        inputValue = inputValue.slice(0, -1);
        input.value = inputValue;
    }

    new Audio("assets/click.mp3").play();
}
