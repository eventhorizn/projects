/////////////////////////////////////
// Day 17

// Part 1
/*
As your flight slowly drifts through the sky, the Elves at the Mythical Information Bureau at the North Pole contact you. They'd like some help debugging a malfunctioning experimental energy source aboard one of their super-secret imaging satellites.

The experimental energy source is based on cutting-edge technology: a set of Conway Cubes contained in a pocket dimension! When you hear it's having problems, you can't help but agree to take a look.

The pocket dimension contains an infinite 3-dimensional grid. At every integer 3-dimensional coordinate (x,y,z), there exists a single cube which is either active or inactive.

In the initial state of the pocket dimension, almost all cubes start inactive. The only exception to this is a small flat region of cubes (your puzzle input); the cubes in this region start in the specified active (#) or inactive (.) state.

The energy source then proceeds to boot up by executing six cycles.

Each cube only ever considers its neighbors: any of the 26 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3, its neighbors include the cube at x=2,y=2,z=2, the cube at x=0,y=2,z=3, and so on.

During a cycle, all cubes simultaneously change their state according to the following rules:

If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
The engineers responsible for this experimental energy source would like you to simulate the pocket dimension and determine what the configuration of cubes should be at the end of the six-cycle boot process.

For example, consider the following initial state:

.#.
..#
###
Even though the pocket dimension is 3-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1 region of the 3-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z coordinate (and the frame of view follows the active cells in each cycle):

Before any cycles:

z=0
.#.
..#
###


After 1 cycle:

z=-1
#..
..#
.#.

z=0
#.#
.##
.#.

z=1
#..
..#
.#.


After 2 cycles:

z=-2
.....
.....
..#..
.....
.....

z=-1
..#..
.#..#
....#
.#...
.....

z=0
##...
##...
#....
....#
.###.

z=1
..#..
.#..#
....#
.#...
.....

z=2
.....
.....
..#..
.....
.....


After 3 cycles:

z=-2
.......
.......
..##...
..###..
.......
.......
.......

z=-1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=0
...#...
.......
#......
.......
.....##
.##.#..
...#...

z=1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=2
.......
.......
..##...
..###..
.......
.......
.......
After the full six-cycle boot process completes, 112 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles. How many cubes are left in the active state after the sixth cycle?
*/

// Part 2

/*
For some reason, your simulated results don't match what the experimental energy source engineers expected. Apparently, the pocket dimension actually has four spatial dimensions, not three.

The pocket dimension contains an infinite 4-dimensional grid. At every integer 4-dimensional coordinate (x,y,z,w), there exists a single cube (really, a hypercube) which is still either active or inactive.

Each cube only ever considers its neighbors: any of the 80 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3,w=4, its neighbors include the cube at x=2,y=2,z=3,w=3, the cube at x=0,y=2,z=3,w=4, and so on.

The initial state of the pocket dimension still consists of a small flat region of cubes. Furthermore, the same rules for cycle updating still apply: during each cycle, consider the number of active neighbors of each cube.

For example, consider the same initial state as in the example above. Even though the pocket dimension is 4-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1x1 region of the 4-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z and w coordinate:

Before any cycles:

z=0, w=0
.#.
..#
###


After 1 cycle:

z=-1, w=-1
#..
..#
.#.

z=0, w=-1
#..
..#
.#.

z=1, w=-1
#..
..#
.#.

z=-1, w=0
#..
..#
.#.

z=0, w=0
#.#
.##
.#.

z=1, w=0
#..
..#
.#.

z=-1, w=1
#..
..#
.#.

z=0, w=1
#..
..#
.#.

z=1, w=1
#..
..#
.#.


After 2 cycles:

z=-2, w=-2
.....
.....
..#..
.....
.....

z=-1, w=-2
.....
.....
.....
.....
.....

z=0, w=-2
###..
##.##
#...#
.#..#
.###.

z=1, w=-2
.....
.....
.....
.....
.....

z=2, w=-2
.....
.....
..#..
.....
.....

z=-2, w=-1
.....
.....
.....
.....
.....

z=-1, w=-1
.....
.....
.....
.....
.....

z=0, w=-1
.....
.....
.....
.....
.....

z=1, w=-1
.....
.....
.....
.....
.....

z=2, w=-1
.....
.....
.....
.....
.....

z=-2, w=0
###..
##.##
#...#
.#..#
.###.

z=-1, w=0
.....
.....
.....
.....
.....

z=0, w=0
.....
.....
.....
.....
.....

z=1, w=0
.....
.....
.....
.....
.....

z=2, w=0
###..
##.##
#...#
.#..#
.###.

z=-2, w=1
.....
.....
.....
.....
.....

z=-1, w=1
.....
.....
.....
.....
.....

z=0, w=1
.....
.....
.....
.....
.....

z=1, w=1
.....
.....
.....
.....
.....

z=2, w=1
.....
.....
.....
.....
.....

z=-2, w=2
.....
.....
..#..
.....
.....

z=-1, w=2
.....
.....
.....
.....
.....

z=0, w=2
###..
##.##
#...#
.#..#
.###.

z=1, w=2
.....
.....
.....
.....
.....

z=2, w=2
.....
.....
..#..
.....
.....
After the full six-cycle boot process completes, 848 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles in a 4-dimensional space. How many cubes are left in the active state after the sixth cycle?
*/

const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\gary.hake\\source\\personal\\projects\\adventOfCode\\2020\\day_17\\input.txt', 'utf-8').split('\n').filter(item => item);

/**
 * Runs Game of Life in N dimensions.
 * With given input of M dimensions and grid size.
 * For X number of simulation cycles.
 * 
 * @param {Number} dimensions 
 * @param {Number} inputDimensions 
 * @param {Number} gridSize 
 * @param {Map} input 
 * @param {Number} simulationCycles 
 */
const conwayCubes = function (dimensions, inputDimensions, gridSize, input, simulationCycles) {
    // Create a map with dimensions not covered in input.
    // Example, input can be a 2 dimension plane while the map to
    // be constructed has 4 dimensions.
    let map = new Map();
    let curr = map;
    for (let i = dimensions; i > inputDimensions + 1; i--) {
        curr.set(0, new Map());
        curr = curr.get(0);
    }
    // Set the input map as the 0th element.
    curr.set(0, input);

    /**
     * Returns an item from N dimension map.
     * Returns inactive item if the item is not present in map.
     * 
     * @param  {...any} units 
     */
    const getItem = (...units) => {
        let curr = map;
        while (true) {
            // Shift through each coordinate and check if the item is available.
            // Move to the next item. If no more coordinate is left return the
            // item or return an inactive item.
            const next = units.shift();
            if (units.length) {
                if (curr.has(next)) {
                    curr = curr.get(next);
                } else {
                    return '.';
                }
            } else {
                return curr.get(next) || '.';
            }
        }
    }

    /**
     * Returns number of active neighbors for the given coordinate.
     * 
     * @param {Array<Number>} coordinates 
     * @param {Array<Number>} p 
     */
    const getActiveNeighborsCount = function (coordinates, p = []) {
        if (p.length < coordinates.length) {
            // We need to go deeper.
            let count = 0;
            // Neighbors for the current coordinate.
            for (let i = -1; i <= 1; i++) {
                count += getActiveNeighborsCount(coordinates, [...p, coordinates[p.length] + i]);
            }
            return count;
        } else {
            // This is it!
            // Checking if the point is same is as the given coordinate.
            let same = true;
            for (let i = 0; i < coordinates.length && same; i++) {
                if (coordinates[i] !== p[i]) {
                    same = false;
                }
            }

            if (!same) {
                // Return 1 if active neighbor is found.
                if (getItem(...p) === '#') {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                // Same coordinate is to be ignored.
                return 0;
            }
        }
    }

    /**
     * Populates the new given newMap recursively.
     * currentDimension and cycle is used to keep track of the
     * size of the loop that needs to be run.
     * 
     * @param {Map} newMap 
     * @param {Number} currentDimension 
     * @param {Number} cycle 
     * @param {Array<Number>} coordinates 
     */
    const constructMap = function (newMap, currentDimension, cycle, coordinates) {
        if (currentDimension > 1) {
            // We have to go Deeper
            if (currentDimension > inputDimensions) {
                // We haven't reached the input dimensions yet.
                // Loop will be shorter.
                for (let p = -1 * cycle; p <= cycle; p++) {
                    newMap.set(p, new Map());
                    constructMap(newMap.get(p), currentDimension - 1, cycle, [...coordinates, p]);
                }
            } else {
                // We have reached the input dimension.
                // Loop will be longer.
                for (let p = -1 * cycle; p < gridSize + cycle; p++) {
                    newMap.set(p, new Map());
                    constructMap(newMap.get(p), currentDimension - 1, cycle, [...coordinates, p]);
                }
            }
        } else {
            // This is it.
            // Loop for each element in the last coordinate.
            for (let x = -1 * cycle; x < gridSize + cycle; x++) {
                let current = getItem(...coordinates, x);
                let count = getActiveNeighborsCount([...coordinates, x]);

                /**
                 * If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active.
                 * Otherwise, the cube becomes inactive.
                 * 
                 * If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active.
                 * Otherwise, the cube remains inactive.
                 */
                if (current === '#') {
                    if (count === 2 || count === 3) {
                        newMap.set(x, '#');
                    } else {
                        newMap.set(x, '.');
                    }
                }
                if (current === '.') {
                    if (count === 3) {
                        newMap.set(x, '#');
                    } else {
                        newMap.set(x, '.');
                    }
                }
            }
        }
    }

    /**
     * Recursively count active members.
     * 
     * @param {Map} map 
     */
    const countActive = function (map) {
        let count = 0;
        for (let key of map.keys()) {
            if (typeof map.get(key) === 'object') {
                count += countActive(map.get(key));
            } else {
                count += map.get(key) === '#' ? 1 : 0;
            }
        }
        return count;
    }

    // Run simulation for X cycles.
    for (let cycle = 1; cycle <= simulationCycles; cycle++) {
        let newMap = new Map();
        constructMap(newMap, dimensions, cycle, []);
        map = newMap;
    }

    // Return active member count.
    return countActive(map);
}

// Construct input map.
let map = new Map();
const dim = lines.length;
for (let y = 0; y < dim; y++) {
    map.set(y, new Map());
    for (let x = 0; x < dim; x++) {
        map.get(y).set(x, lines[y].charAt(x));
    }
}

// Part 1
console.log(conwayCubes(3, 2, lines.length, map, 6));
// Part 2
console.log(conwayCubes(4, 2, lines.length, map, 6));
