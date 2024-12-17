from pathlib import Path

def update_correct(rules: list[str], update: str):
    for rule in rules:
        rule_list = rule.split('|')
        # only check if rule is true if both are contained
        if (rule_list[0] in update and 
            rule_list[1] in update):
            if update.index(rule_list[0]) > update.index(rule_list[1]):
                return False
            
    return True

def part_one(rules: list[str], updates: list[str]):
    correct_updates = []
    for update in updates:
        if (update_correct(rules, update)):
            correct_updates.append(update)

    total_middle_correct = 0
    for cu in correct_updates:
        cu_array = cu.split(',')
        middle_index = len(cu_array) // 2
        total_middle_correct += int(cu_array[middle_index])
    
    return total_middle_correct

def fix_incorrect(rules: list[str], update: str):
    update_list = update.split(',')

    is_update_correct = False

    while not is_update_correct:
        for rule in rules:
            rule_list = rule.split('|')
            
            # only check if rule is true if both are contained
            if (rule_list[0] in update_list and 
                rule_list[1] in update_list):

                if update_list.index(rule_list[0]) > update_list.index(rule_list[1]):
                    update_list[update_list.index(rule_list[0])] = rule_list[1]
                    update_list[update_list.index(rule_list[1])] = rule_list[0]

            if (update_correct(rules, update_list)):
                return update_list

    return update_list

def part_two(rules: list[str], updates: list[str]):
    incorrect_updates = []
    for update in updates:
        if (not update_correct(rules, update)):
            incorrect_updates.append(update)

    fixed_updates = []
    for iu in incorrect_updates:
        fixed_updates.append(fix_incorrect(rules, iu))
    
    total_middle_correct = 0
    for fu in fixed_updates:
        middle_index = len(fu) // 2
        total_middle_correct += int(fu[middle_index])
    
    return total_middle_correct

p = Path(__file__).with_name('input.txt')

all = []
rules = []
updates = []

with p.open('r') as f:
    all = f.read().split('\n')
    f.close()

for row in all:
    if '|' in row:
        rules.append(row)
    if ',' in row:
        updates.append(row)

print(part_one(rules, updates))
print(part_two(rules, updates))