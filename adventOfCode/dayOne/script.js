/////////////////////////////////////
// Day 1

// Challenge 1

/*
After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.

The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.

To save your vacation, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.

Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.

For example, suppose your expense report contained the following:

1721
979
366
299
675
1456
In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.
*/

// const exp = [1721, 979, 366, 299, 675, 1456];

const exp = [1664, 1909, 1904, 1638, 1844, 1836, 1648, 1710, 1163,
    1684, 1857, 1257, 1718, 1969, 1968, 1578, 1870, 1765, 1846,
    1939, 1858, 1589, 1586, 1767, 1628, 1595, 1601, 1528, 1724,
    1656, 1555, 1150, 1992, 1380, 1142, 1615, 1659, 1835, 1403,
    1119, 1719, 1773, 1613, 1166, 1924, 1879, 1663, 1490, 1726,
    1900, 1228, 1680, 509, 1637, 1030, 1536, 1960, 921, 1894, 1890,
    1829,
    1543,
    1565,
    1341,
    1572,
    1729,
    2006,
    1877,
    1787,
    1999,
    1742,
    1400,
    1851,
    1814,
    1985,
    1934,
    2004,
    1571,
    1993,
    1428,
    1623,
    1753,
    488,
    2008,
    2007,
    1793,
    1762,
    1803,
    1564,
    17,
    1800,
    1373,
    1764,
    1573,
    1643,
    1640,
    1990,
    1098,
    1361,
    1806,
    1754,
    1699,
    1444,
    1967,
    1365,
    1761,
    1493,
    1678,
    1833,
    1603,
    1677,
    1722,
    268,
    1991,
    1807,
    1839,
    1231,
    1419,
    1577,
    1884,
    1668,
    1852,
    1816,
    1626,
    31,
    1123,
    1617,
    1614,
    1915,
    1899,
    1971,
    1954,
    1425,
    792,
    1634,
    1206,
    1988,
    1303,
    1946,
    1942,
    1360,
    1431,
    1979,
    1897,
    1597,
    1700,
    1335,
    1769,
    1495,
    1590,
    1801,
    1982,
    1809,
    1594,
    1338,
    1995,
    1569,
    1824,
    1445,
    1399,
    1818,
    1657,
    1683,
    1916,
    1653,
    1966,
    82,
    1102,
    1535,
    1748,
    1609,
    1996,
    722,
    1646,
    1167,
    1784,
    1616,
    529,
    1788,
    1691,
    1940,
    1596,
    1838,
    1811,
    1813,
    1591,
    1741,
    1606,
    1871,
    1997,
    1827,
    1492,
    1789,
    2002,
    1702,
    1876,
    1251,
    1237,
    1510,
    1093
]

for (var i = 0; i < exp.length; i++) {
    var found = false

    for (var j = 0; j < exp.length - 1; j++) {
        if (exp[i] + exp[j] === 2020) {
            console.log(exp[i], exp[j]);
            console.log(exp[i] * exp[j]); // answer
            found = true;
        }
        if (found) break;
    }
    if (found) break;
}

// Part 2

/*
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.
*/

for (var i = 0; i < exp.length; i++) {
    var found = false

    for (var j = 0; j < exp.length - 1; j++) {
        for (var k = 0; k < exp.length - 2; k++) {
            if (exp[i] + exp[j] + exp[k] === 2020) {
                console.log(exp[i], exp[j], exp[k]);
                console.log(exp[i] * exp[j] * exp[k]); // answer
                found = true;
            }
            if (found) break;
        }

        if (found) break;
    }
    if (found) break;
}