const btn_0 = document.getElementById("btn_0");
const btn_1 = document.getElementById("btn_1");
const btn_2 = document.getElementById("btn_2");
const btn_3 = document.getElementById("btn_3");
const btn_4 = document.getElementById("btn_4");
const btn_5 = document.getElementById("btn_5");
const btn_6 = document.getElementById("btn_6");
const btn_7 = document.getElementById("btn_7");
const btn_8 = document.getElementById("btn_8");
const btn_9 = document.getElementById("btn_9");
const btn_clear = document.getElementById("btn_clear");
const btn_add = document.getElementById("btn_add");
const btn_subtract = document.getElementById("btn_subtract");
const btn_multiply = document.getElementById("btn_multiply");
const btn_divide = document.getElementById("btn_divide");
const btn_equals = document.getElementById("btn_equals");
const btn_swap_sign = document.getElementById("btn_swap_sign");
const display_bottom = document.getElementById("display_bottom");
const display_top = document.getElementById("display_top");
const display_wrapper = document.getElementById("display_wrapper");


/**
 * Enum class representing current state of the calculator
 */
 class OperatorMode {
    static NONE = new OperatorMode("NONE");
    static ADD_MODE = new OperatorMode("ADD_MODE");
    static SUBTRACT_MODE = new OperatorMode("SUBTRACT_MODE");
    static MULTIPLY_MODE = new OperatorMode("MULTIPLY_MODE");
    static DIVIDE_MODE = new OperatorMode("DIVIDE_MODE");
}

/**
 * Enum class representing which number was clicked
 */
class ValueClicked {
    static ZERO = new ValueClicked("ZERO");
    static ONE = new ValueClicked("ONE");
    static TWO = new ValueClicked("TWO");
    static THREE = new ValueClicked("THREE");
    static FOUR = new ValueClicked("FOUR");
    static FIVE = new ValueClicked("FIVE");
    static SIX = new ValueClicked("SIX");
    static SEVEN = new ValueClicked("SEVEN");
    static EIGHT = new ValueClicked("EIGHT");
    static NINE = new ValueClicked("NINE");
}

let currentOpMode = OperatorMode.NONE;
let operatingValue = 0;
let currentValue = 0;
let isOperatingValueShown = false;
let operationJustPerformed = false;

init();

function init() {
    clear();
}

function clear() {
    currentOpMode = OperatorMode.NONE;
    operatingValue = 0;
    currentValue = 0;
    isOperatingValueShown = false;
    operationJustPerformed = false;
    updateUI()
}


btn_0.addEventListener('click', function() { onNumberClicked(ValueClicked.ZERO) });
btn_1.addEventListener('click', function() { onNumberClicked(ValueClicked.ONE) });
btn_2.addEventListener('click', function() { onNumberClicked(ValueClicked.TWO) });
btn_3.addEventListener('click', function() { onNumberClicked(ValueClicked.THREE) });
btn_4.addEventListener('click', function() { onNumberClicked(ValueClicked.FOUR) });
btn_5.addEventListener('click', function() { onNumberClicked(ValueClicked.FIVE) });
btn_6.addEventListener('click', function() { onNumberClicked(ValueClicked.SIX) });
btn_7.addEventListener('click', function() { onNumberClicked(ValueClicked.SEVEN) });
btn_8.addEventListener('click', function() { onNumberClicked(ValueClicked.EIGHT) });
btn_9.addEventListener('click', function() { onNumberClicked(ValueClicked.NINE) });

btn_clear.addEventListener('click', function() { clear() });
btn_swap_sign.addEventListener('click', function() { 
    currentValue = swapSign(currentValue);
    updateUI();
});
btn_add.addEventListener('click', onAddClick);
btn_subtract.addEventListener('click', onSubtractClick);
btn_multiply.addEventListener('click', onMultiplyClick);
btn_divide.addEventListener('click', onDivideClick);
btn_equals.addEventListener('click', onEqualClicked);



document.addEventListener('keydown', onKeyPress);
window.addEventListener('resize', updateUI); // Makes sure display text is shrunk properly on resize


function updateUI() {
    if (isOperatingValueShown) {
        let text = operatingValue.toString()
        if (text.length > 9) {
            display_top.textContent = operatingValue.toExponential(5).toString();
        } else {
            display_top.textContent = text;
        }
    } else {
        display_top.textContent = "";
    }
    let text = currentValue.toString()
    // Changes font size between 100% and smaller if needed
    if (text.length > 9) {
        display_bottom.textContent = currentValue.toExponential(5).toString();
        
        if (display_wrapper.offsetWidth < 400) {
            display_bottom.style.fontSize = "75%";
            display_top.style.fontSize = "75%";    
        } else {
            display_bottom.style.fontSize = "100%";
            display_top.style.fontSize = "100%";    
        }
    } else {
        display_bottom.textContent = currentValue.toString()
        display_bottom.style.fontSize = "100%";
        display_top.style.fontSize = "100%";
    }
}


function onAddClick() {
    performOperation(OperatorMode.ADD_MODE);
}

function onSubtractClick() {
    performOperation(OperatorMode.SUBTRACT_MODE);
}

function onMultiplyClick() {
    performOperation(OperatorMode.MULTIPLY_MODE);
}


function onDivideClick() {
    performOperation(OperatorMode.DIVIDE_MODE);
}

function onEqualClicked() {
    let tempCurrent = 0;

    if (currentOpMode == OperatorMode.NONE) {
        return;
    }

    if (currentOpMode == OperatorMode.ADD_MODE) {
        tempCurrent = add(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.SUBTRACT_MODE) {
        tempCurrent = subtract(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.MULTIPLY_MODE) {
        tempCurrent = multiply(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.DIVIDE_MODE) {
        tempCurrent = divide(operatingValue, currentValue);
    }

    clear();
    currentValue = tempCurrent;
    operationJustPerformed = true;
    updateUI();
}

function performOperation(newOperatorMode) {
    if (currentOpMode == OperatorMode.NONE) {
        operatingValue = currentValue;
    }

    if (currentOpMode == OperatorMode.ADD_MODE) {
        operatingValue = add(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.SUBTRACT_MODE) {
        operatingValue = subtract(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.MULTIPLY_MODE) {
        operatingValue = multiply(operatingValue, currentValue);
    }

    if (currentOpMode == OperatorMode.DIVIDE_MODE) {
        operatingValue = divide(operatingValue, currentValue);
    }

    currentValue = 0;
    isOperatingValueShown = true;
    currentOpMode = newOperatorMode;
    updateUI();
}

function onNumberClicked(valueClicked) {
    if (operationJustPerformed) {
        clear();
    }
    switch (valueClicked) {
        case ValueClicked.ZERO:
            currentValue = appendNum(currentValue, 0);
            break;
        case ValueClicked.ONE:
            currentValue = appendNum(currentValue, 1);
            break;
        case ValueClicked.TWO:
            currentValue = appendNum(currentValue, 2);
            break;
        case ValueClicked.THREE:
            currentValue = appendNum(currentValue, 3);
            break;
        case ValueClicked.FOUR:
            currentValue = appendNum(currentValue, 4);
            break;
        case ValueClicked.FIVE:
            currentValue = appendNum(currentValue, 5);
            break;
        case ValueClicked.SIX:
            currentValue = appendNum(currentValue, 6);
            break;
        case ValueClicked.SEVEN:
            currentValue = appendNum(currentValue, 7);
            break;
        case ValueClicked.EIGHT:
            currentValue = appendNum(currentValue, 8);
            break;
        case ValueClicked.NINE:
            currentValue = appendNum(currentValue, 9);
            break;
        default:
            break;
    }
    updateUI();
}

/**
 * Function that determines what to do with various key events
 * 
 * @param {KeyboardEvent} e - Keyboard event from the key press
 */
function onKeyPress(e) {
    switch (e.key) {
        case "0":
            onNumberClicked(ValueClicked.ZERO);
            break;
         case "1":
            onNumberClicked(ValueClicked.ONE);
            break;
        case "2":
            onNumberClicked(ValueClicked.TWO);
            break;
        case "3":
            onNumberClicked(ValueClicked.THREE);
            break;
        case "4":
            onNumberClicked(ValueClicked.FOUR);
            break;
        case "5":
            onNumberClicked(ValueClicked.FIVE);
            break;
        case "6":
            onNumberClicked(ValueClicked.SIX);
            break;
        case "7":
            onNumberClicked(ValueClicked.SEVEN);
            break;
        case "8":
            onNumberClicked(ValueClicked.EIGHT);
            break;
        case "9":
            onNumberClicked(ValueClicked.NINE);
            break;
        case "+":
            onAddClick();
            break;
        case "-":
            onSubtractClick();
            break;
        case "*":
            onMultiplyClick();
            break;
        case "/":
            onDivideClick();
            break;
        case "Enter":
            onEqualClicked();
            break;
        default:
            break;
    }
}


/**
 * Appends a value to another value. 
 * If value to append is fractional it will be rounded down.
 * 
 * @param {number} currentValue - value to append to
 * @param {number} value - value to append
 * @returns {number}
 */
function appendNum(currentValue, value) {
    if (value > 9 || value < 0) { // If value to append is too large, return 0
        return 0;
    } 
    let currentValueArray = [];
    let isNegative = false;
    let tempCurVal = currentValue;

    if (currentValue < 0) {
        isNegative = true
        tempCurVal = Math.abs(currentValue);
    }

    while (tempCurVal >= 1) {
        currentValueArray.unshift(Math.floor(tempCurVal % 10));
        tempCurVal = tempCurVal / 10;
    }
    currentValueArray.push(Math.floor(value));
    let returnValue = 0;
    currentValueArray.forEach(num => {
        returnValue = (returnValue * 10) + num;
    })
    if (isNegative) {
        return returnValue * -1;
    }
    return returnValue;
}

/**
 * Swaps the sign of the given value. 
 * Eg. 204 -> -204, or vice versa
 * @param {number} value value of which to swap sign
 */
function swapSign(value) {
    return value * -1;
}

function add(val, valToAdd) {
    return val + valToAdd;
}

function multiply(val, valToMultiplyBy) {
    return val * valToMultiplyBy;
}

function subtract(val, valToSubtractBy) {
    return val - valToSubtractBy;
}

function divide(val, valToDivideBy) {
    return val / valToDivideBy;
}