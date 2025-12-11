from pathlib import Path

p = Path(__file__).with_name('input.txt')

def part_one(directions: list[str]):
    count = 0
    for dir in directions:
        if dir == "(":
            count += 1
        else:
            count -= 1
    
    return count

def part_two(directions: list[str]):
    count = 0
    position = 1
    for dir in directions:
        if dir == "(":
            count += 1
        else:
            count -= 1

        if count == -1:
            return position

        position += 1
    
    return count

directions = []

with p.open('r') as f:
    directions = list(f.read())
    f.close()

print(part_one(directions))
print(part_two(directions))