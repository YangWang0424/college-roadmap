

exports.filterObject = function (item, excludedKey){
    let asArray = Object.entries(item);
    let filtered = asArray.filter(function ([key, value]) {return key !== excludedKey});
    return Object.fromEntries(filtered);
}

