var lines = File.ReadAllLines("input.txt");
var alphPrio = GetAlphabetPriority();

// Part 1
foreach (var line in lines)
{
    var firstComp = line.Substring(0, line.Length / 2);
    var last = line.Substring((int)(line.Length / 2), (int)(line.Length / 2));
    var firstComp =
}

static IDictionary<char, int> GetAlphabetPriority()
{
    const string alph = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alphPrio = new Dictionary<char, int>();

    for (var i = 0; i < alph.Length; i++)
    {
        alphPrio.Add(alph[i], i + 1);
    }

    return alphPrio;
}