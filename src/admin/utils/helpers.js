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

export function parseJSONStringObject(input) {
    let output = {};
    try {
        output = JSON.parse(input);
        if (Array.isArray(output) || !output) {
            console.error("Input to parseJSONStringObject was not parsed into object correctly!");
            output = {};
        }
    } catch (e) {
        console.error(e);
    }
    return output;
}

export function truncate(str, n){
    if (!str) {
        return str;
    }
    return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
  };
  