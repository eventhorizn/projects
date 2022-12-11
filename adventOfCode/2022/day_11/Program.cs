using System;
using System.Numerics;

var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    MonkeyBusiness(lines, true, 20);
}

static void PartTwo(IList<string> lines)
{
    MonkeyBusiness(lines, false, 10000);
}

static void MonkeyBusiness(IList<string> lines, bool divide, int numRounds)
{
    var monkeyLines = new List<string>();
    var monkeys = new List<Monkey>();
    foreach (var line in lines)
    {
        if (string.IsNullOrEmpty(line))
        {
            monkeys.Add(new Monkey(monkeyLines));
            monkeyLines = new List<string>();
        }
        else
        {
            monkeyLines.Add(line);
        }
    }

    monkeys.Add(new Monkey(monkeyLines));

    var round = new Round(monkeys);
    for (var i = 0; i < numRounds; i++)
    {
        round.ApplyRound(divide);
    }

    var mostActive = monkeys.Max(x => x.Inspections);
    monkeys.Remove(monkeys.First(x => x.Inspections == mostActive));
    var secondMostActive = monkeys.Max(x => x.Inspections);
    long monkeyBusiness = (long)((long)mostActive * (long)secondMostActive);

    Console.WriteLine(monkeyBusiness);
}

class Round
{
    public IList<Monkey> Monkeys { get; }

    public Round(IList<Monkey> monkeys)
    {
        Monkeys = monkeys;
    }

    public void ApplyRound(bool divide)
    {
        var globalMod = Monkeys.Select(x => x.TestDivisible).Aggregate(1, (x, y) => (int)(x * y));

        foreach (var monkey in Monkeys)
        {
            var items = new List<long>();
            items.AddRange(monkey.Items);

            foreach (var item in items)
            {
                monkey.Items.Remove(item);
                monkey.Inspections++;

                var newItem = monkey.ApplyOperation(item, divide, globalMod);

                if (newItem % monkey.TestDivisible == 0)
                {
                    Monkeys[monkey.TestTrueMonkey].Items.Add(newItem);
                }
                else
                {
                    Monkeys[monkey.TestFalseMonkey].Items.Add(newItem);
                }
            }
        }
    }
}

class Monkey
{
    public IList<long> Items { get; set; } = new List<long>();
    public string Operation { get; set; }
    public long TestDivisible { get; set; }
    public int TestTrueMonkey { get; set; }
    public int TestFalseMonkey { get; set; }
    public int Inspections { get; set; }

    public Monkey(IList<string> lines)
    {
        ParseLines(lines);
    }

    public long ApplyOperation(double value, bool divide, int globalMod)
    {
        var splitOperation = Operation.Split(' ');
        // first is always 'old' which is just the value
        var first = value;
        // if old, it's value, otherwise it's the int value
        var second = splitOperation[2] == "old" ?
            value :
            int.Parse(splitOperation[2]);
        var oper = splitOperation[1];

        long worryLevel;
        if (oper == "*")
            worryLevel = (long)(first * second);
        else
            worryLevel = (long)(first + second);

        if (divide)
            return (long)Math.Floor(worryLevel / 3.0);

        return worryLevel % globalMod;
    }

    private void ParseLines(IList<string> lines)
    {
        // Don't care about Monkey number
        lines.RemoveAt(0);

        ParseStartingItems(lines[0]);
        ParseOperation(lines[1]);
        ParseTestDivisible(lines[2]);
        ParseTestTrue(lines[3]);
        ParseTestFalse(lines[4]);
    }

    private void ParseStartingItems(string line)
    {
        // Ugly
        line = line.Remove(0, "  Starting items: ".Length);
        foreach (var splitItem in line.Split(','))
        {
            Items.Add(int.Parse(splitItem.Trim()));
        }
    }

    private void ParseOperation(string line)
    {
        Operation = line.Remove(0, "  Operation: new = ".Length);
    }

    private void ParseTestDivisible(string line)
    {
        TestDivisible = int.Parse(line.Remove(0, "  Test: divisible by ".Length));
    }

    private void ParseTestTrue(string line)
    {
        TestTrueMonkey = int.Parse(line.Remove(0, "    If true: throw to monkey ".Length));
    }

    private void ParseTestFalse(string line)
    {
        TestFalseMonkey = int.Parse(line.Remove(0, "    If false: throw to monkey ".Length));
    }
}