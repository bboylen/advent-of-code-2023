var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
lines.pop();
var result = lines.reduce(function (acc, line) {
    var number = line.split('').filter(function (char) { return char >= '0' && char <= '9'; }).join();
    console.log(number);
    return acc + parseInt(number[0] + number[number.length - 1], 10);
}, 0);
console.log(result);
