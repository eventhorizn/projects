from pathlib import Path

def left_to_right(x: int, y: int, grid: list[str], search: str):
    loop_var = x + 1
    temp_val = grid[y][x]
    while loop_var < len(grid[y]) and len(temp_val) < 4:
        temp_val += grid[y][loop_var]
        loop_var += 1

    if (temp_val) == search:
        return 1
    
    return 0

def right_to_left(x: int, y: int, grid: list[str], search: str):
    loop_var = x - 1
    temp_val = grid[y][x]
    while loop_var >= 0 and len(temp_val) < 4:
        temp_val += grid[y][loop_var]
        loop_var -= 1

    if (temp_val) == search:
        return 1

    return 0

def up_to_down(x: int, y: int, grid: list[str], search: str):
    loop_var = y + 1
    temp_val = grid[y][x]

    while loop_var < len(grid) and len(temp_val) < 4:
        temp_val += grid[loop_var][x]
        loop_var += 1

    if (temp_val) == search:
        return 1

    return 0

def down_to_up(x: int, y: int, grid: list[str], search: str):
    loop_var = y - 1
    temp_val = grid[y][x]

    while loop_var >= 0 and len(temp_val) < 4:
        temp_val += grid[loop_var][x]
        loop_var -= 1

    if (temp_val) == search:
        return 1

    return 0

def diag_down_right(x: int, y: int, grid: list[str], search: str):
    loop_x = x + 1
    loop_y = y + 1
    temp_val = grid[y][x]

    while loop_x < len(grid[y]) and loop_y < len(grid) and len(temp_val) < 4:
        temp_val += grid[loop_y][loop_x]
        loop_x += 1
        loop_y += 1
        
    if (temp_val) == search:
        return 1

    return 0

def diag_down_left(x: int, y: int, grid: list[str],  search: str):
    loop_x = x - 1
    loop_y = y + 1
    temp_val = grid[y][x]

    while loop_x >= 0 and loop_y < len(grid) and len(temp_val) < 4:
        temp_val += grid[loop_y][loop_x]
        loop_x -= 1
        loop_y += 1
        
    if (temp_val) == search:
        return 1

    return 0

def diag_up_right(x: int, y: int, grid: list[str], search: str):
    loop_x = x + 1
    loop_y = y - 1
    temp_val = grid[y][x]

    while loop_x < len(grid[y]) and loop_y >= 0 and len(temp_val) < 4:
        temp_val += grid[loop_y][loop_x]
        loop_x += 1
        loop_y -= 1
        
    if (temp_val) == search:
        return 1

    return 0

def diag_up_left(x: int, y: int, grid: list[str], search: str):
    loop_x = x - 1
    loop_y = y - 1
    temp_val = grid[y][x]

    while loop_x >= 0 and loop_y >= 0 and len(temp_val) < 4:
        temp_val += grid[loop_y][loop_x]
        loop_x -= 1
        loop_y -= 1
        
    if (temp_val) == search:
        return 1

    return 0

def part_one(grid: list[str]):
    total = 0
    search = "XMAS"

    for y, _ in enumerate(grid):
        for x, _ in enumerate(grid[y]):
            total += left_to_right(x, y, grid, search)
            total += right_to_left(x, y, grid, search)
            total += up_to_down(x, y, grid, search)
            total += down_to_up(x, y, grid, search)

            total += diag_down_right(x, y, grid, search)
            total += diag_down_left(x, y, grid, search)
            total += diag_up_right(x, y, grid, search)
            total += diag_up_left(x, y, grid, search)

    return total

def part_two(grid: list[str]):
    total = 0
    search = "MAS"

    for y, _ in enumerate(grid):
        for x, _ in enumerate(grid[y]):

    return total

p = Path(__file__).with_name('input.txt')

grid = []

with p.open('r') as f:
    grid = f.read().split('\n')
    f.close()

print(part_one(grid))