from pathlib import Path

def part_one(moves: list[str]):
    cur = 50
    password = 0

    for move in moves:
        dir = move[0]
        amount = int(move[1:])

        # What if the rotation is like 900?
        # We can just remove the hundred place as it just goes in a circle
        amount = amount % 100

        if (dir == 'R'):
            cur += amount
        else:
            cur -= amount

        # We are in a circle so have to correct overages
        if (cur >= 99):
            cur -= 100
        if (cur < 0):
            cur += 100

        if (cur == 0):
            password += 1

    return password

# need to manually add/subtract by one
def part_two(moves: list[str]):
    cur = 50
    password = 0

    for move in moves:
        dir = move[0]
        amount = int(move[1:])

        if (dir == 'R'):
            for _ in range(amount):
                cur += 1
                # in case the rotation gets us to 0
                if (cur == 0):
                    password += 1
                # rotation goes over 99 and we're back at 0
                if (cur == 100):
                    cur = 0
                    password += 1
        else:
            for _ in range(amount):
                cur -= 1
                if (cur == 0):
                    password += 1
                if (cur == -1):
                    cur = 99

    return password

p = Path(__file__).with_name('input.txt')

lines = []

with p.open('r') as f:
    lines = f.read().split('\n')
    f.close()

print(part_one(lines))
print(part_two(lines))