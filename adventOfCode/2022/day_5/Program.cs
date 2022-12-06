using System.ComponentModel;

var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var stacks = BuildStacks();
    for (var i = 0; i < lines.Count; i++)
    {
        // skip the stacks
        if (i < 10) continue;

        var instr = new Instruction(lines[i]);
        var fromStack = stacks[instr.From - 1];
        var toStack = stacks[instr.To - 1];

        for (var j = 0; j < instr.Amount; j++)
        {
            var val = fromStack.Pop();
            toStack.Push(val);
        }
    }

    var output = "";
    foreach (var stack in stacks)
    {
        output += stack.Pop();
    }

    Console.WriteLine(output);
}

static void PartTwo(IList<string> lines)
{
    var stacks = BuildQueues();
    for (var i = 0; i < lines.Count; i++)
    {
        // skip the stacks
        if (i < 10) continue;

        var instr = new Instruction(lines[i]);
        var fromStack = stacks[instr.From - 1];
        var toStack = stacks[instr.To - 1];

        for (var j = 0; j < instr.Amount; j++)
        {
            var val = fromStack.Dequeue();
            toStack.Enqueue(val);
        }
    }

    var output = "";
    foreach (var stack in stacks)
    {
        output += stack.Dequeue();
    }

    Console.WriteLine(output);
}

//             [L] [M]         [M]    
//         [D] [R] [Z]         [C] [L]
//         [C] [S] [T] [G]     [V] [M]
// [R]     [L] [Q] [B] [B]     [D] [F]
// [H] [B] [G] [D] [Q] [Z]     [T] [J]
// [M] [J] [H] [M] [P] [S] [V] [L] [N]
// [P] [C] [N] [T] [S] [F] [R] [G] [Q]
// [Z] [P] [S] [F] [F] [T] [N] [P] [W]
//  1   2   3   4   5   6   7   8   9 
static IList<Stack<char>> BuildStacks()
{
    var stacks = new List<Stack<char>>();
    var stackOne = new Stack<char>(
        new List<char>() { 'Z', 'P', 'M', 'H', 'R' });
    var stackTwo = new Stack<char>(
        new List<char>() { 'P', 'C', 'J', 'B' });
    var stackThree = new Stack<char>(
        new List<char>() { 'S', 'N', 'H', 'G', 'L', 'C', 'D' });
    var stackFour = new Stack<char>(
        new List<char>() { 'F', 'T', 'M', 'D', 'Q', 'S', 'R', 'L' });
    var stackFive = new Stack<char>(
        new List<char>() { 'F', 'S', 'P', 'Q', 'B', 'T', 'Z', 'M' });
    var stackSix = new Stack<char>(
        new List<char>() { 'T', 'F', 'S', 'Z', 'B', 'G' });
    var stackSeven = new Stack<char>(
        new List<char>() { 'N', 'R', 'V' });
    var stackEight = new Stack<char>(
        new List<char>() { 'P', 'G', 'L', 'T', 'D', 'V', 'C', 'M' });
    var stackNine = new Stack<char>(
        new List<char>() { 'W', 'Q', 'N', 'J', 'F', 'M', 'L' });

    stacks.Add(stackOne);
    stacks.Add(stackTwo);
    stacks.Add(stackThree);
    stacks.Add(stackFour);
    stacks.Add(stackFive);
    stacks.Add(stackSix);
    stacks.Add(stackSeven);
    stacks.Add(stackEight);
    stacks.Add(stackNine);

    return stacks;
}

//             [L] [M]         [M]    
//         [D] [R] [Z]         [C] [L]
//         [C] [S] [T] [G]     [V] [M]
// [R]     [L] [Q] [B] [B]     [D] [F]
// [H] [B] [G] [D] [Q] [Z]     [T] [J]
// [M] [J] [H] [M] [P] [S] [V] [L] [N]
// [P] [C] [N] [T] [S] [F] [R] [G] [Q]
// [Z] [P] [S] [F] [F] [T] [N] [P] [W]
//  1   2   3   4   5   6   7   8   9 
static IList<Queue<char>> BuildQueues()
{
    var queues = new List<Queue<char>>();
    var queueOne = new Queue<char>(
        new List<char>() { 'Z', 'P', 'M', 'H', 'R' });
    var queueTwo = new Queue<char>(
        new List<char>() { 'P', 'C', 'J', 'B' });
    var queueThree = new Queue<char>(
        new List<char>() { 'S', 'N', 'H', 'G', 'L', 'C', 'D' });
    var queueFour = new Queue<char>(
        new List<char>() { 'F', 'T', 'M', 'D', 'Q', 'S', 'R', 'L' });
    var queueFive = new Queue<char>(
        new List<char>() { 'F', 'S', 'P', 'Q', 'B', 'T', 'Z', 'M' });
    var queueSix = new Queue<char>(
        new List<char>() { 'T', 'F', 'S', 'Z', 'B', 'G' });
    var queueSeven = new Queue<char>(
        new List<char>() { 'N', 'R', 'V' });
    var queueEight = new Queue<char>(
        new List<char>() { 'P', 'G', 'L', 'T', 'D', 'V', 'C', 'M' });
    var queueNine = new Queue<char>(
        new List<char>() { 'W', 'Q', 'N', 'J', 'F', 'M', 'L' });

    queues.Add(queueOne);
    queues.Add(queueTwo);
    queues.Add(queueThree);
    queues.Add(queueFour);
    queues.Add(queueFive);
    queues.Add(queueSix);
    queues.Add(queueSeven);
    queues.Add(queueEight);
    queues.Add(queueNine);

    return queues;
}

class Instruction
{
    public int Amount { get; }
    public int From { get; }
    public int To { get; }

    // move 7 from 3 to 9
    public Instruction(string line)
    {
        line = line.Substring(line.IndexOf(" ") + 1);
        Amount = int.Parse(line.Substring(0, line.IndexOf(" ")));

        line = line.Substring(line.IndexOf(" ") + 1);
        line = line.Substring(line.IndexOf(" ") + 1);
        From = int.Parse(line.Substring(0, line.IndexOf(" ")));

        line = line.Substring(line.IndexOf(" ") + 1);
        line = line.Substring(line.IndexOf(" ") + 1);
        To = int.Parse(line);
    }
}