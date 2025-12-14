import re
from pathlib import Path

def has_double_letters(input: str):
    for i in range(len(input) - 1):
        if input[i] == input[i + 1]: return True

    return False

def at_least_three_vowels(input: str):
    num_a = input.count('a')
    num_e = input.count('e')
    num_i = input.count('i')
    num_o = input.count('o')
    num_u = input.count('u')

    has_3_vowel = num_a + num_e + num_i + num_o + num_u >= 3

    return has_3_vowel

def no_disallowed_strings(input: str):
    num_ab = input.find('ab')
    num_cd = input.find('cd')
    num_pq = input.find('pq')
    num_xy = input.find('xy')

    no_disallowed_strings = num_ab + num_cd + num_pq + num_xy == -4

    return no_disallowed_strings

def part_one(values: list[str]):
    nice = 0
    for val in values:
        if has_double_letters(val) and at_least_three_vowels(val) and no_disallowed_strings(val):
            nice += 1
    return nice

def two_char_overlaps(input: str):
    for i in range(len(input) - 3):
        ls = input[i] + input[i + 1]
        for j in range(i + 2, len(input) - 1):
            rs = input[j] + input[j + 1]

            if ls == rs: return True

    return False

def char_match_one_between(input: str):
    for i in range(len(input) - 2):
        if input[i] == input[i + 2]: return True

    return False

def part_two(values: list[str]):
    nice = 0
    for val in values:
        if two_char_overlaps(val) and char_match_one_between(val):
            nice += 1
    return nice

p = Path(__file__).with_name('input.txt')

values = []

with p.open('r') as f:
    values = f.read().split('\n')
    f.close()

print(part_one(values))
print(part_two(values))