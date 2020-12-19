const inputChars = Array.from(
    require('fs')
        .readFileSync('C:\\Users\\gary.hake\\source\\personal\\projects\\adventOfCode\\2020\\day_18\\input.txt', 'utf-8')
        .split('\r\n')
        .map(line => Array.from(line.replace(/\s/g, '')))
);
const inputExpressions = inputChars.map(line => {
    // index of next token in the input
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
                    // TODO maybe consume more numbers?
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
});

/**
 * @param {Token} token 
 * @returns {number}
 */
function getValue(token) {
    if (typeof (token) === 'number') {
        return token;
    }
    if (Array.isArray(token)) {
        return evalExpression(token);
    }
    throw new Error(`Cannot get value of ${token}`);
}

/**
 * @param {Expression} expression
 * @returns {number}
 */
function evalExpression(expression) {
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

// Part 1
const part1Answer = inputExpressions.reduce((total, expr) => total + evalExpression(expr), 0);
console.log(`Part 1: the total is ${part1Answer}`);