using System.Diagnostics;
using System.Runtime.Intrinsics.Arm;

var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var head = new Rope(2);

    foreach (var line in lines)
    {
        var lineSplit = line.Split(" ");

        var direction = lineSplit[0];
        var amount = int.Parse(lineSplit[1]);

        head.MoveHead(direction, amount);
    }

    Console.WriteLine(head.TailVisits.Count);
}

static void PartTwo(IList<string> lines)
{
}

class Rope
{
    public IList<Node> Knots { get; } = new List<Node>();
    public Node Head { get; set; }
    public Node Tail { get; set; }
    public IList<Node> TailVisits { get; } = new List<Node>();

    public Rope(int numKnots)
    {
        for (var i = 0; i < numKnots; i++)
        {
            Knots.Add(new Node { X = 0, Y = 0 });
        }

        Head = Knots.First();
        Head = Knots.Last();

        // Initial starting point
        AddVisit();
    }

    public void MoveHead(string direction, int amount)
    {
        // foreach(var knot in Knots)
        // {
        for (var i = 0; i < amount; i++)
        {
            if (direction == "R") Head.X++;
            if (direction == "U") Head.Y++;
            if (direction == "L") Head.X--;
            if (direction == "D") Head.Y--;

            MoveTail();
        }
        //}
    }

    private void MoveTail()
    {
        if (IsTailAdjacent()) return;

        // We need to move diagonal, up and right
        if (Head.Y > Tail.Y && Head.X > Tail.X)
        {
            Tail.Y++;
            Tail.X++;
            AddVisit();
            return;
        }
        // We need to move diagonal, down and left
        if (Head.Y < Tail.Y && Head.X < Tail.X)
        {
            Tail.Y--;
            Tail.X--;
            AddVisit();
            return;
        }

        // We need to move diagonal, up and left
        if (Head.Y > Tail.Y && Head.X < Tail.X)
        {
            Tail.Y++;
            Tail.X--;
            AddVisit();
            return;
        }

        // We need to move diagonal, down and right
        if (Head.Y < Tail.Y && Head.X > Tail.X)
        {
            Tail.Y--;
            Tail.X++;
            AddVisit();
            return;
        }

        // We need to move right
        if (Head.Y == Tail.Y && Head.X > Tail.X)
        {
            Tail.X++;
            AddVisit();
            return;
        }

        // We need to move left
        if (Head.Y == Tail.Y && Head.X < Tail.X)
        {
            Tail.X--;
            AddVisit();
            return;
        }

        // We need to move up
        if (Head.Y > Tail.Y && Head.X == Tail.X)
        {
            Tail.Y++;
            AddVisit();
            return;
        }

        // We need to move down
        if (Head.Y < Tail.Y && Head.X == Tail.X)
        {
            Tail.Y--;
            AddVisit();
        }
    }

    private void AddVisit()
    {
        if (!TailVisits.Any(x => x.Y == Tail.Y && x.X == Tail.X))
            TailVisits.Add(new Node { X = Tail.X, Y = Tail.Y });
    }

    private bool IsTailAdjacent()
    {
        return Math.Abs(Head.X - Tail.X) <= 1 &&
               Math.Abs(Head.Y - Tail.Y) <= 1;
    }
}

class Node
{
    public int Y { get; set; }
    public int X { get; set; }
}