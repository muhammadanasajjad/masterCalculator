import { create, all, parse } from "mathjs";

const tolerance = 0.0000001;
const defaultScope = {
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    f: 1,
    g: 1,
    h: 1,
    i: 1,
    j: 1,
    k: 1,
    l: 1,
    m: 1,
    n: 1,
    o: 1,
    p: 1,
    q: 1,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 1,
    w: 1,
    x: 1,
    y: 1,
    z: 1,
};

export function getLaTex(expression) {
    expression = closeBrackets(expression);
    let valid = true;

    try {
        expression = parse(expression).toTex();
    } catch (error) {
        console.log(error);
        valid = false;
    }
    return [expression, valid];
}

export function calculate(expression) {
    try {
        expression = closeBrackets(expression);
        expression = parse(expression);
        let evaluatedExpression = expression.compile().evaluate(defaultScope); // the evaluated expression eg. 53153.256484618684
        return simplifyNumber(evaluatedExpression);
    } catch {
        return;
    }
}

function setup(config) {
    const maths = create(all);

    let replacements = {};

    const fns1 = ["sin", "cos", "tan", "sec", "cot", "csc"];
    fns1.forEach(function (name) {
        const fn = maths[name]; // the original function

        const fnNumber = function (x) {
            // convert from configured type of angles to radians
            switch (config.angles) {
                case "deg":
                    return fn((x / 360) * 2 * Math.PI);
                case "grad":
                    return fn((x / 400) * 2 * Math.PI);
                default:
                    return fn(x);
            }
        };

        // create a typed-function which check the input types
        replacements[name] = maths.typed(name, {
            number: fnNumber,
            "Array | Matrix": function (x) {
                return maths.map(x, fnNumber);
            },
        });
    });

    // create trigonometric functions replacing the output depending on angle config
    const fns2 = ["asin", "acos", "atan", "atan2", "acot", "acsc", "asec"];
    fns2.forEach(function (name) {
        const fn = maths[name]; // the original function

        const fnNumber = function (x) {
            const result = fn(x);

            if (typeof result === "number") {
                // convert to radians to configured type of angles
                switch (config.angles) {
                    case "deg":
                        return (result / 2 / Math.PI) * 360;
                    case "grad":
                        return (result / 2 / Math.PI) * 400;
                    default:
                        return result;
                }
            }

            return result;
        };

        // create a typed-function which check the input types
        replacements[name] = maths.typed(name, {
            number: fnNumber,
            "Array | Matrix": function (x) {
                return maths.map(x, fnNumber);
            },
        });
    });

    maths.import(replacements, { override: true });

    return maths;
}

function closeBrackets(expression) {
    let brackets = 0;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "(") {
            brackets++;
        } else if (expression[i] === ")") {
            brackets--;
        }
    }

    for (let i = 0; i < brackets; i++) {
        expression += ")";
    }
    return expression;
}
// Convert number to square root form if possible
function numberToSqrt(n) {
    let string = n + "";

    // If the number is close to an integer, round it
    if (Math.abs(n - Math.round(n)) <= tolerance) {
        string = Math.round(n) + "";
    } else {
        let nSquared = Math.round(n ** 2);
        if (Math.abs(n - Math.sqrt(nSquared)) <= tolerance) {
            string = `√(${nSquared})`;
        }
    }

    return string;
}

// Main function to simplify the number with generalized constant and power checks
function simplifyNumber(
    n,
    constants = [
        { name: "π", value: Math.PI },
        { name: "e", value: Math.E },
    ]
) {
    let string = n + "";

    // Check if n is close to a square root form
    string = numberToSqrt(n);

    return string; // Return the number as a string if no special form is found
}

// console.log(parse(expression).args);
console.log(calculate("5*pi/3"));
