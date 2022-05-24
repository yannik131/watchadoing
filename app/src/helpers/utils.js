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

export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export function distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const phi1 = lat1 * Math.PI/180; 
    const phi2 = lat2 * Math.PI/180;
    const dphi = (lat2-lat1) * Math.PI/180;
    const ds = (lon2-lon1) * Math.PI/180;
  
    const a = Math.sin(dphi/2) * Math.sin(dphi/2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(ds/2) * Math.sin(ds/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    return R * c; // in metres
}

export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
