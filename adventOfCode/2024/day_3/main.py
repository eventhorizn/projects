import re
from pathlib import Path

def part_one(clean_input):
    total = 0

    mults = re.findall(r"mul\(\d+,\d+\)", clean_input)

    for mult in mults:
        num_comma = mult.replace('(', '').replace(')', '').replace('mul', '')
        numbers = [int(x) for x in num_comma.split(',')]
        total += numbers[0] * numbers[1]
    
    return total

def part_two(clean_input):
    total = 0

    mults = re.findall(r"mul\(\d+,\d+\)|do\(\)|don't\(\)", clean_input)

    do_not_found = False
    
    for mult in mults:
        if 'do()' in mult:
            do_not_found = False
        if "don't()" in mult:
            do_not_found = True
        if 'mul' in mult and not do_not_found:
            num_comma = mult.replace('(', '').replace(')', '').replace('mul', '')
            numbers = [int(x) for x in num_comma.split(',')]
            total += numbers[0] * numbers[1]
    
    return total

p = Path(__file__).with_name('input.txt')

with p.open('r') as f:
    input = f.read()
    f.close()

clean_input = ''.join(input.split())

print(part_one(clean_input))

print(part_two(clean_input))