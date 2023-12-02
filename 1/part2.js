var fs = require('fs');
var input = fs.readFileSync('./input.txt', 'utf8');
var lines = input.split('\n');
lines.pop();
var digitsMap = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
]);
function filterWordDigits(line) {
    var arr = new Array(line.length);
    digitsMap.forEach(function (value, key) {
        var regex = new RegExp(key, 'g');
        var match;
        while ((match = regex.exec(line)) !== null) {
            arr[match.index] = value; // Push the numeric value corresponding to the word
        }
    });
    return arr;
}
function filterDigitsNumbers(line) {
    var arr = new Array(line.length);
    for (var i = 0; i < line.length; i++) {
        if (line[i] >= '0' && line[i] <= '9') {
            arr[i] = line[i];
        }
    }
    return arr;
}
var result = lines.reduce(function (acc, line) {
    var wordDigitArray = filterWordDigits(line);
    var digitArray = filterDigitsNumbers(line);
    var first_number = '';
    for (var i = 0; i < line.length; i++) {
        if (digitArray[i] !== undefined) {
            first_number = digitArray[i];
            break;
        }
        else if (wordDigitArray[i] !== undefined) {
            first_number = wordDigitArray[i];
            break;
        }
    }
    var second_number = '';
    for (var i = line.length - 1; i >= 0; i--) {
        if (digitArray[i] !== undefined) {
            second_number = digitArray[i];
            break;
        }
        else if (wordDigitArray[i] !== undefined) {
            second_number = wordDigitArray[i];
            break;
        }
    }
    return acc + parseInt(first_number + second_number, 10);
}, 0);
console.log(result);
