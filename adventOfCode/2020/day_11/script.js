/////////////////////////////////////
// Day 11

// Part 1

/*
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?
*/

// Read in file
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

// split test file into 2D array
const board = [];
rawText.split('\n').forEach(function (line) {
    const lineArr = line.trim().split('');
    board.push(lineArr);
});

const occupied = '#';
const empty = 'L';
const floor = '.';

/**
 * 
 * @param {Array} array
 */
const copyBoard = function (array) {
    const newArray = array.map(function (arr) {
        return arr.slice();
    });

    return newArray;
}

/**
 * 
 * @param {Array} array 
 * @param {Number} row
 * @param {Number} col
 */
const getElement = function (array, row, col) {
    let el;
    try {
        el = array[row][col];
    } catch {
        el = '-1';
    }

    if (!el) el = '-1';

    return el;
}

/**
 * 
 * @param {Array} array 
 * @param {Number} x 
 * @param {Number} y 
 */
const getAdjacentElements = function (array, row, col) {
    // this is ugly as shit, I know there's a clever way, but fuck it
    const adjEls = [];

    const topLeft = getElement(array, row - 1, col - 1);
    const top = getElement(array, row, col - 1);
    const topRight = getElement(array, row + 1, col - 1);
    const midLeft = getElement(array, row - 1, col);
    const midRight = getElement(array, row + 1, col);
    const botLeft = getElement(array, row - 1, col + 1);
    const bot = getElement(array, row, col + 1);
    const botRight = getElement(array, row + 1, col + 1);

    adjEls.push(topLeft, top, topRight, midLeft, midRight, botLeft, bot, botRight);

    return adjEls;
}

/**
 * 
 * @param {Array} array 
 */
const noOccupiedSeats = function (adjacentEls) {
    for (let i = 0; i < adjacentEls.length; i++) {
        if (adjacentEls[i] === occupied) return false;
    }

    return true;
}

/**
 * 
 * @param {Array} array 
 */
const atLeastFourOccupied = function (adjacentEls) {
    let countOccupied = 0;

    for (let i = 0; i < adjacentEls.length; i++) {
        if (adjacentEls[i] === occupied) countOccupied++;
    }

    return countOccupied >= 4;
}

/**
 * 
 * @param {Array} rows 
 */
const seatRound = function (rows) {
    const cleanBoard = copyBoard(rows);
    const board = copyBoard(rows);

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            const adjEls = getAdjacentElements(cleanBoard, row, col);

            if (cleanBoard[row][col] === 'L' && noOccupiedSeats(adjEls)) {
                board[row][col] = '#';
            } else if (cleanBoard[row][col] === '#' && atLeastFourOccupied(adjEls)) {
                board[row][col] = 'L';
            }
        }
    }

    return board;
}

/**
 * 
 * @param {Array} board1 
 * @param {Array} board2 
 */
const boardChange = function (board1, board2) {
    for (let row = 0; row < board1.length; row++) {
        for (let col = 0; col < board1.length; col++) {
            if (board1[row][col] !== board2[row][col]) {
                return true;
            }
        }
    }

    return false;
}

/**
 * 
 * @param {Array} board 
 */
const printBoard = function (board) {
    let boardDisp = '';
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            boardDisp += board[row][col];
        }
        boardDisp += '\n';
    }

    console.log(boardDisp);
}

const countOccupied = function (board) {
    let countOccupied = 0;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {
            if (board[row][col] === occupied) countOccupied++;
        }

    }

    return countOccupied;
}

let currentBoard = copyBoard(board);
let nextBoard = seatRound(currentBoard);

while (boardChange(currentBoard, nextBoard)) {
    currentBoard = copyBoard(nextBoard);
    nextBoard = seatRound(currentBoard);
}


console.log(countOccupied(nextBoard)); //2265

// Part 2
/*

As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............
The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?
*/

const getOccupiedUpDownLeftRight = function (array, row, col, lookingFor, notLookingFor) {
    let upDownLeftRight = 0;

    // up
    for (let rowCheck = row - 1; rowCheck >= 0; rowCheck--) {
        if (array[rowCheck][col] === lookingFor) {
            upDownLeftRight++;
            break;
        }

        if (array[rowCheck][col] === notLookingFor) {
            break;
        }
    }

    // down
    for (let rowCheck = row + 1; rowCheck < array.length; rowCheck++) {
        if (array[rowCheck][col] === lookingFor) {
            upDownLeftRight++;
            break;
        }

        if (array[rowCheck][col] === notLookingFor) {
            break;
        }
    }

    // left
    for (let colCheck = col - 1; colCheck >= 0; colCheck--) {
        if (array[row][colCheck] === lookingFor) {
            upDownLeftRight++;
            break;
        }

        if (array[row][colCheck] === notLookingFor) {
            break;
        }
    }

    // right
    for (let colCheck = col + 1; colCheck < array.length; colCheck++) {
        if (array[row][colCheck] === lookingFor) {
            upDownLeftRight++;
            break;
        }

        if (array[row][colCheck] === notLookingFor) {
            break;
        }
    }

    return upDownLeftRight;
}

const getOccupiedUpRight = function (array, row, col, lookingFor, notLookingFor) {
    let el = getElement(array, row, col);
    let irow = row;
    let icol = col;

    do {
        irow--;
        icol++;
        el = getElement(array, irow, icol);
        if (el === lookingFor) {
            return 1
        }
        if (el === notLookingFor) {
            return 0;
        }
    } while (el !== "-1") // not undefined

    return 0
}

const getOccupiedUpLeft = function (array, row, col, lookingFor, notLookingFor) {
    let el = getElement(array, row, col);
    let irow = row;
    let icol = col;

    do {
        irow--;
        icol--;
        el = getElement(array, irow, icol);
        if (el === lookingFor) {
            return 1
        }
        if (el === notLookingFor) {
            return 0;
        }
    } while (el !== "-1") // not undefined

    return 0
}

const getOccupiedDownRight = function (array, row, col, lookingFor, notLookingFor) {
    let el = getElement(array, row, col);
    let irow = row;
    let icol = col;

    do {
        irow++;
        icol++;
        el = getElement(array, irow, icol);
        if (el === lookingFor) {
            return 1
        }
        if (el === notLookingFor) {
            return 0;
        }
    } while (el !== "-1") // not undefined

    return 0
}

const getOccupidedDownLeft = function (array, row, col, lookingFor, notLookingFor) {
    let el = getElement(array, row, col);
    let irow = row;
    let icol = col;

    do {
        irow++;
        icol--;
        el = getElement(array, irow, icol);
        if (el === lookingFor) {
            return 1
        }
        if (el === notLookingFor) {
            return 0;
        }
    } while (el !== "-1") // not undefined

    return 0
}

/**
 * 
 * @param {Array} array 
 * @param {Number} x 
 * @param {Number} y 
 */
const atLeastFiveOccupied = function (array, row, col) {
    let countOccupied = 0;
    let upDownLeftRight = getOccupiedUpDownLeftRight(array, row, col, occupied, empty);
    let upRightDiag = getOccupiedUpRight(array, row, col, occupied, empty);
    let upLeftDiag = getOccupiedUpLeft(array, row, col, occupied, empty);
    let downRightDiag = getOccupiedDownRight(array, row, col, occupied, empty);
    let downLeftDiag = getOccupidedDownLeft(array, row, col, occupied, empty);


    countOccupied +=
        upDownLeftRight + upRightDiag + upLeftDiag + downRightDiag + downLeftDiag;

    return countOccupied >= 5;
}

const noneOccupied = function (array, row, col) {
    let countOccupied = 0;
    let upDownLeftRight = getOccupiedUpDownLeftRight(array, row, col, occupied, empty);
    let upRightDiag = getOccupiedUpRight(array, row, col, occupied, empty);
    let upLeftDiag = getOccupiedUpLeft(array, row, col, occupied, empty);
    let downRightDiag = getOccupiedDownRight(array, row, col, occupied, empty);
    let downLeftDiag = getOccupidedDownLeft(array, row, col, occupied, empty);

    countOccupied +=
        upDownLeftRight + upRightDiag + upLeftDiag + downRightDiag + downLeftDiag;

    return countOccupied === 0;
}

/**
 * 
 * @param {Array} rows 
 */
const seatRound2 = function (rows) {
    const cleanBoard = copyBoard(rows);
    const board = copyBoard(rows);

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board.length; col++) {

            if (cleanBoard[row][col] === 'L' && noneOccupied(cleanBoard, row, col)) {
                board[row][col] = '#';
            } else if (cleanBoard[row][col] === '#' && atLeastFiveOccupied(cleanBoard, row, col)) {

                board[row][col] = 'L';
            }
        }
    }

    return board;
}

let currentBoard2 = copyBoard(board);
let nextBoard2 = seatRound2(currentBoard2);

while (boardChange(currentBoard2, nextBoard2)) {
    currentBoard2 = copyBoard(nextBoard2);
    nextBoard2 = seatRound2(currentBoard2);
}

console.log(countOccupied(nextBoard2)); //2045