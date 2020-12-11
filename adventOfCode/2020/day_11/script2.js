/* eslint-disable no-param-reassign */
let input;
let rawFile = new XMLHttpRequest();
rawFile.open('Get', 'input.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            input = rawFile.responseText;

        }
    }
}
rawFile.send(null);

//const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const STATES = {
    EMPTY: 'L',
    FLOOR: '.',
    OCCUPIED: '#',
};

const DIRECTIONS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

let ADJACENCY_CACHE;

const createAdjacencyCache = () => {
    ADJACENCY_CACHE = input
        .split('\n')
        .map((r) => r.split('').map(() => undefined));
};

const isInGridBounds = (grid, row, col) =>
    row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;

const getAdjacentSeatIndices = (grid, row, col, maxDistance) => {
    if (ADJACENCY_CACHE[row][col]) return ADJACENCY_CACHE[row][col];

    const adjacentSeats = DIRECTIONS.map(([rDiff, cDiff]) => {
        let r = row + rDiff;
        let c = col + cDiff;
        let distance = 1;

        while (isInGridBounds(grid, r, c) && distance <= maxDistance) {
            if (grid[r][c] !== STATES.FLOOR) return [r, c];
            r += rDiff;
            c += cDiff;
            distance++;
        }

        return false;
    }).filter(Boolean);

    ADJACENCY_CACHE[row][col] = adjacentSeats;

    return adjacentSeats;
};

const getNextCellState = (grid, row, col, maxDistance = 1, tolerance = 4) => {
    const currentState = grid[row][col];
    if (currentState === STATES.FLOOR) return STATES.FLOOR;

    const numAdjacentOccupied = getAdjacentSeatIndices(
        grid,
        row,
        col,
        maxDistance,
    ).reduce(
        (total, [r, c]) => total + (grid[r][c] === STATES.OCCUPIED ? 1 : 0),
        0,
    );

    if (currentState === STATES.EMPTY && numAdjacentOccupied === 0) {
        return STATES.OCCUPIED;
    }

    if (currentState === STATES.OCCUPIED && numAdjacentOccupied >= tolerance) {
        return STATES.EMPTY;
    }

    return currentState;
};

const getNextLayout = (curr, prev, maxDistance = 1, tolerance = 4) => {
    let changed = false;

    for (let i = 0; i < prev.length; i++) {
        for (let j = 0; j < prev[i].length; j++) {
            curr[i][j] = getNextCellState(prev, i, j, maxDistance, tolerance);
            changed = changed || curr[i][j] !== prev[i][j];
        }
    }

    return changed;
};

const findStableState = (maxDistance = 1, tolerance = 4) => {
    createAdjacencyCache();

    const grids = [
        input.split('\n').map((r) => r.split('')),
        input.split('\n').map((r) => r.split('')),
    ];
    let idx = 0;
    let changed = true;

    while (changed) {
        changed = getNextLayout(
            grids[idx % 2],
            grids[(idx + 1) % 2],
            maxDistance,
            tolerance,
        );
        idx++;
    }

    return grids[idx % 2]
        .flat()
        .reduce((total, cell) => total + (cell === STATES.OCCUPIED ? 1 : 0), 0);
};

const part1 = () => findStableState();

const part2 = () => findStableState(Number.MAX_SAFE_INTEGER, 5);

console.log('part1', part1());
console.log('part2', part2());