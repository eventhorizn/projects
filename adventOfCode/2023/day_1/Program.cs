var lines = File.ReadAllLines("input.txt");

// Part 1
// var total = 0;
// foreach (var line in lines)
// {
//     // Enumerable of chars
//     var digits = line.Where(char.IsDigit);
//     if (digits.Any())
//     {
//         // Converts char to string, then to int (messy)
//         var number = int.Parse(
//             digits.First().ToString() +
//             digits.Last().ToString());

//         total += number;
//     }
// }

// Console.WriteLine("Part 1");
// Console.WriteLine(total);
// Console.WriteLine("\n");

var total = 0;
var textNumbers = new Dictionary<string, int>
{
    // { "twone", 21 },
    // { "eightwo", 82 },
    // { "eighthree", 83 },
    // { "oneight", 18 },
    // { "threeight", 38 },
    // { "nineight", 98 },
    // { "sevenine", 79 },
    // { "fiveight", 58 },
    { "one", 1 },
    { "two", 2 },
    { "three", 3 },
    { "four", 4 },
    { "five", 5 },
    { "six", 6 },
    { "seven", 7 },
    { "eight", 8 },
    { "nine", 9 }
};

foreach (var line in lines)
{
    var first = FindFirstDigit(line);
    var last = FindLastDigit(line);

    var number = int.Parse(first + last);
    total += number;
}

string FindFirstDigit(string line)
{
    string min = "";
    int minIndex = int.MaxValue;
    foreach (var key in textNumbers.Keys)
    {
        var index = line.IndexOf(key);
        if (index > -1 && index <= minIndex)
        {
            min = key;
            minIndex = index;
        }
    }

    foreach (var value in textNumbers.Values)
    {
        var index = line.IndexOf(value.ToString());
        if (index > -1 && index <= minIndex)
        {
            min = value.ToString();
            minIndex = index;
        }
    }

    if (textNumbers.ContainsKey(min))
    {
        min = textNumbers[min].ToString();
    }

    return min;
}

string FindLastDigit(string line)
{
    string max = "";
    int maxIndex = int.MinValue;
    foreach (var key in textNumbers.Keys)
    {
        var index = line.IndexOf(key);
        if (index > -1 && index >= maxIndex)
        {
            max = key;
            maxIndex = index;
        }
    }

    foreach (var value in textNumbers.Values)
    {
        var index = line.IndexOf(value.ToString());
        if (index > -1 && index >= maxIndex)
        {
            max = value.ToString();
            maxIndex = index;
        }
    }

    if (textNumbers.ContainsKey(max))
    {
        max = textNumbers[max].ToString();
    }

    return max;
}

Console.WriteLine("Part 2");
Console.WriteLine(total);