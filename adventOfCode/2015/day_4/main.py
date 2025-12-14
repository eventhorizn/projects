import hashlib

def part_one(key: str):
    hash = ''
    loop_val = 1
    loop_key = key + str(loop_val)
    hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
    
    while not hash.startswith('00000'):
        loop_val += 1
        loop_key = key + str(loop_val)
        hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
 
    return loop_val

def part_one(key: str):
    hash = ''
    loop_val = 1
    loop_key = key + str(loop_val)
    hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
    
    while not hash.startswith('00000'):
        loop_val += 1
        loop_key = key + str(loop_val)
        hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
 
    return loop_val

def part_two(key: str):
    hash = ''
    loop_val = 1
    loop_key = key + str(loop_val)
    hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
    
    while not hash.startswith('000000'):
        loop_val += 1
        loop_key = key + str(loop_val)
        hash = hashlib.md5(loop_key.encode('utf-8')).hexdigest()
 
    return loop_val

#print(part_one('ckczppom'))
print(part_two('ckczppom'))