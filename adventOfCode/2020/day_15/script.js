/////////////////////////////////////
// Day 15

// Part 1
/*
You catch the airport shuttle and try to book a new flight to your vacation island. Due to the storm, all direct flights have been cancelled, but a route is available to get around the storm. You take it.

While you wait for your flight, you decide to check in with the Elves back at the North Pole. They're playing a memory game and are ever so excited to explain the rules!

In this game, the players take turns saying numbers. They begin by taking turns reading from a list of starting numbers (your puzzle input). Then, each turn consists of considering the most recently spoken number:

If that was the first time the number has been spoken, the current player says 0.
Otherwise, the number had been spoken before; the current player announces how many turns apart the number is from when it was previously spoken.
So, after the starting numbers, each turn results in that player speaking aloud either 0 (if the last number is new) or an age (if the last number is a repeat).

For example, suppose the starting numbers are 0,3,6:

Turn 1: The 1st number spoken is a starting number, 0.
Turn 2: The 2nd number spoken is a starting number, 3.
Turn 3: The 3rd number spoken is a starting number, 6.
Turn 4: Now, consider the last number spoken, 6. Since that was the first time the number had been spoken, the 4th number spoken is 0.
Turn 5: Next, again consider the last number spoken, 0. Since it had been spoken before, the next number to speak is the difference between the turn number when it was last spoken (the previous turn, 4) and the turn number of the time it was most recently spoken before then (turn 1). Thus, the 5th number spoken is 4 - 1, 3.
Turn 6: The last number spoken, 3 had also been spoken before, most recently on turns 5 and 2. So, the 6th number spoken is 5 - 2, 3.
Turn 7: Since 3 was just spoken twice in a row, and the last two turns are 1 turn apart, the 7th number spoken is 1.
Turn 8: Since 1 is new, the 8th number spoken is 0.
Turn 9: 0 was last spoken on turns 8 and 4, so the 9th number spoken is the difference between them, 4.
Turn 10: 4 is new, so the 10th number spoken is 0.
(The game ends when the Elves get sick of playing or dinner is ready, whichever comes first.)

Their question for you is: what will be the 2020th number spoken? In the example above, the 2020th number spoken will be 436.

Here are a few more examples:

Given the starting numbers 1,3,2, the 2020th number spoken is 1.
Given the starting numbers 2,1,3, the 2020th number spoken is 10.
Given the starting numbers 1,2,3, the 2020th number spoken is 27.
Given the starting numbers 2,3,1, the 2020th number spoken is 78.
Given the starting numbers 3,2,1, the 2020th number spoken is 438.
Given the starting numbers 3,1,2, the 2020th number spoken is 1836.
Given your starting numbers, what will be the 2020th number spoken?

Your puzzle answer was 403.
*/

class Numbers {
    constructor(number, spoken) {
        this.number = number;
        this.spoken = spoken;
        this.lastSpoken = -1;
    }

    firstSpoken() {
        return this.lastSpoken === -1;
    }

    addSpoken(number) {
        this.lastSpoken = this.spoken;
        this.spoken = number;
        //this.spoken.push(number);
    }
}


/**
 * Ugly as fuck
 * @param {Array} testInput 
 * @param {Number} loopVal
 */
const part_1_shit = function (testInput, loopVal = 2020) {
    const numbers = [];
    let lastNumSpoken = -1;

    for (let i = 0; i < loopVal; i++) {
        if (i < testInput.length) {
            const newNum = new Numbers(testInput[i], i + 1);
            numbers.push(newNum);
            lastNumSpoken = newNum.number;
        } else {
            // Last number spoken is in the list, but it was first time spoken
            if (numbers.find(x => x.number === lastNumSpoken && x.firstSpoken())) {
                lastNumSpoken = 0;

                // Either we add a new number, or we add a spoken to existing
                if (numbers.find(x => x.number === lastNumSpoken)) {
                    numbers.find(x => x.number === lastNumSpoken).addSpoken(i + 1);
                } else {
                    const newNum = new Numbers(lastNumSpoken, i + 1);
                    numbers.push(newNum);
                }
                // We don't have the last num spoken in the list, so we add 0
            } else if (!numbers.find(x => x.number === lastNumSpoken)) {
                lastNumSpoken = 0;
                // Either we add a new number, or we add a spoken to existing
                if (numbers.find(x => x.number === lastNumSpoken)) {
                    numbers.find(x => x.number === lastNumSpoken).addSpoken(i + 1);
                } else {
                    const newNum = new Numbers(lastNumSpoken, i + 1);
                    numbers.push(newNum);
                }
            } else {
                // last num spoken will be value spoken before - time spoken before that
                const lastNumSpokenArr = numbers.find(x => x.number === lastNumSpoken);
                lastNumSpoken = lastNumSpokenArr.spoken - lastNumSpokenArr.lastSpoken;

                // lastNumSpoken = lastNumSpokenArr.spoken[lastNumSpokenArr.spoken.length - 1] - lastNumSpokenArr.spoken[lastNumSpokenArr.spoken.length - 2];

                // Either we add a new number, or we add a spoken to existing
                if (numbers.find(x => x.number === lastNumSpoken)) {
                    numbers.find(x => x.number === lastNumSpoken).addSpoken(i + 1);
                } else {
                    const newNum = new Numbers(lastNumSpoken, i + 1);
                    numbers.push(newNum);
                }
            }
        }
    }

    return lastNumSpoken;
}


const solution = function (testInput, loopVal = 2020) {
    let spoken = new Map();
    let justSpoke = 0;
    for (let i = 0; i < loopVal; i++) {
        // takes care of test input
        if (testInput[i] || testInput[i] === 0) {
            justSpoke = testInput[i];
            spoken.set(justSpoke, i + 1);
            // don't have just just spoke, add it, set just spoke 0
        } else if (!(spoken.has(justSpoke))) {
            spoken.set(justSpoke, i);
            justSpoke = 0;
            // has just spoke, get new just spoke, update when just spoke was spoken
        } else {
            let temp = spoken.get(justSpoke);
            spoken.set(justSpoke, i);
            justSpoke = i - temp;
        }
    }
    return justSpoke;
}

console.log(solution([16, 12, 1, 0, 15, 7, 11])); // 403

// Part 2
/*
Impressed, the Elves issue you a challenge: determine the 30000000th number spoken. For example, given the same starting numbers as above:

Given 0,3,6, the 30000000th number spoken is 175594.
Given 1,3,2, the 30000000th number spoken is 2578.
Given 2,1,3, the 30000000th number spoken is 3544142.
Given 1,2,3, the 30000000th number spoken is 261214.
Given 2,3,1, the 30000000th number spoken is 6895259.
Given 3,2,1, the 30000000th number spoken is 18.
Given 3,1,2, the 30000000th number spoken is 362.
Given your starting numbers, what will be the 30000000th number spoken?
*/

//console.log(part_1([0, 3, 6], 30000000));
// console.log(part_1([1, 3, 2]));
// console.log(part_1([2, 1, 3]));
// console.log(part_1([1, 2, 3]));
// console.log(part_1([2, 3, 1]));
// console.log(part_1([3, 2, 1]));
// console.log(part_1([3, 1, 2]));

console.log(solution([16, 12, 1, 0, 15, 7, 11], 30000000));