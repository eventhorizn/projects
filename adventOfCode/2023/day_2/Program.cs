var lines = File.ReadAllLines("input.txt");

var red = "red";
var green = "green";
var blue = "blue";
var baseCubes = new Dictionary<string, int>
{
    { red, 12 },
    { green, 13 },
    { blue, 14 },
};

var total = 0;

foreach (var line in lines)
{
    // Get game number
    var gameNumber = line
        .Substring(0, line.IndexOf(":"))
        .Replace("Game ", "");
    var gameLength = line.IndexOf(":") + 2;
    var randomCubes = line
        .Substring(gameLength, line.Length - gameLength)
        .Split(";");

    var gameValid = GameValid(randomCubes);

    if (gameValid) total += int.Parse(gameNumber);
}

bool GameValid(string[] randomCubes)
{
    foreach (var rc in randomCubes)
    {
        var cubes = rc.Replace(" ", "").Split(',');

        foreach (var cube in cubes)
        {
            if (cube.Contains(green))
            {
                var cubeNumber = cube.Replace(green, "");
                if (int.Parse(cubeNumber) <= baseCubes[green])
                    continue;
                return false;
            }
            if (cube.Contains(red))
            {
                var cubeNumber = cube.Replace(red, "");
                if (int.Parse(cubeNumber) <= baseCubes[red])
                    continue;
                return false;
            }
            if (cube.Contains(blue))
            {
                var cubeNumber = cube.Replace(blue, "");
                if (int.Parse(cubeNumber) <= baseCubes[blue])
                    continue;
                return false;
            }
        }
    }

    return true;
}

Console.WriteLine("Part 1");
Console.WriteLine(total);
