var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    // Just one line
    var answer = GetStartOfPacket(lines[0], 4);
    Console.WriteLine(answer);
}

static void PartTwo(IList<string> lines)
{
    // Just one line
    var answer = GetStartOfPacket(lines[0], 14);
    Console.WriteLine(answer);
}

static int GetStartOfPacket(string line, int markerLength)
{
    var lineList = new LinkedList<char>(line);
    var workingList = new LinkedList<char>();
    var loopList = new LinkedList<char>(line);
    // seed list
    for (var i = 0; i < loopList.Count; i++)
    {
        workingList.AddLast(lineList.First.Value);
        lineList.RemoveFirst();

        if (workingList.Count == markerLength && IsUnique(workingList))
            return i + 1;
        else if (workingList.Count == markerLength)
            workingList.RemoveFirst();
    }

    return 0;
}

static bool IsUnique(LinkedList<char> list)
{
    return list.Distinct().Count() == list.Count();
}
