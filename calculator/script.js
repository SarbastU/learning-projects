const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const previousOutput = document.querySelector('[data-previous-output]');
const currentOutput = document.querySelector('[data-current-output]');
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');

class Calculator {
    constructor(oldOutput, newOutput) {
        this.oldOutput = oldOutput;
        this.newOutput = newOutput;
        this.clear();
        }

    clear() {
        this.oldNumber = '';
        this.newNumber = '';
        this.operation = '';
        this.update();
    }

    delete() {
        this.newNumber = this.newNumber.toString().slice(0, -1);
        this.update();
    }

    calcOperator(operation) {
        if (this.newNumber === "") return;
        if (this.oldNumber !== "") this.calculate();
        this.operation = operation;
        this.oldNumber = this.newNumber;
        this.newNumber = "";
        this.update();
    }

    calculate() {
        this.currentCalc = parseFloat(this.newNumber);
        this.previousCalc = parseFloat(this.oldNumber);
        if (this.oldNumber === "" || this.newNumber === "" ) return;
        this.operation === "*" ? this.previousCalc *= this.currentCalc
        : this.operation === "÷" ? this.previousCalc /= this.currentCalc
        : this.operation === "+" ? this.previousCalc += this.currentCalc
        : this.previousCalc -= this.currentCalc;
        this.clear();
        this.newNumber = this.previousCalc.toString();
        this.update();
    }

    appendNumber(number) {
        if (number === "." && this.newNumber.includes('.')) 
            this.newNumber = this.newNumber.replace(".", "");
        this.newNumber += number;
        this.update();
    }

    displayNum(num) {
       return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    update() {
        this.newOutput.innerText = this.displayNum(this.newNumber);
        this.oldOutput.innerText = this.displayNum(this.oldNumber) + this.operation;
    }
}

const calculator = new Calculator(previousOutput, currentOutput);

numberButtons.forEach(x => x.addEventListener('click', () => calculator.appendNumber(x.innerText)));

operatorButtons.forEach(x => x.addEventListener('click', () => calculator.calcOperator(x.innerText)));

allClearButton.addEventListener('click', () => calculator.clear());

equalsButton.addEventListener('click', () => calculator.calculate());

deleteButton.addEventListener('click', () => calculator.delete());