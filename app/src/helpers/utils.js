export function addToList(dict, key, value) {
    if(dict[key]) {
        dict[key].push(value);
    }
    else {
        dict[key] = [value];
    }
}