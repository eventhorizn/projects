from pathlib import Path

def part_one(moves: list[str]):
    loc_x = 1
    loc_y = 1
    key = (loc_x, loc_x)
    visited = {key: 1}

    for move in moves:
        # north
        if move == '^':
            loc_y += 1
        # south
        if move == 'v':
            loc_y -= 1
        # east
        if move == '>':
            loc_x += 1
        # west
        if move == '<':
            loc_x -= 1

        key = (loc_x, loc_y)
        if key in visited:
            visited[key] += 1
        else:
            visited[key] = 1

    return len(visited)

def part_two(moves: list[str]):
    santa = move_person(moves, 'santa')
    robo = move_person(moves, 'robo')
    merged = santa | robo

    # We don't want to double count the start
    return len(merged)

def move_person(moves: list[str], person: str):
    loc_x = 1
    loc_y = 1
    key = (loc_x, loc_x)
    visited = {key: 1}
    start_number = 1

    for move in moves:
        # only events for santa
        if person == "santa" and start_number % 2 == 0: 
            start_number += 1
            continue
        # only odds for robo
        if person == "robo" and start_number % 2 != 0:
            start_number += 1
            continue

        # north
        if move == '^':
            loc_y += 1
        # south
        if move == 'v':
            loc_y -= 1
        # east
        if move == '>':
            loc_x += 1
        # west
        if move == '<':
            loc_x -= 1

        key = (loc_x, loc_y)
        if key in visited:
            visited[key] += 1
        else:
            visited[key] = 1

        start_number += 1

    return visited
        

p = Path(__file__).with_name('input.txt')

moves = []

with p.open('r') as f:
    moves = list(f.read())
    f.close()

print(part_one(moves))
print(part_two(moves))