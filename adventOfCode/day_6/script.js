/////////////////////////////////////
// Day 4

// Part 1

/*
As your flight approaches the regional airport where you'll switch to a much larger plane, customs declaration forms are distributed to the passengers.

The form asks a series of 26 yes-or-no questions marked a through z. All you need to do is identify the questions for which anyone in your group answers "yes". Since your group is just you, this doesn't take very long.

However, the person sitting next to you seems to be experiencing a language barrier and asks if you can help. For each of the people in their group, you write down the questions for which they answer "yes", one per line. For example:

abcx
abcy
abcz
In this group, there are 6 questions to which anyone answered "yes": a, b, c, x, y, and z. (Duplicate answers to the same question don't count extra; each question counts at most once.)

Another group asks for your help, then another, and eventually you've collected answers from every group on the plane (your puzzle input). Each group's answers are separated by a blank line, and within each group, each person's answers are on a single line. For example:

abc

a
b
c

ab
ac

a
a
a
a

b
This list represents answers from five groups:

The first group contains one person who answered "yes" to 3 questions: a, b, and c.
The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
The last group contains one person who answered "yes" to only 1 question, b.
In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.

For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?
*/

// Read in test file
var rawText;
var rawFile = new XMLHttpRequest();
rawFile.open('Get', 'input.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawText = rawFile.responseText;

        }
    }
}
rawFile.send(null);


// split test file into array
const rows = [];
rawText.split('\n').forEach(function (line) {
    rows.push(line);
});


// Loop through rows and combine until a space hits
// Then add what you've combined into a group

/**
 * 
 * @param {Array} rows 
 */
const getGroups = function (rows) {
    const groups = [];
    let group = '';
    rows.forEach(x => {
        // blank rows are hard to find, need to do this bullshit
        if (x.length === 0) {
            groups.push(group);
            group = '';
        } else {
            // need to add a space so my split works below
            group += x.trim();
        }
    });

    return groups
}

// For each group, get distinct letters (put in set?)
// Sum count for each

/**
 * 
 * @param {Array} groups 
 */
const sumDisctinct = function (groups) {
    let sum = 0;
    groups.forEach(x => {
        const distinct = new Set(x.trim());
        sum += distinct.size;
    });

    return sum
}
const groups = getGroups(rows);
const sum = sumDisctinct(groups);

console.log(sum);

// Part 2

/*
As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

Using the same example as above:

abc

a
b
c

ab
ac

a
a
a
a

b

This list represents answers from five groups:

In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
In the second group, there is no question to which everyone answered "yes".
In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
In the fourth group, everyone answered yes to only 1 question, a.
In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?
*/

// So, I still want to get the distinct letters per group
// Then I cycle through each letter
// And cycle through each person and check if they have the letter

/**
 * 
 * @param {Array} groups 
 */
const getDistinctLetters = function (groups) {
    const distinctGroups = [];
    groups.forEach(x => {
        distinctGroups.push(new Array(...new Set(x)));
    });

    return distinctGroups;
}

/**
 * 
 * @param {Array} rows 
 */
const getGroupsPeople = function (rows) {
    const groups = [];
    let group = '';
    rows.forEach(x => {
        if (x.length === 0) {
            groups.push(group.trim());
            group = '';
        } else {
            // need to add a space so my split works below
            group += x.trim() + ' ';
        }
    });

    return groups
}

const distinctLetters = getDistinctLetters(groups);
const groupsPeople = getGroupsPeople(rows);

// console.log(distinctLetters);
// console.log(groupsPeople);
// console.log(distinctLetters.length);

let total = 0;
for (let i = 0; i < groupsPeople.length; i++) {
    const groupDL = distinctLetters[i];
    const group = groupsPeople[i].split(' ');

    let groupDLCount = 0;
    // Cycle through the group distinct letters
    groupDL.forEach(dl => {
        let dlPresentInGroup = true;
        // Cycle through each person
        // TODO: Function, isDLPresentInGroup
        group.forEach(person => {
            // If a person in the group doesn't have letter, set to false
            if (!person.includes(dl)) {
                dlPresentInGroup = false;
            }
        });
        if (dlPresentInGroup) groupDLCount++;
        //console.log(groupDLCount);
    });
    total += groupDLCount
}
console.log(total);