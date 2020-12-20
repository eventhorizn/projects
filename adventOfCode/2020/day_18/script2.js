const fs = require('fs');
const input = fs.readFileSync('C:\\Users\\gary.hake\\source\\personal\\projects\\adventOfCode\\2020\\day_18\\input.txt', 'utf-8').split('\n').filter(x => x);

const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

function part1(input) {
    const results = input
        .map(line =>
            line
                .replace(/\s+/g, '')
                .split('')
                .map(x => (isNaN(x) ? x : parseInt(x)))
                .reverse()
        )
        .map(tokens => {
            const stack = [];
            while (stack.length > 1 || tokens.length > 0) {
                while (stack.length < 3) {
                    stack.push(tokens.pop());
                }
                const third = stack.pop();
                const second = stack.pop();
                const first = stack.pop();
                if (first === '(' && third === ')') {
                    stack.push(second);
                } else if (
                    !isNaN(first) &&
                    Object.keys(ops).includes(second) &&
                    !isNaN(third)
                ) {
                    stack.push(ops[second](first, third));
                } else if (tokens.length > 0) {
                    stack.push(first);
                    stack.push(second);
                    stack.push(third);
                    stack.push(tokens.pop());
                }
            }

            return stack[0];
        });

    return results.reduce((acc, cur) => acc + cur);
}

function part2(input) {
    const results = input
        .map(line =>
            line
                .replace(/\s+/g, '')
                .split('')
                .map(x => (isNaN(x) ? x : parseInt(x)))
                .reverse()
        )
        .map(tokens => {
            const stack = [];
            while (stack.length > 1 || tokens.length > 0) {
                while (stack.length < 3) {
                    stack.push(tokens.pop());
                }
                const next = tokens[tokens.length - 1];
                const third = stack.pop();
                const second = stack.pop();
                const first = stack.pop();
                if (first === '(' && third === ')') {
                    stack.push(second);
                } else if (
                    !isNaN(first) &&
                    Object.keys(ops).includes(second) &&
                    !isNaN(third) &&
                    next !== '+'
                ) {
                    stack.push(ops[second](first, third));
                } else if (tokens.length > 0) {
                    stack.push(first);
                    stack.push(second);
                    stack.push(third);
                    stack.push(tokens.pop());
                }
            }

            return stack[0];
        });

    return results.reduce((acc, cur) => acc + cur);
}

console.log(part1(input));
console.log(part2(input)); // 122438593522757
