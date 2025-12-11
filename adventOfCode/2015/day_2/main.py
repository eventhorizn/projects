from pathlib import Path

def part_one(pds: list[str]):
    total = 0

    for pd in pds:
        split_vals = pd.split('x')
        l = int(split_vals[0])
        w = int(split_vals[1])
        h = int(split_vals[2])

        area_1 = l * w
        area_2 = w * h
        area_3 = h * l

        calc_1 = 2 * area_1
        calc_2 = 2 * area_2
        calc_3 = 2 * area_3

        pd_total = calc_1 + calc_2 + calc_3
        extra = min(area_1, area_2, area_3)
        total += pd_total + extra
    
    return total

def part_two(pds: list[str]):
    total = 0

    for pd in pds:
        split_vals = pd.split('x')
        l = int(split_vals[0])
        w = int(split_vals[1])
        h = int(split_vals[2])

        perm_1 = 2 * (l + w)
        perm_2 = 2 * (w + h)
        perm_3 = 2 * (h + l)

        shortest_perm = min(perm_1, perm_2, perm_3)
        volume = l * w * h

        pd_total = volume + shortest_perm
        total += pd_total

    return total

p = Path(__file__).with_name('input.txt')

pds = []

with p.open('r') as f:
    pds = f.read().split('\n')
    f.close()

print(part_one(pds))
print(part_two(pds))