export function addToList(dict, key, value) {
    if(dict[key]) {
        dict[key].push(value);
    }
    else {
        dict[key] = [value];
    }
}

export function getRandomFloat(min, max, decimals=2) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }