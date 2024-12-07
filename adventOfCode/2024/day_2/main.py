from pathlib import Path

def safe_dec_level(level: list):
    for index, _ in enumerate(level):
        # We got to the end of the list, it's safe
        if index == len(level) - 1: 
            return True
        
        # It's not decreasing, return false
        if level[index] < level[index + 1]:
            return False
        
        # Difference between adjacent needs to be between 1 and 3 (inclusive)
        # We're decreasing so we don't need to worry about abs
        diff = level[index] - level[index + 1]
        if diff < 1 or diff > 3: 
            return False
    
    return True
    
def safe_inc_level(level: list):
    for index, _ in enumerate(level):
        # We got to the end of the list, it's safe
        if index == len(level) - 1:
            return True
        
        # It's not increasing, return false
        if level[index] > level[index + 1]:
            return False
        
        # Difference between adjacent needs to be between 1 and 3 (inclusive)
        # We're increasing, so we don't need to worry about abs
        diff = level[index + 1] - level[index]
        if diff < 1 or diff > 3: 
            return False
        
    return True

def part_one(reports: list):
    num_safe = 0

    for report in reports:
        level = [int(x) for x in report.split()]
        if (safe_dec_level(level) or safe_inc_level(level)):
            num_safe += 1
    
    return num_safe

def part_two(reports: list):
    num_safe = 0

    for report in reports:
        level = [int(x) for x in report.split()]

        # Copy of level so we can reset for level removals and rechecks
        loop_level = level[:]
        index = 0

        while (index <= len(level)):
            if safe_dec_level(loop_level) or safe_inc_level(loop_level):
                num_safe += 1
                break
            else:
                # This catches if the level to remove is the last one
                if (index >= len(level)):
                    break

                # Reset loop level
                loop_level = level[:]
                # Remove a level and re-test
                loop_level.pop(index)
            
            index += 1

    return num_safe

p = Path(__file__).with_name('input.txt')

reports = []

with p.open('r') as f:
    reports = f.read().split('\n')
    f.close()

print(part_one(reports))

print(part_two(reports))