/////////////////////////////////////
// Day 18

// Part 1

const fs = require('fs');

const lines = fs.readFileSync('C:\\Users\\gary.hake\\source\\personal\\projects\\adventOfCode\\2020\\day_18\\input.txt', 'utf-8').split('\n')

const getExpression = function (line) {
    let offset = 0;

    function parseSubExpr() {
        /** @type {Expression} */
        const sequence = [];

        while (offset < line.length) {
            // get next character from input
            const nextChar = line[offset];
            offset++;

            switch (nextChar) {
                case '(': {
                    sequence.push(parseSubExpr());
                    break;
                }
                case ')': {
                    return sequence;
                }
                case '+':
                case '*': {
                    sequence.push(nextChar);
                    break;
                }
                default: {
                    sequence.push(parseInt(nextChar));
                    break;
                }
            }
        }

        // end of input
        return sequence;
    }

    // kick off recursion
    return parseSubExpr();
}

/**
 * @param {string} expr 
 */
const calcExpression = function (left, operator, right) {
    if (operator === "+") {
        return left + right;
    } else {
        return left * right;
    }
}

function evalExpression(expression) {
    let val;
    let operator;

    // compute expression
    for (const token of expression) {
        // token is + or *
        if (typeof (token) === 'string') {
            operator = token;
            // token is value
        } else if (typeof (token) === 'number') {
            if (val === undefined) { // left side
                val = token;
            } else { // we've found our right side
                val = calcExpression(val, operator, token);
            }
        } else if (Array.isArray(token)) { // sub expression
            const subExprValue = evalExpression(token); // recursively find the value
            if (val === undefined) {// left side
                val = subExprValue;
            } else { // sub expr is right side
                val = calcExpression(val, operator, subExprValue);
            }

        } else {
            throw new Error(`Unknown token: '${token}'`);

        }
    }

    // return total
    return val;
}
// let test = '1 + (2 * 3) + (4 * (5 + 6))';
// test = test.split(" ").join("");

// const expr = getExpression(test);
// const answer = evalExpression(expr);

// const answerArray = [];

// lines.forEach(line => {
//     line = line.split(" ").join("");
//     const expr = getExpression(line);
//     answerArray.push(evalExpression(expr));
// });

// console.log(answerArray.reduce((x, y) => x + y));


// Part 2

function getValue(token) {
    if (typeof (token) === 'number') {
        return token;
    }
    if (Array.isArray(token)) {
        return evalExpression(token);
    }
    throw new Error(`Cannot get value of ${token}`);
}

function evalExpression2(expression) {
    let additionSolved = false;
    while (expression.length > 1) {
        let foundAddition = false;

        for (let i = 1; i < expression.length - 1; i++) {
            const token = expression[i];

            if (additionSolved) {
                // solve multiplication, ONLY if addition is solved
                if (token === '*') {
                    // solve and replace this sequence
                    expression.splice(i - 1, 3, getValue(expression[i - 1]) * getValue(expression[i + 1]));
                    i--;
                }
            } else {
                // solve addition, ONLY if addition is not solved
                if (token === '+') {
                    // solve and replace this sequence
                    expression.splice(i - 1, 3, getValue(expression[i - 1]) + getValue(expression[i + 1]));

                    // mark as solved
                    foundAddition = true;
                    i--;
                }
            }
        }

        // check to see if we have now solved the addition
        if (!foundAddition) {
            additionSolved = true;
        }
    }

    // return total
    return getValue(expression[0]);
}

const answerArray2 = [];

lines.forEach(line => {
    line = line.split(" ").join("");
    const expr = getExpression(line);
    answerArray2.push(evalExpression2(expr));
});

console.log(answerArray2.reduce((x, y) => x + y));