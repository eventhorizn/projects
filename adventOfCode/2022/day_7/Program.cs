var lines = File.ReadAllLines("input.txt");

PartOne(lines);
PartTwo(lines);

static void PartOne(IList<string> lines)
{
    var tree = GetTree(lines);
    var flattenedTree = DepthFirstTraversal(tree);
    var sizeClosest = GetSizeClosest(flattenedTree, 100000);
    Console.WriteLine(sizeClosest);
}

static void PartTwo(IList<string> lines)
{
    var filesystem = 70000000;
    var updateSpace = 30000000;
    var tree = GetTree(lines);
    var flattenedTree = DepthFirstTraversal(tree);

    var maxSize = flattenedTree.Max(x => x.Size());
    var unusedSpace = filesystem - maxSize;
    var spaceToFree = updateSpace - unusedSpace;

    var smallestSpaceToFree = flattenedTree.Where(x => x.Size() > spaceToFree).Min(x => x.Size());

    Console.WriteLine(smallestSpaceToFree);
}

static Tree GetTree(IList<string> lines)
{
    var tree = new Tree("/");
    var pointer = tree;
    foreach (var line in lines)
    {
        var lineSplit = line.Split(' ');
        if (lineSplit[1] == "cd")
        {
            // Gets us past the first line
            if (lineSplit[2] == "/") continue;
            // Go up a node
            if (lineSplit[2] == "..")
                pointer = pointer?.Parent;
            else
                pointer = pointer?.Folders.First(x => x.Name == lineSplit[2]);

            continue;
        }

        // Don't care about this line
        if (lineSplit[1] == "ls")
        {
            continue;
        }

        // New dir, means new node
        if (lineSplit[0] == "dir")
        {
            pointer?.AddFolders(new Tree(lineSplit[1]), pointer);
        }
        else // We have a file
        {
            pointer?.AddFiles(int.Parse(lineSplit[0]));
        }
    }

    return tree;
}

static IEnumerable<Tree> DepthFirstTraversal(Tree tree)
{
    var trees = new Stack<Tree>();
    trees.Push(tree);

    while (trees.Count > 0)
    {
        var n = trees.Pop();
        yield return n;

        for (var i = n.Folders.Count - 1; i >= 0; i--)
            trees.Push(n.Folders[i]);
    }
}

static int GetSizeClosest(IEnumerable<Tree> trees, int value)
{
    var sum = 0;
    foreach (var tree in trees)
    {
        var treeSize = tree.Size();
        sum += treeSize <= value ? treeSize : 0;
    }

    return sum;
}

class Tree
{
    public IList<int> Files { get; set; }
    public IList<Tree> Folders { get; set; }
    public Tree? Parent { get; set; }
    public string Name { get; set; }

    public Tree(string name)
    {
        Name = name;
        Files = new List<int>();
        Folders = new List<Tree>();
    }

    public void AddFiles(int size)
    {
        Files.Add(size);
    }

    public void AddFolders(Tree child, Tree parent)
    {
        Folders.Add(child);
        child.Parent = parent;
    }

    public int Size()
    {
        var totalSize = 0;
        foreach (var file in Files)
        {
            totalSize += file;
        }

        foreach (var folder in Folders)
        {
            var folderSize = folder.Size();
            totalSize += folderSize;
        }

        return totalSize;
    }
}