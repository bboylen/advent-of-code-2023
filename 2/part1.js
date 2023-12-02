var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
lines.pop();
function splitLine(line) {
    return line.split(':')[1].split(';').map(function (x) { return x.split(',').map(function (x) { return x.trim().split(' '); }); });
}
var max = {
    blue: 14,
    red: 12,
    green: 13,
};
var result = lines.reduce(function (acc, line, index) {
    var linesWithCount = splitLine(line);
    var ok = linesWithCount.every(function (game) {
        var count = {};
        game.forEach(function (pair) { return count[pair[1]] = (count[pair[1]] || 0) + pair[0]; });
        return Object.keys(count).every(function (key) { return count[key] <= max[key]; });
    });
    return ok ? acc + index + 1 : acc;
}, 0);
console.log(result);
var result2 = lines.reduce(function (acc, line) {
    var linesWithCount = splitLine(line);
    var count = {};
    linesWithCount.forEach(function (game) {
        game.forEach(function (pair) { return count[pair[1]] = count[pair[1]] ? Math.max(count[pair[1]], parseInt(pair[0])) : parseInt(pair[0]); });
    });
    return acc + Object.values(count).reduce(function (acc, num) { return acc * num; });
}, 0);
console.log(result2);
