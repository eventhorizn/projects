/////////////////////////////////////
// Day 7

// Part 1

/*
You land at the regional airport in time for your next flight. In fact, it looks like you'll even have time to grab some food: all flights are currently delayed due to issues in luggage processing.

Due to recent aviation regulations, many rules (your puzzle input) are being enforced about bags and their contents; bags must be color-coded and must contain specific quantities of other color-coded bags. Apparently, nobody responsible for these regulations considered how long they would take to enforce!

For example, consider the following rules:

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
These rules specify the required contents for 9 bag types. In this example, every faded blue bag is empty, every vibrant plum bag contains 11 bags (5 faded blue and 6 dotted black), and so on.

You have a shiny gold bag. If you wanted to carry it in at least one other bag, how many different bag colors would be valid for the outermost bag? (In other words: how many colors can, eventually, contain at least one shiny gold bag?)

In the above rules, the following options would be available to you:

A bright white bag, which can hold your shiny gold bag directly.
A muted yellow bag, which can hold your shiny gold bag directly, plus some other bags.
A dark orange bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
A light red bag, which can hold bright white and muted yellow bags, either of which could then hold your shiny gold bag.
So, in this example, the number of bag colors that can eventually contain at least one shiny gold bag is 4.

How many bag colors can eventually contain at least one shiny gold bag? (The list of rules is quite long; make sure you get all of it.)
*/

// Read in test file
let rawText;
let rawFile = new XMLHttpRequest();
rawFile.open('Get', 'input.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawText = rawFile.responseText;

        }
    }
}
rawFile.send(null);


/**
 * 
 * @param {String} row 
 */
const cleanRow = function (row) {
    return row.substr(0, row.length - 1)
        .replaceAll(" bags", "")
        .replaceAll(" bag", "");
}

/**
 * 
 * @param {String} rawText 
 */
const getRuleMap = function (rawText) {
    const ruleMap = new Map();

    rawText.split('\n').forEach(function (line) {
        const row = cleanRow(line);
        ruleMap.set(row.split(" contain ")[0],
            row.split(" contain ")[1]);
    });

    return ruleMap;
}
//console.log(getRuleMap(rawText));

const ruleMap = getRuleMap(rawText);

/**
 * 
 * @param {String} key 
 */
const hasShinyGold = function (key) {
    const temp = ruleMap.get(key);

    if (ruleMap.get(key).includes('shiny gold')) {
        return true; // escape
    } else {
        // searching values recursively
        const values = ruleMap.get(key).split(', ');

        for (let i = 0; i < values.length; i++) {
            const val = values[i];
            if (val !== 'no other') {
                if (!hasShinyGold(val.substr(2))) {
                    continue;
                } else {
                    return true; // escape
                }
            }
        }
    }

    return false;
}

const part_1 = function () {
    let bagCount = 0;

    for (const [key] of ruleMap.entries()) {
        if (hasShinyGold(key)) bagCount++;
    }

    return bagCount;
}

console.log(part_1()); // 248

// Part 2

/*
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
*/

const part_2 = function (bagColor = 'shiny gold') {
    const rows = ruleMap.get(bagColor).split(', ');
    let totalBags = 0;

    for (let i = 0; i < rows.length; i++) {
        const val = rows[i];
        if (val !== 'no other') {
            let num = Number(val.substr(0, 1));
            totalBags += num + num * part_2(val.substr(2));
        }
        else {
            break; // escape
        }
    }

    return totalBags;
}

console.log(part_2()); // 57281