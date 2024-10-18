function calculate(
    expression,
    config = {
        functions: [
            { regex: "sin\\(([^)]+)\\)", replace: (val) => Math.sin(val) },
            { regex: "cos\\(([^)]+)\\)", replace: (val) => Math.cos(val) },
        ],
    }
) {
    expression.replace(/ /g, "");
    expression.replace(/--/g, "+");

    // Evaluate the final expression (after all replacements are done)
    return eval(evaluatedExpression);
}

// Example usage:
let result = calculate("sin(0) + cos(0)");
console.log(result);
