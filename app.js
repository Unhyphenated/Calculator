// Basic mathematical functions
function add(...args) {
    let digits = Array.from(args);
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        sum += args[i];
    }
    return sum;
};

function subtract(subFrom, ...args) {
    let digits = Array.from(args);
    let value = 0;
    for (let i = 0; i < digits.length; i++) {
        subFrom -= args[i];
        value = subFrom;
    }
    return value;
};

function multiply(...args) {
    let digits = Array.from(args);
    let product = 1;
    for (let i = 0; i < digits.length; i++) {
        product *= args[i];
    }
    return product;
}

function divide(divFrom, ...args) {
    let digits = Array.from(args);
    let quotient = 0;
    for (let i = 0; i < digits.length; i++) {
        divFrom /= args[i];
        quotient = divFrom;
    }
    return quotient;
};

function operate(x, y, operator) {
    x = Number(x);
    y = Number(y);
    switch (operator) {
        case "+":
            return add(x, y)
        case "-":
            return subtract(x, y)
        case "×":
            return multiply(x, y)
        case "÷":
            if(y === 0) return null;
            else return divide(x, y)
        default:
            return null;
    }
};

class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.clear();
    }

    clear() {
        this.currentOperation = "";
        this.previousOperation = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperation = this.currentOperation.slice(0, -1);
    }

    appendNumber(number) {
        if(number === "." && this.currentOperation.includes(".")) return;
        this.currentOperation = this.currentOperation.toString() + number.toString();
    }

    chooseOperator(operator) {
        if(this.currentOperation === '') return;
        if(this.previousOperation !== '') {
            this.compute();
        }
        this.operation = operator;
        this.previousOperation = this.currentOperation + operator;
        this.currentOperation = '';
    }

    compute() {
        let result;
        const x = parseFloat(this.previousOperation);
        const y = parseFloat(this.currentOperation);
        if(isNaN(x) || isNaN(y)) return;
        switch (this.operation) {
            case "+":
                result = add(x, y)
                break
            case "-":
                result = subtract(x, y)
                break
            case "×":
                result = multiply(x, y)
                break
            case "÷":
                if(y === 0) return null;
                else result = divide(x, y)
                break 
            default:
                return;
        }
        this.currentOperation = result;
        this.previousOperation = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperationTextElement.innerText = this.currentOperation;
        this.previousOperationTextElement.innerText = this.previousOperation;      
    }
};

const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equals]');
const currentOperationTextElement = document.querySelector('[data-current-operation]');
const previousOperationTextElement = document.querySelector('[data-previous-operation]');

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement);

numberButtons.forEach(button => 
    {button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(button => 
    {button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

clearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})