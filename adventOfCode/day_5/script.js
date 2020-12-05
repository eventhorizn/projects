/////////////////////////////////////
// Day 4

// Part 1

/*
You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

For example, consider just the first seven characters of FBFBBFFRLR:

Start by considering the whole range, rows 0 through 127.
F means to take the lower half, keeping rows 0 through 63.
    mid = ceil(low + high / 2) - 1
    mid = 0 + 127 / 2 - 1 = 64 - 1 = 63
B means to take the upper half, keeping rows 32 through 63.
    mid = floor(low + high / 2) + 1
    mid = 0 + 63 / 2 = 31.5 + 1 = 31 + 1 = 32 
F means to take the lower half, keeping rows 32 through 47.
    mid = ceil(low + high / 2) - 1
    mid = ceil(32 + 63) / 2 - 1 = 47
B means to take the upper half, keeping rows 40 through 47.
B keeps rows 44 through 47.
F keeps rows 44 through 45.
The final F keeps the lower of the two, row 44.
The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

For example, consider just the last 3 characters of FBFBBFFRLR:

Start by considering the whole range, columns 0 through 7.
R means to take the upper half, keeping columns 4 through 7.
L means to take the lower half, keeping columns 4 through 5.
The final R keeps the upper of the two, column 5.
So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

Here are some other boarding passes:

BFFFBBFRRR: row 70, column 7, seat ID 567.
FFFBBBFRRR: row 14, column 7, seat ID 119.
BBFFBBFRLL: row 102, column 4, seat ID 820.
As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?
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


const test = 'BFFFBBFRRR';
const init_row_range = [0, 127];
const init_col_range = [0, 7];

/**
 * 
 * @param {String} character 
 * @param {Array} range 
 */
const bin_search = function (character, range) {
    let mod_range = [];
    let mid = 0;
    //mid = ceil(low + high / 2) - 1
    if (character === 'F' || character === 'L') {
        mid = Math.ceil((range[0] + range[1]) / 2) - 1;
        mod_range = [range[0], mid]
    }

    // mid = floor(low + high / 2) + 1
    if (character === 'B' || character === 'R') {
        mid = Math.floor((range[0] + range[1]) / 2) + 1;
        mod_range = [mid, range[1]]
    }

    return mod_range;
}

const find_mid = function (search_string, range) {
    for (let i = 0; i < search_string.length; i++) {
        range = bin_search(search_string[i], range);

        if (range[1] === range[0]) {
            return range[0];
        }
    }
}

// const row_test = 'FFFBBBF';
// const answer_row = find_mid(row_test, init_row_range);
// console.log(answer_row);

// const col_test = 'RRR';
// const answer_col = find_mid(col_test, init_col_range)
// console.log(answer_col);

/**
 * 
 * @param {String} id 
 */
const get_id = function (id) {
    const row_slice = id.slice(0, 7);
    const col_slice = id.slice(7, id.length);

    const row = find_mid(row_slice, init_row_range);
    const col = find_mid(col_slice, init_col_range);

    return (row * 8) + col;
}

let max = 0;
rows.forEach(x => {
    let curr_id = get_id(x);
    if (curr_id > max) {
        max = curr_id;
    }
});

console.log(max); //813

// Part 2

/*
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?
*/

// Ok, so I need to find seats that haven't been filled in the provided list

// Get Ids from input
const getIds = function () {
    const ids = [];
    rows.forEach(x => {
        ids.push(get_id(x));
    });

    return ids;
}

// Get all possible ids
const getAllIds = function () {
    const ids = [];
    for (let row = 0; row <= init_row_range[1]; row++) {
        for (let col = 0; col <= init_col_range[1]; col++) {
            id = (row * 8) + col;
            ids.push(id);
        }
    }
    return ids;
}

const ids = getIds();
ids.sort((a, b) => a - b);

const all_ids = getAllIds();
all_ids.sort((a, b) => a - b);

// finding missing ids
const missing_ids = [];
all_ids.forEach(x => {
    if (!ids.includes(x)) {
        missing_ids.push(x);
    }
});
missing_ids.sort((a, b) => a - b);

// if the item before a missing id and after exists, we have our seat
let found = 0;
missing_ids.forEach(x => {
    const before = x - 1;
    const after = x + 1;

    if (ids.includes(before) && ids.includes(after)) {
        found = x;
    }
});

console.log(found); // 612