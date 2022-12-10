var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    RunRope(lines, 2);
}

static void PartTwo(IList<string> lines)
{
    RunRope(lines, 10);
}

static void RunRope(IList<string> lines, int numKnots)
{
    var rope = new Rope(numKnots);

    foreach (var line in lines)
    {
        var lineSplit = line.Split(" ");

        var direction = lineSplit[0];
        var amount = int.Parse(lineSplit[1]);

        rope.MoveHead(direction, amount);
    }

    Console.WriteLine(rope.TailVisits.Count);
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

        TailVisits.Add(new Node { X = 0, Y = 0 });
    }

    // Starting at the head we move in the direction
    // Then loop through the rope, setting the head to
    // the tail, and the tail to the knot before
    // the previous tail. In that way, we move down the rope knots
    public void MoveHead(string direction, int amount)
    {
        for (var i = 0; i < amount; i++)
        {
            // Rest our head and tail
            Head = Knots[0];
            Tail = Knots[1];

            if (direction == "R") Head.X++;
            if (direction == "U") Head.Y++;
            if (direction == "L") Head.X--;
            if (direction == "D") Head.Y--;

            // Loop through rope, so we can adjust down the line
            var current = 0;
            while (current < Knots.Count)
            {
                MoveTail();
                current++;

                if (current == Knots.Count - 1) break;
                Head = Knots[current];
                Tail = Knots[current + 1];
            }
        }
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
        var tail = Knots.Last();
        if (!TailVisits.Any(x => x.Y == tail.Y && x.X == tail.X))
            TailVisits.Add(new Node { X = tail.X, Y = tail.Y });
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