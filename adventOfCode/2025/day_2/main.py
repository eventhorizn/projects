from pathlib import Path

def part_one(ranges: list[str]):
    invalid_sum = 0

    for ind_range in ranges:
        range_split = ind_range.split('-')
        start = int(range_split[0])
        end = int(range_split[1])

        for val in range(start, end + 1):
            string_val = str(val)
            if len(string_val) > 1:
                midpoint = int(len(string_val) / 2)
                first_half = string_val[:midpoint]
                second_half = string_val[midpoint:]

                if first_half == second_half:
                    invalid_sum += val

    return invalid_sum

# So, we just need to start w/ the first character
# and see if the next value matches, then get the next 2
# and see if the next 2 matches, so on and so forth, up to the midpoint
def contain_repeat_sequence(input: str):
    if len(input) <= 1: return False

    midpoint = int(len(input) / 2)
    match = False

    for seq_len in range(1, midpoint + 1):
        seq = input[0:seq_len]
        for input_index in range(0, len(input)):
            if input_index + seq_len >= len(input): break

            next_seq_step = input[seq_len:]
            next_seq = next_seq_step[input_index:input_index + seq_len]

            if len(next_seq) != seq_len: break

            match = seq == next_seq
            if not match: break
        
        if match: return True
    
    return False

def part_two(ranges: list[str]):
    invalid_sum = 0

    for ind_range in ranges:
        range_split = ind_range.split('-')
        start = int(range_split[0])
        end = int(range_split[1])

        for val in range(start, end + 1):
            string_val = str(val)
            if contain_repeat_sequence(string_val):
                invalid_sum += val

    return invalid_sum

p = Path(__file__).with_name('input.txt')

ranges = []

with p.open('r') as f:
    ranges = f.read().split(',')
    f.close()

print(contain_repeat_sequence("38593859"))
print(contain_repeat_sequence("111"))

#print(part_one(ranges))
print(part_two(ranges))