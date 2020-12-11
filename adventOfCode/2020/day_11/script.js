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
rawFile.open('Get', 'test.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawText = rawFile.responseText;

        }
    }
}
rawFile.send(null);

// split test file into 2D array
const rows = [];
rawText.split('\n').forEach(function (line) {
    const lineArr = line.trim().split('');
    rows.push(lineArr);
});

const occupied = '#';
const empty = 'L';

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
 * @param {Number} modX 
 * @param {Number} modY 
 */
const getElement = function (array, modX, modY) {
    let el;
    try {
        el = array[modX][modY];
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
const getAdjecentElements = function (array, x, y) {
    // this is ugly as shit, I know there's a clever way, but fuck it
    const adjEls = [];

    const topLeft = getElement(array, x - 1, y - 1);
    const top = getElement(array, x, y - 1);
    const topRight = getElement(array, x + 1, y - 1);
    const midLeft = getElement(array, x - 1, y);
    const midRight = getElement(array, x + 1, y);
    const botLeft = getElement(array, x - 1, y + 1);
    const bot = getElement(array, x, y + 1);
    const botRight = getElement(array, x + 1, y + 1);

    adjEls.push(topLeft, top, topRight, midLeft, midRight, botLeft, bot, botRight);

    return adjEls;
}

/**
 * 
 * @param {Array} array 
 */
const noOccupiedSeats = function (array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === occupied) return false;
    }

    return true;
}

/**
 * 
 * @param {Array} array 
 */
const atLeastFourOccupied = function (array) {
    let countOccupied = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === occupied) countOccupied++;
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

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const adjEls = getAdjecentElements(cleanBoard, x, y);

            if (cleanBoard[x][y] === 'L' && noOccupiedSeats(adjEls)) {
                board[x][y] = '#';
            } else if (cleanBoard[x][y] === '#' && atLeastFourOccupied(adjEls)) {
                board[x][y] = 'L';
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
    for (let i = 0; i < board1.length; i++) {
        for (let j = 0; j < board1.length; j++) {
            if (board1[i][j] !== board2[i][j]) {
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
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            boardDisp += board[i][j];
        }
        boardDisp += '\n';
    }

    console.log(boardDisp);
}

const countOccupied = function (board) {
    let countOccupied = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === occupied) countOccupied++;
        }

    }

    return countOccupied;
}

let currentBoard = copyBoard(rows);
let nextBoard = seatRound(currentBoard);


while (boardChange(currentBoard, nextBoard)) {
    currentBoard = copyBoard(nextBoard);
    nextBoard = seatRound(currentBoard);
}


console.log(countOccupied(nextBoard));

// Part 2

const getOccupidedUp = function (array, x, y) {
    for (let i = 0; i < y; i++) {
        if (array[i][x] === occupied) {
            return 1;
        }
    }

    return 0;
}

const getOccupidedDown = function (array, y, x) {
    for (let i = y + 1; i < array.length; i++) {
        if (array[i][x] === occupied) {
            return 1;
        }
    }

    return 0;
}

const getOccupidedRight = function (array, x, y) {
    for (let i = x = 1; i < array.length; i++) {
        if (array[y][i] === occupied) {
            return 1;
        }
    }
    return 0
}


const getOccupidedLeft = function (array, x, y) {
    for (let i = 0; i < x; i++) {
        if (array[y][i] === occupied) {
            return 1;
        }
    }

    return 0;
}

// right = x + 1, up = y -1
const getOccupiedUpRight = function (array, x, y) {
    let el = getElement(array, x, y);
    do {
        el = getElement(array, x + 1, y - 1);
        if (el === occupied) {
            return 1
        }
    } while (!el) // not undefined

    return 0
}

// left = x - 1, up = y - 1
const getOccupiedUpLeft = function (array, x, y) {
    let el = getElement(array, x, y);
    do {
        el = getElement(array, x - 1, y - 1);
        if (el === occupied) {
            return 1
        }
    } while (!el) // not undefined

    return 0
}

// right = x + 1 down = y + 1
const getOccupiedDownRight = function (array, x, y) {
    let el = getElement(array, x, y);
    do {
        el = getElement(array, x + 1, y + 1);
        if (el === occupied) {
            return 1
        }
    } while (!el) // not undefined

    return 0
}

const getOccupidedDownLeft = function (array, x, y) {
    let el = getElement(array, x, y);
    do {
        el = getElement(array, x - 1, y + 1);
        if (el === occupied) {
            return 1
        }
    } while (!el) // not undefined

    return 0
}

/**
 * 
 * @param {Array} array 
 * @param {Number} x 
 * @param {Number} y 
 */
const atLeastFiveOccupied = function (array, x, y) {
    let countOccupied = 0;
    let occRight = getOccupidedRight(array, x, x);
    let occLeft = getOccupidedLeft(array, x, y);
    let occUp = getOccupidedUp(array, x, y);
    let occDown = getOccupidedDown(array, y, x);
    let occUpRight = getOccupiedUpRight(array, x, y);
    let occUpLeft = getOccupiedUpLeft(array, x, y);
    let occDownRight = getOccupiedDownRight(array, x, y);
    let occDownLeft = getOccupidedDownLeft(array, x, y);

    //array[x][y] = 'test';

    countOccupied +=
        getOccupidedRight(array, x, x) +
        getOccupidedLeft(array, x, y) +
        getOccupidedUp(array, x, y) +
        getOccupidedDown(array, y, x) +
        getOccupiedUpRight(array, x, y) +
        getOccupiedUpLeft(array, x, y) +
        getOccupiedDownRight(array, x, y) +
        getOccupidedDownLeft(array, x, y);

    return countOccupied >= 5;
}

/**
 * 
 * @param {Array} rows 
 */
const seatRound2 = function (rows) {
    const cleanBoard = copyBoard(rows);
    const board = copyBoard(rows);

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board.length; y++) {
            const adjEls = getAdjecentElements(cleanBoard, y, x);

            if (cleanBoard[y][x] === 'L' && noOccupiedSeats(adjEls)) {
                board[y][x] = '#';
            } else if (cleanBoard[y][x] === '#' && atLeastFiveOccupied(cleanBoard, y, x)) {

                board[y][x] = 'L';
            }
        }
    }

    return board;
}

let currentBoard2 = copyBoard(rows);
let nextBoard2 = seatRound2(currentBoard2);
printBoard(nextBoard2);

//const blah = atLeastFiveOccupied(nextBoard2, 0, 3);

while (boardChange(currentBoard2, nextBoard2)) {
    currentBoard2 = copyBoard(nextBoard2);
    nextBoard2 = seatRound2(currentBoard2);
    printBoard(nextBoard2);
}


/*
*/