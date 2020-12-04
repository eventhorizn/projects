/////////////////////////////////////
// Day 4

// Challenge 1
/*
You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)
Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

Here is an example batch file containing four passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

According to the above rules, your improved system would report 2 valid passports.

Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?
*/


// Read in test file
var rawText;
var rawFile = new XMLHttpRequest();
rawFile.open('Get', 'input.txt', false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            rawText = rawFile.responseText;

        }
    }
}
rawFile.send(null);


// split test file into array
const rows = [];
rawText.split('\n').forEach(function (line) {
    rows.push(line);
});

// Combine rows until a blank space is hit

const correctedRows = [];
let cr = '';
rows.forEach(x => {
    // blank rows are hard to find, need to do this bullshit
    if (x.length === 1 || x.length === 0) {
        correctedRows.push(cr);
        cr = '';
    } else {
        // need to add a space so my split works below
        cr += ' ' + x;
    }
});
console.log(correctedRows);

// Break down rows into kvp so we can check keys
const passports = [];
correctedRows.forEach(x => {
    const kvpArray = x.trim().split(' ');
    passports.push(kvpArray);
});
console.log(passports);

// Now we can work
/* Required Fields
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
*/

/* Optional Field
cid (Country ID)
*/

const reqFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

/**
 * 
 * @param {Array} passport 
 */
const getKeys = function (passport) {
    const keys = [];
    passport.forEach(x => {
        const arr = x.split(":");
        keys.push(arr[0]);
    });
    return keys;
}

var correctPassports = 0;
passports.forEach(passport => {
    const keys = getKeys(passport);
    let missingField = false;

    reqFields.forEach(x => {
        if (!keys.includes(x)) missingField = true;
    });

    if (!missingField) correctPassports++;
});
console.log(correctPassports);

// Part 2

/*
The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

byr (Birth Year) - four digits; at least 1920 and at most 2002.
iyr (Issue Year) - four digits; at least 2010 and at most 2020.
eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
hgt (Height) - a number followed by either cm or in:
If cm, the number must be at least 150 and at most 193.
If in, the number must be at least 59 and at most 76.
hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
pid (Passport ID) - a nine-digit number, including leading zeroes.
cid (Country ID) - ignored, missing or not.
Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

byr valid:   2002
byr invalid: 2003

hgt valid:   60in
hgt valid:   190cm
hgt invalid: 190in
hgt invalid: 190

hcl valid:   #123abc
hcl invalid: #123abz
hcl invalid: 123abc

ecl valid:   brn
ecl invalid: wat

pid valid:   000000001
pid invalid: 0123456789
Here are some invalid passports:

eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
Here are some valid passports:

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?
*/


/**
 *
 * @param {String} value
 */
const byrValid = function (value) {
    const byr = Number(value);

    if (!Number.isNaN(byr)) {
        return byr >= 1920 && byr <= 2002;
    }
    return false;
}
// console.log(byrValid("2002"));
// console.log(byrValid("2003a"));
// console.log(byrValid("1919"));

/**
 *
 * @param {String} value
 */
const iyrValid = function (value) {
    const iyr = Number(value);

    if (!Number.isNaN(iyr)) {
        return iyr >= 2010 && iyr <= 2020;
    }
    return false;
}
// console.log(iyrValid("2009"));
// console.log(iyrValid("2011"));

/**
 *
 * @param {String} value
 */
const eyrValid = function (value) {
    const eyr = Number(value);

    if (!Number.isNaN(eyr)) {
        return eyr >= 2020 && eyr <= 2030;
    }
    return false;
}
// console.log(eyrValid("2019"));
// console.log(eyrValid("2023"));


/**
 *
 * @param {String} value
 */
const hgtValid = function (value) {
    //let hgt;
    if (value.includes('cm')) {
        const hgt = Number(value.split('cm')[0]);
        if (!Number.isNaN(hgt)) {
            return hgt >= 150 && hgt <= 193;
        }
    }

    if (value.includes('in')) {
        const hgt = Number(value.split('in')[0]);
        if (!Number.isNaN(hgt)) {
            return hgt >= 59 && hgt <= 76;
        }
    }

    return false;
}
// console.log(hgtValid("60in"));
// console.log(hgtValid("190cm"));
// console.log(hgtValid("190in"));
// console.log(hgtValid("190"));

/**
 *
 * @param {String} value
 */
const hclValid = function (value) {
    const checkAlphaNum = /^[a-f0-9]*$/;
    const checkAlpha = /^[a-f]*$/;
    const checkNum = /^[0-9]*$/;
    if (value[0] === "#") {
        const hcl = value.trim().slice(1);
        if (hcl.length === 6) {
            return checkAlphaNum.test(hcl) || checkAlpha.test(hcl) || checkNum.test(hcl);
        }
    }

    return false;
}
// console.log(hclValid('#123abc'));
// console.log(hclValid('#123abz'));
// console.log(hclValid('123abc'));

/**
 *
 * @param {String} value
 */
const elcValid = function (value) {
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return validColors.includes(value.trim());
}
// console.log(elcValid('brn'));
// console.log(elcValid('wat'));

/**
 *
 * @param {String} value
 */
const pidValid = function (value) {
    let pid = Number(value);
    if (!Number.isNaN(pid)) {
        return value.length === 9;
    }

    return false;
}
// console.log(pidValid('000000001'));
// console.log(pidValid('0123456789'));

/**
 * 
 * @param {String} key
 * @param {String} value 
 */
const isFieldValid = function (key, value) {
    if (key === 'byr') {
        return byrValid(value);
    }

    if (key === 'iyr') {
        return iyrValid(value);
    }

    if (key === 'eyr') {
        return eyrValid(value);
    }

    if (key === 'hgt') {
        return hgtValid(value);
    }

    if (key === 'hcl') {
        return hclValid(value);
    }

    if (key === 'ecl') {
        return elcValid(value);
    }

    if (key === 'pid') {
        return pidValid(value);
    }

    return true;
}

/**
 * 
 * @param {String} passport 
 */
const areFieldValuesValid = function (passport) {
    for (i = 0; i <= passport.length - 1; i++) {
        const valArry = passport[i].split(':');
        if (!isFieldValid(valArry[0], valArry[1])) {
            return false;
        }
    }
    return true;
}

var correctPassportsNew = 0;
passports.forEach(passport => {
    const keys = getKeys(passport);
    let missingField = false;

    reqFields.forEach(x => {
        if (!keys.includes(x)) {
            missingField = true;
        }
    });

    if (!missingField && areFieldValuesValid(passport)) correctPassportsNew++;
});
console.log(correctPassportsNew);