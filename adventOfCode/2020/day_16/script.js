/////////////////////////////////////
// Day 16

// Part 1

/*
As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.

Unfortunately, you can't actually read the words on the ticket. You can, however, read the numbers, and so you figure out the fields these tickets must have and the valid ranges for values in those fields.

You collect the rules for ticket fields, the numbers on your ticket, and the numbers on other nearby tickets for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).

The rules for ticket fields specify a list of fields that exist somewhere on the ticket and the valid ranges of values for each field. For example, a rule like class: 1-3 or 5-7 means that one of the fields in every ticket is named class and can be any value in the ranges 1-3 or 5-7 (inclusive, such that 3 and 5 are both valid in this field, but 4 is not).

Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:

.--------------------------------------------------------.
| ????: 101    ?????: 102   ??????????: 103     ???: 104 |
|                                                        |
| ??: 301  ??: 302             ???????: 303      ??????? |
| ??: 401  ??: 402           ???? ????: 403    ????????? |
'--------------------------------------------------------'
Here, ? represents text in a language you don't understand. This ticket might be represented as 101,102,103,104,301,302,303,401,402,403; of course, the actual train tickets you're looking at are much more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!

Start by determining which tickets are completely invalid; these are tickets that contain values which aren't valid for any field. Ignore your ticket for now.

For example, suppose you have the following notes:

class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
It doesn't matter which position corresponds to which field; you can identify invalid nearby tickets by considering only whether tickets contain values that are not valid for any field. In this example, the values on the first nearby ticket are all valid for at least one field. This is not true of the other three nearby tickets: the values 4, 55, and 12 are are not valid for any field. Adding together all of the invalid values produces your ticket scanning error rate: 4 + 55 + 12 = 71.

Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?
*/

const fs = require('fs');
const input = fs.readFileSync('C:\\Users\\gary.hake\\source\\personal\\projects\\adventOfCode\\2020\\day_16\\input.txt', 'utf-8').split('\n');

/**
 * 
 * @param {Array} input 
 */
const getApprovedNumbersSet = function (input) {
    const rules = input
        .slice(0, input.indexOf(''));
    const numFromRules = [];
    rules.forEach(x => {
        const bothRange = x.slice(x.indexOf(':') + 2);

        const firstRange = bothRange.slice(0, bothRange.indexOf('or') - 1);
        const startFirstRange =
            Number(firstRange.slice(0, firstRange.indexOf('-')));
        const endFirstRange =
            Number(firstRange.slice(firstRange.indexOf('-') + 1));

        const secondRange = bothRange.slice(bothRange.indexOf('or') + 3);
        const startSecondRange =
            Number(secondRange.slice(0, firstRange.indexOf('-')));
        const endSecondRange =
            Number(secondRange.slice(firstRange.indexOf('-') + 1));

        for (let i = startFirstRange; i <= endFirstRange; i++) {
            numFromRules.push(i);
        }
        for (let i = startSecondRange; i <= endSecondRange; i++) {
            numFromRules.push(i);
        }
    });

    return new Set(numFromRules);
}

/**
 *
 * @param {Array} input
 */
const getOtherTicketNums = function (input) {
    const firstSlice = input.slice(input.indexOf('') + 1);
    const ticketNums = firstSlice.slice(firstSlice.indexOf('') + 2);
    const allNums = [];

    ticketNums.map(x => x.split(',')
        .map(y => allNums.push(Number(y))));

    return allNums;
}

/**
 * 
 * @param {Array} ruleNumbers 
 * @param {Array} otherTicketNumbers 
 */
const findBadNums = function (ruleNumbers, otherTicketNumbers) {
    const badNums = [];
    for (let i = 0; i < otherTicketNumbers.length; i++) {
        if (!ruleNumbers.includes(otherTicketNumbers[i])) {
            badNums.push(otherTicketNumbers[i]);
        }
    }
    return badNums;
}

const otherTicketNums = getOtherTicketNums(input);
const setRuleNums = getApprovedNumbersSet(input);
const badNums = findBadNums([...setRuleNums], otherTicketNums);
//console.log(badNums.reduce((a, b) => a + b)); //21956

// Part 2

/*
Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?
*/

/**
 * 
 * @param {Array} input 
 */
const getRules = function (input) {
    const rules = input
        .slice(0, input.indexOf(''));
    const rulesMap = new Map();

    rules.forEach(x => {
        const ruleNumbers = [];
        const ruleName = x.slice(0, x.indexOf(':'));
        const bothRange = x.slice(x.indexOf(':') + 2);

        const firstRange = bothRange.slice(0, bothRange.indexOf('or') - 1);
        const startFirstRange =
            Number(firstRange.slice(0, firstRange.indexOf('-')));
        const endFirstRange =
            Number(firstRange.slice(firstRange.indexOf('-') + 1));

        const secondRange = bothRange.slice(bothRange.indexOf('or') + 3);
        const startSecondRange =
            Number(secondRange.slice(0, secondRange.indexOf('-')));
        const endSecondRange =
            Number(secondRange.slice(secondRange.indexOf('-') + 1));

        for (let i = startFirstRange; i <= endFirstRange; i++) {
            ruleNumbers.push(i);
        }
        for (let i = startSecondRange; i <= endSecondRange; i++) {
            ruleNumbers.push(i);
        }

        rulesMap.set(ruleName, ruleNumbers);
    });

    return rulesMap;
}

/**
 *
 * @param {Array} input
 */
const getYourTicketNums = function (input) {
    const firstSlice = input
        .slice(input.indexOf('') + 2)
    const ticketNums = firstSlice
        .slice(0, input.indexOf('') - 2)[0]
        .split(',')
        .map(x => Number(x));

    return ticketNums;
}

/**
 *
 * @param {Array} input
 * @param {Array} badNums
 */
const getOtherValidTickets = function (input, badNums) {
    const firstSlice = input.slice(input.indexOf('') + 1);
    const ticketNums = firstSlice.slice(firstSlice.indexOf('') + 2);
    const allOtherValidTicketsMap = new Map();

    let mapIndex = 0;
    for (let i = 0; i < ticketNums.length; i++) {
        const indTickNums = ticketNums[i].split(',').map(x => Number(x));

        if (!indTickNums.some(x => badNums.includes(x))) {
            allOtherValidTicketsMap.set(mapIndex, indTickNums);
            mapIndex++;
        }
    }

    return allOtherValidTicketsMap;
}

/**
 * 
 * @param {Map<string, Array>} rulesMap 
 * @param {Map<Number, Array>} validTickets 
 */
const mapKeyToNumberPositionPass = function (rulesMap, validTickets) {
    // So, for each key in rules map, I want to check the passing values
    // Then I want to check the valid tickets
    // For each value in the array, I want to see if that value passes
    // So my map will look like {key, [array positions where true]}

    const passingMap = new Map();

    const blah = validTickets.values();

    // so go through each map key
    // and see which array values it's true for
    for (const [key, value] of rulesMap.entries()) {
        // go through each array value of each ticket
        const passingArrayVals = [];
        for (let i = 0; i < 20; i++) {
            let allTicketAtArrayValPass = true;

            validTickets.forEach(ticket => {
                if (!value.includes(ticket[i])) {
                    const test = ticket[i];
                    allTicketAtArrayValPass = false;
                }
            });

            if (allTicketAtArrayValPass) {
                passingArrayVals.push(i);
            }
        }
        passingMap.set(key, passingArrayVals);
    }

    return passingMap;
}

/**
 * 
 * @param {Map<string, Array} passingMap 
 */
const mapStillDirty = function (passingMap) {
    for (const [key, value] of passingMap.entries()) {
        if (value.length > 1) {
            return true;
        }
    }

    return false;
}

/**
 * Map passed in will have multiple array vals where it passes
 * The idea is that this will find all 1 val arrays and remove
 * those vals from any arrays w/ multiple values
 * One value per key is the goal 
 * @param {Map<string, Array>} passingMap
 */
const cleanPassingMap = function (passingMap) {
    const oneValueRows = new Map();
    const multValueRows = new Map();

    for (const [key, value] of passingMap.entries()) {
        if (value.length === 1) {
            oneValueRows.set(key, value);
        } else {
            multValueRows.set(key, value);
        }
    }

    for (const [_, value] of oneValueRows.entries()) {
        for (const [_, value2] of multValueRows.entries()) {
            const index = value2.indexOf(value[0]);
            if (index > -1) {
                value2.splice(index, 1);
            }
        }
    }

    return new Map([...oneValueRows, ...multValueRows]);
}

/**
 * 
 * @param {Array} myTicketNums 
 * @param {Map<String, Array>} cleanMap 
 */
const mapCleanRulesToMyTicket = function (myTicketNums, cleanMap) {
    const myMap = new Map();

    for (const [key, value] of cleanMap.entries()) {
        myMap.set(key, myTicketNums[value[0]]);
    }

    return myMap;
}

/**
 * 
 * @param {Map<String, Array} myTicketNums 
 */
const getDepartureValuesMult = function (myTicketNums) {
    const departureVals = [];

    for (const [key, value] of myTicketNums.entries()) {
        if (key.includes('departure')) {
            departureVals.push(value);
        }
    }

    return departureVals.reduce((a, b) => a * b);
}

const rulesMap = getRules(input);
const myTicketNums = getYourTicketNums(input);
const otherValidTickets = getOtherValidTickets(input, badNums);
const mapKeyNumberPos = mapKeyToNumberPositionPass(rulesMap, otherValidTickets);

let cleanMap;
let escape = 0;
do {
    cleanMap = cleanPassingMap(mapKeyNumberPos);
} while (mapStillDirty(cleanMap));

const myTicketMap = mapCleanRulesToMyTicket(myTicketNums, cleanMap);
console.log(getDepartureValuesMult(myTicketMap));