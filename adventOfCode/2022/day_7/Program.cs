using System.Net.NetworkInformation;

var lines = File.ReadAllLines("input.txt");

PartOne(lines);
//PartTwo(lines);


static void PartOne(IList<string> lines)
{
    var tree = GetTree(lines);
    var value = tree.GetSizeClosest(100000);
    var blah = "";
}

static Tree GetTree(IList<string> lines)
{
    var tree = new Tree();
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
                pointer = pointer?.Folders[lineSplit[2]];

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
            pointer?.AddFolders(lineSplit[1], new Tree(), pointer);
        }
        else // We have a file
        {
            pointer?.AddFiles(lineSplit[1], int.Parse(lineSplit[0]));
        }
    }

    return tree;
}

class Tree
{
    public Dictionary<string, int> Files { get; set; }
    public Dictionary<string, Tree> Folders { get; set; }
    public Tree? Parent { get; set; }


    public Tree()
    {
        Files = new Dictionary<string, int>();
        Folders = new Dictionary<string, Tree>();
    }

    public void AddFiles(string name, int size)
    {
        Files.Add(name, size);
    }

    public void AddFolders(string name, Tree child, Tree parent)
    {
        Folders.Add(name, child);
        child.Parent = parent;
    }

    public int Size()
    {
        var totalSize = 0;
        foreach (var file in Files)
        {
            totalSize += file.Value;
        }

        foreach (var folder in Folders)
        {
            var folderSize = folder.Value.Size();
            totalSize += folderSize;
        }

        return totalSize;
    }

    public int GetSizeClosest(int value)
    {
        var sum = 0;
        foreach (var folder in Folders)
        {
            var folderSize = folder.Value.Size();
            sum += folderSize <= value ? folder.Value.Size() : 0;
        }

        return sum;
    }
}