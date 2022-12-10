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
    var register = 1;
    var stringOutput = new List<string>();
    var crtPos = 0;
    var output = "";
    for (var i = 0; i < lines.Count; i++)
    {
        var lineSplit = lines[i].Split(" ");

        if (lineSplit[0] == "noop")
        {
            if (crtPos == register ||
                crtPos == register + 1 ||
                crtPos == register - 1)
            {
                output += "#";
            }
            else
            {
                output += ".";
            }

            crtPos++;

            if (output.Length == 40)
            {
                stringOutput.Add(output);
                output = "";
                crtPos = 0;
            }
        }
        if (lineSplit[0] == "addx")
        {
            if (crtPos == register ||
                crtPos == register + 1 ||
                crtPos == register - 1)
            {
                output += "#";
            }
            else
            {
                output += ".";
            }

            crtPos++;

            if (output.Length == 40)
            {
                stringOutput.Add(output);
                output = "";
                crtPos = 0;
            }

            if (crtPos == register ||
                crtPos == register + 1 ||
                crtPos == register - 1)
            {
                output += "#";
            }
            else
            {
                output += ".";
            }

            register += int.Parse(lineSplit[1]);
            crtPos++;

            if (output.Length == 40)
            {
                stringOutput.Add(output);
                output = "";
                crtPos = 0;
            }
        }
    }

    foreach (var lineOut in stringOutput)
    {
        Console.WriteLine(lineOut);
    }
}