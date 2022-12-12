var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    Day12.Solve();
    // var graph = new List<List<int>>
    //     {
    //         new List<int>() { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
    //         new List<int>() { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
    //         new List<int>() { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
    //         new List<int>() { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
    //         new List<int>() { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
    //         new List<int>() { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
    //         new List<int>() { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
    //         new List<int>() { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
    //         new List<int>() { 0, 0, 2, 0, 0, 0, 6, 7, 0 }
    //     };

    // _ = new Djikstra(graph, 1);
}

static void PartTwo(IList<string> lines)
{

}

public class Node
{
    public int xPos { get; set; }
    public int yPos { get; set; }
    public char elevation { get; set; }
    public Node Parent { get; set; }

    public Node(int x, int y, char elev)
    {
        xPos = x;
        yPos = y;
        elevation = elev;
    }

    public void SetParent(Node parent)
    {
        Parent = parent;
    }
}

public static class Day12
{
    static readonly string[] input = File.ReadAllLines("input.txt");
    static Node[,] map;
    static int xSize = input[0].Length;
    static int ySize = input.Length;
    static int[,] mapCoords;

    static Queue<Node> visited = new Queue<Node>();
    static Queue<Node> nodesToVisit = new Queue<Node>();

    static List<Node> Path = new List<Node>();


    public static void Solve()
    {
        int[] startingLocation = new int[2];
        int[] destination = new int[2];
        map = new Node[xSize, ySize];
        for (int y = 0; y < ySize; y++)
        {
            for (int x = 0; x < xSize; x++)
            {
                map[x, y] = new Node(x, y, input[y][x]);
                if (input[y][x] == 'E')
                {
                    destination = new int[] { x, y };
                    map[x, y].elevation = 'z';
                }
                if (input[y][x] == 'S')
                {
                    startingLocation = new int[] { x, y };
                    map[x, y].elevation = 'a';
                }
            }
        }

        nodesToVisit.Enqueue(map[startingLocation[0], startingLocation[1]]);
        nodesToVisit.First().Parent = null;

        while (nodesToVisit.Count > 0 || !visited.Contains(map[destination[0], destination[1]]))
        {
            // Check adjacent nodes
            int[] loc = new int[] { nodesToVisit.First().xPos, nodesToVisit.First().yPos };
            // Up
            if (loc[1] - 1 >= 0)
            {
                if (!nodesToVisit.Contains(map[loc[0], loc[1] - 1]) && !visited.Contains(map[loc[0], loc[1] - 1]) && (map[loc[0], loc[1] - 1].elevation - nodesToVisit.First().elevation) <= 1)
                {
                    map[loc[0], loc[1] - 1].Parent = nodesToVisit.First();
                    nodesToVisit.Enqueue(map[loc[0], loc[1] - 1]);
                }
            }
            // Down
            if (loc[1] + 1 < ySize)
            {
                if (!nodesToVisit.Contains(map[loc[0], loc[1] + 1]) && !visited.Contains(map[loc[0], loc[1] + 1]) && (map[loc[0], loc[1] + 1].elevation - nodesToVisit.First().elevation) <= 1)
                {
                    map[loc[0], loc[1] + 1].Parent = nodesToVisit.First();
                    nodesToVisit.Enqueue(map[loc[0], loc[1] + 1]);
                }
            }
            // Left
            if (loc[0] - 1 >= 0)
            {
                if (!nodesToVisit.Contains(map[loc[0] - 1, loc[1]]) && !visited.Contains(map[loc[0] - 1, loc[1]]) && (map[loc[0] - 1, loc[1]].elevation - nodesToVisit.First().elevation) <= 1)
                {
                    map[loc[0] - 1, loc[1]].Parent = nodesToVisit.First();
                    nodesToVisit.Enqueue(map[loc[0] - 1, loc[1]]);
                }
            }
            // Right
            if (loc[0] + 1 < xSize)
            {
                if (!nodesToVisit.Contains(map[loc[0] + 1, loc[1]]) && !visited.Contains(map[loc[0] + 1, loc[1]]) && (map[loc[0] + 1, loc[1]].elevation - nodesToVisit.First().elevation) <= 1)
                {
                    map[loc[0] + 1, loc[1]].Parent = nodesToVisit.First();
                    nodesToVisit.Enqueue(map[loc[0] + 1, loc[1]]);
                }
            }
            visited.Enqueue(nodesToVisit.Dequeue());
        }
        bool PathFound = false;
        Node check = map[destination[0], destination[1]];
        Path.Add(check);
        while (!PathFound)
        {
            if (check.Parent == null)
            {
                PathFound = true;
            }
            else
            {
                Path.Add(check.Parent);
                check = check.Parent;
            }
        }
        Console.WriteLine(Path.Count - 1);
        Path.Clear();
        check = map[destination[0], destination[1]];
        Path.Add(check);
        PathFound = false;
        while (!PathFound)
        {
            if (check.Parent.elevation == 'b')
            {
                PathFound = true;
            }
            else
            {
                Path.Add(check.Parent);
                check = check.Parent;
            }
        }
        Console.WriteLine(Path.Count + 1);
    }
}