/////////////////////////////////////
// Day 12

// Part 1
/*
Your ferry made decent progress toward the island, but the storm came in faster than anyone expected. The ferry needs to take evasive actions!

Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced extremely circuitous instructions. When the captain uses the PA system to ask if anyone can help, you quickly volunteer.

The navigation instructions (your puzzle input) consists of a sequence of single-character actions paired with integer input values. After staring at them for a few minutes, you work out what they probably mean:

Action N means to move north by the given value.
Action S means to move south by the given value.
Action E means to move east by the given value.
Action W means to move west by the given value.
Action L means to turn left the given number of degrees.
Action R means to turn right the given number of degrees.
Action F means to move forward by the given value in the direction the ship is currently facing.
The ship starts by facing east. Only the L and R actions change the direction the ship is facing. (That is, if the ship is facing east and the next instruction is N10, the ship would move north 10 units, but would still move east if the following action were F.)

For example:

F10
N3
F7
R90
F11
These instructions would be handled as follows:

F10 would move the ship 10 units east (because the ship starts by facing east) to east 10, north 0.
N3 would move the ship 3 units north to east 10, north 3.
F7 would move the ship another 7 units east (because the ship is still facing east) to east 17, north 3.
R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
F11 would move the ship 11 units south to east 17, south 8.
At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position and its north/south position) from its starting position is 17 + 8 = 25.

Figure out where the navigation instructions lead. What is the Manhattan distance between that location and the ship's starting position?
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

// split test file into array
const rows = [];
rawText.split('\n').forEach(function (line) {
    rows.push(line);
});

const movements = { 'N': 0, 'E': 0, 'S': 0, 'W': 0 };
const directions = ['N', 'S', 'E', 'W'];
let currentDirection = 'E';

/**
 * 
 * @param {String} currentDirection 
 * @param {String} turnDirection 
 * @param {Number} degrees 
 */
const getDirection = function (currentDirection, turnDirection, degrees) {
    if (turnDirection === 'R') {
        if (currentDirection === 'N') {
            if (degrees === 90) {
                return 'E';
            }
            if (degrees === 180) {
                return 'S';
            }
            if (degrees === 270) {
                return 'W';
            }
        }
        if (currentDirection === 'E') {
            if (degrees === 90) {
                return 'S';
            }
            if (degrees === 180) {
                return 'W';
            }
            if (degrees === 270) {
                return 'N';
            }
        }
        if (currentDirection === 'S') {
            if (degrees === 90) {
                return 'W';
            }
            if (degrees === 180) {
                return 'N';
            }
            if (degrees === 270) {
                return 'E';
            }
        }
        if (currentDirection === 'W') {
            if (degrees === 90) {
                return 'N';
            }
            if (degrees === 180) {
                return 'E';
            }
            if (degrees === 270) {
                return 'S';
            }
        }
    }
    if (turnDirection === 'L') {
        if (currentDirection === 'N') {
            if (degrees === 90) {
                return 'W';
            }
            if (degrees === 180) {
                return 'S';
            }
            if (degrees === 270) {
                return 'E';
            }
        }
        if (currentDirection === 'E') {
            if (degrees === 90) {
                return 'N';
            }
            if (degrees === 180) {
                return 'W';
            }
            if (degrees === 270) {
                return 'S';
            }
        }
        if (currentDirection === 'S') {
            if (degrees === 90) {
                return 'E';
            }
            if (degrees === 180) {
                return 'N';
            }
            if (degrees === 270) {
                return 'W';
            }
        }
        if (currentDirection === 'W') {
            if (degrees === 90) {
                return 'S';
            }
            if (degrees === 180) {
                return 'E';
            }
            if (degrees === 270) {
                return 'N';
            }
        }
    }
}

const getManhattanDistance = function () {
    let north = movements['N'];
    let south = movements['S'];
    let east = movements['E'];
    let west = movements['W'];

    let northSouth = Math.abs(north - south);
    let eastWest = Math.abs(east - west);

    return northSouth + eastWest;
}

for (let i = 0; i < rows.length; i++) {
    const instruction = rows[i];
    const letter = instruction.slice(0, 1);
    const number = Number(instruction.slice(1, instruction.length));

    if (letter === 'F') {
        movements[currentDirection] += number;
    }

    if (letter === 'R' || letter === 'L') {
        currentDirection = getDirection(currentDirection, letter, number);
    }

    if (directions.includes(letter)) {
        movements[letter] += number;
    }
}

console.log(getManhattanDistance());

// Part 2
const movementWaypoint = { 'N': 0, 'E': 0, 'S': 0, 'W': 0 };
const waypoint = { 'N': 1, 'E': 10, 'S': 0, 'W': 0 };

/**
 * 
 * @param {Number} value 
 */
const moveShipWaypoint = function (value) {
    movementWaypoint['N'] += waypoint['N'] * value;
    movementWaypoint['E'] += waypoint['E'] * value;
    movementWaypoint['W'] += waypoint['W'] * value;
    movementWaypoint['S'] += waypoint['S'] * value;
}

const moveWaypoint = function (direction, value) {
    waypoint[direction] += value;
}

const turnWaypoint = function (turnDirection, degrees) {
    if (turnDirection === 'R') {
        let north = waypoint['N'];
        let east = waypoint['E'];
        let south = waypoint['S'];
        let west = waypoint['W'];

        if (degrees === 90) {
            waypoint['E'] = north;
            waypoint['S'] = east;
            waypoint['W'] = south;
            waypoint['N'] = west;
        }
        if (degrees === 180) {
            waypoint['S'] = north;
            waypoint['W'] = east;
            waypoint['N'] = south;
            waypoint['E'] = west
        }
        if (degrees === 270) {
            waypoint['W'] = north;
            waypoint['N'] = east;
            waypoint['E'] = south;
            waypoint['S'] = west;
        }
    }
    if (turnDirection === 'L') {
        let north = waypoint['N'];
        let east = waypoint['E'];
        let south = waypoint['S'];
        let west = waypoint['W'];

        if (degrees === 90) {
            waypoint['W'] = north;
            waypoint['N'] = east;
            waypoint['E'] = south;
            waypoint['S'] = west;
        }
        if (degrees === 180) {
            waypoint['S'] = north;
            waypoint['W'] = east;
            waypoint['N'] = south;
            waypoint['E'] = west;
        }
        if (degrees === 270) {
            waypoint['E'] = north;
            waypoint['S'] = east;
            waypoint['W'] = south;
            waypoint['N'] = west;
        }
    }
}

const getManhattanDistanceWaypoint = function () {
    let north = movementWaypoint['N'];
    let south = movementWaypoint['S'];
    let east = movementWaypoint['E'];
    let west = movementWaypoint['W'];

    let northSouth = Math.abs(north - south);
    let eastWest = Math.abs(east - west);

    return northSouth + eastWest;
}

for (let i = 0; i < rows.length; i++) {
    const instruction = rows[i];
    const letter = instruction.slice(0, 1);
    const number = Number(instruction.slice(1, instruction.length));

    if (letter === 'F') {
        moveShipWaypoint(number);
    }

    if (letter === 'R' || letter === 'L') {
        turnWaypoint(letter, number);
    }

    if (directions.includes(letter)) {
        moveWaypoint(letter, number);
    }
}

console.log(getManhattanDistanceWaypoint());