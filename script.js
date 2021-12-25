function createCalculator() {
const wrapper = document.querySelector("#container");
for (i=9; i >= 0; i--){
    let tmp = document.createElement('button');
    tmp.className = 'number';
    tmp.style.cssText= 'background-color: orange';
    if (i === 9){
    //create division div
    const divide = document.createElement('button');
    divide.setAttribute('id', 'divide');
    divide.className = 'signs';
    divide.textContent = '÷';
    divide.style.cssText= 'background-color: orange';
    wrapper.appendChild(divide);
    }
    else if (i === 6){
    // create multiply div
    const multiply = document.createElement('button');
    multiply.setAttribute('id', 'multiply');
    multiply.className = 'signs';
    multiply.textContent = 'x';
    multiply.style.cssText= 'background-color: orange';
    wrapper.appendChild(multiply);
    }
    else if (i === 3){
    // create minus div
    const subtraction = document.createElement('button');
    subtraction.setAttribute('id', 'minus');
    subtraction.className = 'signs';
    subtraction.textContent = '-';
    subtraction.style.cssText= 'background-color: orange';
    wrapper.appendChild(subtraction);
    }
    else if (i === 0){
    // create 3 divs: plus, equal, decimal
    const plus = document.createElement('button');
    plus.setAttribute('id', 'plus');
    plus.className = 'signs';
    plus.textContent = '+';
    plus.style.cssText= 'background-color: orange';
    wrapper.appendChild(plus);

    const equal = document.createElement('button');
    equal.setAttribute('id', 'equal');
    equal.className = 'signs';
    equal.textContent = "=";
    equal.style.cssText= 'background-color: orange';
    wrapper.appendChild(equal);

    const decimal = document.createElement('button');
    decimal.setAttribute('id', 'decimal');
    decimal.className = 'number';
    decimal.value = 0;
    decimal.textContent = ".";
    decimal.style.cssText= 'background-color: orange';
    wrapper.appendChild(decimal);
    }
    tmp.textContent = i;
    wrapper.appendChild(tmp);
}
}

// this is the main function
createCalculator();
const box = document.querySelector('#screen');
const display = document.createElement('div');
display.className = 'display';
box.appendChild(display);
display.textContent = '0';
display.style.cssText = 'color: white';
const nums = document.querySelectorAll('.number');
const signs = document.querySelectorAll('.signs');
let container = [];
let arithmetic = '';
nums.forEach((div) => {
div.addEventListener("click", () => {
    if (div.id === 'decimal' && document.getElementById('decimal').value === '0' && display.textContent.length < 11){
    document.getElementById('decimal').value = '1';
    display.textContent += div.textContent;
    }
    else if (display.textContent.length < 12 && div.textContent != '.')
    display.textContent += div.textContent;
    container = clear();
});
signs.forEach((sign) => {
    sign.addEventListener("click", () => {
    document.getElementById('decimal').value = '0';
    if (sign.id === 'plus'){
        arithmetic = 'addition';
        if (display.textContent.length != 0){
        let A = getNum(display.textContent);
        container.push(A);
        }
        display.textContent = '';
    }
    else if (sign.id === 'minus'){
        arithmetic = 'minus';
        if (display.textContent.length != 0){
        let A = getNum(display.textContent);
        container.push(A);
        }
        display.textContent = '';
    }
    else if (sign.id === 'multiply'){
        arithmetic = 'multiply';
        if (display.textContent.length != 0){
        let A = getNum(display.textContent);
        container.push(A);
        }
        display.textContent = '';
    }
    else if (sign.id === 'divide'){
        arithmetic = 'divide';
        if (display.textContent.length != 0){
        let A = getNum(display.textContent);
        container.push(A);
        }
        display.textContent = '';
    }
    if (sign.id === 'equal'){
        // if there is only one value then we add in the other
        if (container.length === 1){
        let A = getNum(display.textContent);
        container.push(A);
        }
        let rawTotal, finalRes;
        if (container.length === 2){
        if (arithmetic === 'addition'){
            display.textContent = '';
            rawTotal = addition(container[0], container[1]);
        }
        else if (arithmetic === 'minus'){
            display.textContent = '';
            rawTotal = subtraction(container[0], container[1]);
        }
        else if (arithmetic === 'multiply'){
            display.textContent = '';
            rawTotal = mutiplication(container[0], container[1]);
        }
        else if (arithmetic === 'divide'){
            display.textContent = '';
            rawTotal = division(container[0], container[1]);
        }
        finalRes = transformRawValue(rawTotal);

        //this handles negative values with CSS style direction: rtl;
        if (finalRes < 0)
            display.textContent = (finalRes * -1) + '-';
        else
            display.textContent = finalRes;
        
        //delete all calculation result in order to start new ones
        container.pop();
        container.pop();
        }
    }
    });
});
});


// this functin returns the number of digits after the decimal
Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function lengthOfNum(a){
    return a.toString().length;
}

//arithmetic function
function addition(a, b){
    return a+b;
}

function subtraction(a,b){
    return a-b;
}

function mutiplication(a,b){
    return a*b;
}

function division(a,b){
    return a/b;
}

/*
rules for transforming raw value: 
1. parseFloat first to get rid of trailing zeros
2. check countDecimals: if <= 7 and > 0: output as usual
if > 7, round to the 7th place
3. if countDecimals return 0: check lengthOfNum: if > 12: convert
to scientific. split the string where the e starts. save the rest before the e
up to the nth place (possibly 7th)
else if lengthOfNum < 12: output as usual
NOTE: if a number is negative, change to positive, do the above, and switch back to negative
*/

function transformRawValue(a){
let res = parseFloat(a), decimal = res.countDecimals();
if (decimal > 0 && decimal <= 6){
    return res;
}
else if (decimal > 6){
    // round up to the 6th place
    return Math.round(res * 1000000) / 1000000;
}
else if (decimal === 0){
    let length = lengthOfNum(res);
    if (length > 12){
    let scientific = res.toExponential().toString();
    let part = scientific.split('e');
    let roundUp = parseFloat(part[0]);
    //round up to the 5th place
    let final = (Math.round(roundUp * 100000) / 100000).toString();
    let scientificNotation = 'e';
    scientificNotation += part[1];
    return final += scientificNotation;
    }
    else{
        return res;
    }
}
    return res;
}

// this function parses in the number on the screen for calculation
function getNum(str){
// str here is display.textContent
if (isNaN(Number(str)))
{
    // delete the last charater, which is the neg sign
    let res = str.slice(0,-1);
    return Number(res * -1);
}
    return Number(str);
}

// this function clears all number on the screen and start over
function clear(){
let clearButton = document.querySelector('#clear');
clearButton.onclick = () => {
    const display = document.querySelector('.display');
    display.textContent = '';
    container = [];
}
    return container;
}