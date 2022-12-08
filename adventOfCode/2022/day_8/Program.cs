var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var treeMatrix = FillMatrix(lines);
    var visTrees = 0;

    foreach (var node in treeMatrix)
    {
        if (IsEdgeNode(node, treeMatrix))
        {
            visTrees++;
            continue;
        }

        var treesRight = treeMatrix
            .Where(x => x.Row == node.Row && x.Col > node.Col)
            .ToList();
        var treesLeft = treeMatrix
            .Where(x => x.Row == node.Row && x.Col < node.Col)
            .Reverse().ToList();
        var treesTop = treeMatrix
            .Where(x => x.Col == node.Col && x.Row < node.Row)
            .Reverse().ToList();
        var treesBottom = treeMatrix
            .Where(x => x.Col == node.Col && x.Row > node.Row)
            .ToList();

        if (Tallest(node, treesRight) ||
            Tallest(node, treesLeft) ||
            Tallest(node, treesTop) ||
            Tallest(node, treesBottom))
        {
            visTrees++;
        }
    }

    Console.WriteLine(visTrees);
}

static void PartTwo(IList<string> lines)
{
    var treeMatrix = FillMatrix(lines);

    foreach (var node in treeMatrix)
    {
        if (IsEdgeNode(node, treeMatrix))
        {
            node.ViewScore = 0;
            continue;
        }

        var treesRight = treeMatrix
            .Where(x => x.Row == node.Row && x.Col > node.Col)
            .ToList();
        var treesLeft = treeMatrix
            .Where(x => x.Row == node.Row && x.Col < node.Col)
            .Reverse().ToList();
        var treesTop = treeMatrix
            .Where(x => x.Col == node.Col && x.Row < node.Row)
            .Reverse().ToList();
        var treesBottom = treeMatrix
            .Where(x => x.Col == node.Col && x.Row > node.Row)
            .ToList();

        var rightScore = GetScoreFromDirection(node, treesRight);
        var leftScore = GetScoreFromDirection(node, treesLeft);
        var topScore = GetScoreFromDirection(node, treesTop);
        var bottomScore = GetScoreFromDirection(node, treesBottom);

        node.ViewScore = rightScore * leftScore * topScore * bottomScore;
    }

    var maxScore = treeMatrix.Max(x => x.ViewScore);

    Console.WriteLine(maxScore);
}

static bool Tallest(TreeNode node, IList<TreeNode> nodes)
{
    if (!nodes.Any()) return false;
    return nodes.Max(x => x.Value) < node.Value;
}

static int GetScoreFromDirection(TreeNode node, IList<TreeNode> nodes)
{
    var score = 0;
    for (var i = 0; i < nodes.Count; i++)
    {
        if (node.Value > nodes[i].Value)
            score++;
        else
            return score + 1;
    }

    return score;
}

static IList<TreeNode> FillMatrix(IList<string> lines)
{
    var matrix = new List<TreeNode>();
    for (var i = 0; i < lines.Count; i++)
    {
        var line = lines[i];
        for (var j = 0; j < line.Length; j++)
        {
            var val = int.Parse(line[j].ToString());
            matrix.Add(new TreeNode { Value = val, Row = i, Col = j });
        }
    }
    return matrix;
}

static bool IsEdgeNode(TreeNode node, IList<TreeNode> matrix)
{
    var rowMax = matrix.Max(x => x.Row);
    var colMax = matrix.Max(x => x.Col);

    return
        node.Col == 0 ||
        node.Col == colMax ||
        node.Row == 0 ||
        node.Row == rowMax;
}

class TreeNode
{
    public int Value { get; set; }
    public int Row { get; set; }
    public int Col { get; set; }
    public int ViewScore { get; set; }
}