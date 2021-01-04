export function parseJSONStringArray(input) {
    let output = [];
    try {
        output = JSON.parse(input);
        if (!Array.isArray(output)) {
            console.error("Input to parseJSONStringArray was not parsed into array correctly!");
            output = [];
        }
    } catch (e) {
        console.error(e);
    }
    return output;
}

export function getEquationData() {
    const data = { summand: getRandomInt(1, 21), addend: getRandomInt(1, 21) }
    return { ...data, sum: data.summand + data.addend };
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
