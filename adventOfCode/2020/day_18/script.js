// Part 1

const fs = require('fs');
const { getegid } = require('process');
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
 * Expectation is 3 length, 2+2
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

const answerArray = [];

lines.forEach(line => {
    line = line.split(" ").join("");
    const expr = getExpression(line);
    answerArray.push(evalExpression(expr));
});

console.log(answerArray.reduce((x, y) => x + y));