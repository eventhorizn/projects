from pathlib import Path

p = Path(__file__).with_name('input.txt')

lines = []
list_one = []
list_two = []

with p.open('r') as f:
    lines = f.read().split('\n')
    f.close()

for line in lines:
    split_line = line.split()
    list_one.append(int(split_line[0]))
    list_two.append(int(split_line[1]))

list_one.sort()
list_two.sort()

def day_one():
    part_one = 0
    part_two = 0

    for index, _ in enumerate(list_one):
        part_one += abs(list_one[index] - list_two[index])
        part_two += list_one[index] * list_two.count(list_one[index])
    
    return part_one, part_two

part_one, part_two = day_one()
print(part_one)
print(part_two)