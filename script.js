
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
