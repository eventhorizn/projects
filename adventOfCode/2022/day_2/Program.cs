var lines = File.ReadAllLines("input.txt");

// Part 1
var rounds = new List<Round>();
foreach (var line in lines)
{
    var opponentShape = GetShapeFromCode(line[0].ToString());
    var myShape = GetShapeFromCode(line[2].ToString());
    rounds.Add(new Round(myShape, opponentShape));
}

Console.WriteLine(rounds.Sum(x => x.Score));

// Part 2
var scores = new List<int>();
foreach (var line in lines)
{
    var outcome = GetOutcomeFromCode(line[2].ToString());
    var opponentShape = GetShapeFromCode(line[0].ToString());
    var myShape = new ShapeFromOutcome(outcome, opponentShape).MyShape;
    scores.Add((int)outcome + (int)myShape);
}

Console.WriteLine(scores.Sum());

static Outcome GetOutcomeFromCode(string code)
{
    if (code == "X")
        return Outcome.LOST;
    if (code == "Y")
        return Outcome.DRAW;
    return Outcome.WIN;
}

static Shape GetShapeFromCode(string code)
{
    if (code == "A" || code == "X")
        return Shape.ROCK;
    if (code == "B" || code == "Y")
        return Shape.PAPER;

    return Shape.SCISSORS;
}

public enum Shape
{
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3
}

public enum Outcome
{
    LOST = 0,
    DRAW = 3,
    WIN = 6
}

class Round
{
    public Outcome Outcome { get; }
    public int Score { get; }

    public Round(Shape myShape, Shape opponentShape)
    {
        Outcome = CalculateRoundScore(myShape, opponentShape);
        Score = (int)myShape + (int)Outcome;
    }

    private static Outcome CalculateRoundScore(Shape myShape, Shape opponentShape)
    {
        if (myShape.Equals(Shape.ROCK))
            return CalculateRoundScoreRock(opponentShape);
        if (myShape.Equals(Shape.PAPER))
            return CalculateRoundScorePaper(opponentShape);
        return CalculateRoundScoreScissors(opponentShape);
    }

    // I've chosen Rock
    private static Outcome CalculateRoundScoreRock(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Outcome.DRAW;
        if (opponentShape.Equals(Shape.SCISSORS))
            return Outcome.WIN;
        return Outcome.LOST;
    }

    // I've chosen Paper
    private static Outcome CalculateRoundScorePaper(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Outcome.WIN;
        if (opponentShape.Equals(Shape.SCISSORS))
            return Outcome.LOST;
        return Outcome.DRAW;
    }

    // I've Chosen Scissors
    private static Outcome CalculateRoundScoreScissors(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Outcome.LOST;
        if (opponentShape.Equals(Shape.SCISSORS))
            return Outcome.DRAW;
        return Outcome.WIN;
    }
}

class ShapeFromOutcome
{
    public Shape MyShape { get; set; }

    public ShapeFromOutcome(Outcome outcome, Shape opponentShape)
    {
        MyShape = GetMyShape(outcome, opponentShape);
    }

    private static Shape GetMyShape(Outcome outcome, Shape opponentShape)
    {
        if (outcome.Equals(Outcome.WIN))
            return ShapeFromWin(opponentShape);
        if (outcome.Equals(Outcome.LOST))
            return ShapeFromLoss(opponentShape);
        return ShapeFromDraw(opponentShape);
    }

    private static Shape ShapeFromWin(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Shape.PAPER;
        if (opponentShape.Equals(Shape.PAPER))
            return Shape.SCISSORS;

        return Shape.ROCK;
    }

    private static Shape ShapeFromLoss(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Shape.SCISSORS;
        if (opponentShape.Equals(Shape.PAPER))
            return Shape.ROCK;

        return Shape.PAPER;
    }

    private static Shape ShapeFromDraw(Shape opponentShape)
    {
        if (opponentShape.Equals(Shape.ROCK))
            return Shape.ROCK;
        if (opponentShape.Equals(Shape.PAPER))
            return Shape.PAPER;

        return Shape.SCISSORS;
    }
}