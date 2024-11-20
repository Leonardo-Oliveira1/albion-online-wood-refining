function calculateLogs(tier, amount) {
    // Definition of the number of logs required per plank at each level
    const logsPerTier = {
        3: 2, // T3
        4: 2, // T4
        5: 3, // T5
        6: 4, // T6
        7: 5, // T7
        8: 5  // T8
    };

    // Check if the level is valid (minimum T2)
    if (tier < 2) {
        throw new Error("T2 is the minimum Tier.");
    }

    // Object to store the logs amount per level
    const result = {
        T2: 0,
        T3: 0,
        T4: 0,
        T5: 0,
        T6: 0,
        T7: 0,
        T8: 0
    };

    function calculate(currentTier, currentAmount) {
        // Base case: T2 does not depend on previous levels, just one T2 plank per board
        if (currentTier === 2) {
            result.T2 += currentAmount;
            return;
        }

        // Increases the required planks to the current level
        result[`T${currentTier}`] += logsPerTier[currentTier] * currentAmount;

        // Calculates for the previous level, multiplying by the number of planks in the previous level
        for (let i = 0; i < logsPerTier[currentTier]; i++) {
            calculate(currentTier - 1, currentAmount);
        }
    }

    // Starts the calculation with the specified amount
    calculate(tier, amount);

    return result;
}

var desiredtier = 3;
var planksAmount = 1;
console.log(`To produce ${planksAmount} unit(s) of T${desiredtier} plank(s) the following amounts of logs are needed:`);
console.log(calculateLogs(desiredtier, planksAmount));
