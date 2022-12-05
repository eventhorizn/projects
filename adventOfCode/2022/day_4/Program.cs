var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var fullyContainsCount = 0;
    foreach (var line in lines)
    {
        var splitRanges = line.Split(',');
        var rangeOne = new Range(splitRanges[0]);
        var rangeTwo = new Range(splitRanges[1]);

        if (IsRangeInsideRange(rangeOne, rangeTwo) ||
            IsRangeInsideRange(rangeTwo, rangeOne))
            fullyContainsCount++;
    }

    Console.WriteLine(fullyContainsCount);
}

static bool IsRangeInsideRange(Range rangeOne, Range rangeTwo)
{
    return rangeOne.Lower >= rangeTwo.Lower && rangeOne.Higher <= rangeTwo.Higher;
}

static void PartTwo(IList<string> lines)
{
    var overlapsCount = 0;
    foreach (var line in lines)
    {
        var splitRanges = line.Split(',');
        var rangeOne = new Range(splitRanges[0]);
        var rangeTwo = new Range(splitRanges[1]);

        if (RangesOverlap(rangeOne, rangeTwo))
            overlapsCount++;
    }

    Console.WriteLine(overlapsCount);
}

// Nifty way to figure this out
// If rangeOne.Min <= rangeTwo.Max and rangeTwo.Min <= rangeOne.Max, we know they overlap
// This has to be true if there's any overlap
static bool RangesOverlap(Range rangeOne, Range rangeTwo)
{
    return rangeOne.Lower <= rangeTwo.Higher && rangeTwo.Lower <= rangeOne.Higher;
}

class Range
{
    public int Lower { get; }
    public int Higher { get; }

    public Range(string range)
    {
        var rangeSplit = range.Split('-');
        Lower = int.Parse(rangeSplit[0]);
        Higher = int.Parse(rangeSplit[1]);
    }
}