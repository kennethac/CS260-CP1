Date.prototype.addDays = function (days) {
    return new Date(this.valueOf() + days * 864e5);
}

Array.prototype.groupBy = function(selector) {
    if (this.length == 0) {
        return [];
    }

    let result = [];

    var first = selector(this[0]);
    let group = [];
    for (var i of this) {
        if (selector(i) == first) {
            group.push(i);
        } else {
            result.push({first, group});
            group = [i];
            first = selector(i);
        }
    }
    
    if (group.length > 0) {
        result.push({first, group});
    }

    return result;
}