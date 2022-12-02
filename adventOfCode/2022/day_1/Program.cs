var lines = File.ReadAllLines("input.txt");
var elves = new List<Elf>();
var currentElf = new Elf();

foreach (var line in lines)
{
    if (string.IsNullOrEmpty(line))
    {
        elves.Add(currentElf);
        currentElf = new Elf();
    }
    else
    {
        currentElf.Calories.Add(int.Parse(line));
    }
}

// Part 1
var maxCalories = elves.Max(x => x.TotalCalories);
Console.WriteLine(maxCalories);

// Part 2
var sortedElves = elves.OrderBy(x => x.TotalCalories);
Console.WriteLine(sortedElves.TakeLast(3).Sum(x => x.TotalCalories));

class Elf
{
    public IList<int> Calories { get; set; } = new List<int>();
    public int TotalCalories { get => Calories.Sum(); }
}