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

/**
 * Enum class representing current state of the calculator
 */
 class OperatorMode {
    static NONE = new OperatorMode("NONE");
    static ADD_MODE = new OperatorMode("ADD_MODE");
    static SUBTRACT_MODE = new OperatorMode("SUBTRACT_MODE");
    static MULTIPLY_MODE = new OperatorMode("MULTIPLY_MODE");
    static MULTIPLY_MODE = new OperatorMode("MULTIPLY_MODE");
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

function updateUI() {
    if (isOperatingValueShown) {
        display_top.textContent = operatingValue;
    } else {
        display_top.textContent = "";
    }
    display_bottom.textContent = currentValue.toString()
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
