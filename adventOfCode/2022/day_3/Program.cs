var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var alphPrio = GetAlphabetPriority();
    var prioritySum = 0;
    foreach (var line in lines)
    {
        var common = GetCommonCharacter(line);
        var priority = alphPrio[common];
        prioritySum += priority;
    }

    Console.WriteLine(prioritySum);
}

static char GetCommonCharacter(string line)
{
    var firstComp = line.Substring(0, line.Length / 2);
    var secondComp = line.Substring(line.Length / 2, line.Length / 2);

    var firstCompSet = new HashSet<char>(firstComp);
    var secondCompSet = new HashSet<char>(secondComp);

    var intersection = firstCompSet.Intersect(secondCompSet);

    return intersection.ElementAt(0);
}

static void PartTwo(IList<string> lines)
{
    var alphPrio = GetAlphabetPriority();
    var chunkedLines = lines.Chunk(3);
    var prioritySum = 0;

    foreach (var chunk in chunkedLines)
    {
        var common = GetCommonBadge(chunk);
        var priority = alphPrio[common];
        prioritySum += priority;
    }

    Console.WriteLine(prioritySum);
}

static char GetCommonBadge(string[] line)
{
    var first = new HashSet<char>(line[0]);
    var second = new HashSet<char>(line[1]);
    var third = new HashSet<char>(line[2]);

    var intersection = first.Intersect(second.Intersect(third));

    return intersection.ElementAt(0);
}

static IDictionary<char, int> GetAlphabetPriority()
{
    const string alph = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alphPrio = new Dictionary<char, int>();

    for (var i = 0; i < alph.Length; i++)
    {
        alphPrio.Add(alph[i], i + 1);
    }

    return alphPrio;
}