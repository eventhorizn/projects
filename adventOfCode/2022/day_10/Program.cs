using System.Runtime.CompilerServices;

var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var cycle = 1;
    var register = 1;
    var signalStrengh = new Dictionary<int, int>();
    for (var i = 0; i < lines.Count; i++)
    {
        var lineSplit = lines[i].Split(" ");

        if (lineSplit[0] == "noop")
        {
            signalStrengh.Add(cycle + 1, register);
            cycle++;
        }
        if (lineSplit[0] == "addx")
        {
            signalStrengh.Add(cycle + 1, register);
            cycle++;

            register += int.Parse(lineSplit[1]);
            signalStrengh.Add(cycle + 1, register);
            cycle++;
        }
    }

    var start = 20;
    var sum = 0;
    while (start <= signalStrengh.Max(x => x.Key))
    {
        var strength = signalStrengh[start] * start;
        sum += strength;
        start += 40;
    }

    Console.WriteLine(sum);
}

static void PartTwo(IList<string> lines)
{
}