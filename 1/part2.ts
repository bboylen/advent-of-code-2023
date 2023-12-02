let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8');
let lines = input.split('\n');
lines.pop()

const digitsMap = new Map<string, string>([
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

function filterWordDigits(line: string): Array<string> {
  let arr: string[] = new Array(line.length);

  digitsMap.forEach((value, key) => {
    let regex = new RegExp(key, 'g');
    let match;
    while ((match = regex.exec(line)) !== null) {
      arr[match.index] = value; // Push the numeric value corresponding to the word
    }
  });
  return arr;
}

function filterDigitsNumbers(line: Array<string>): Array<string> {
  let arr: string[] = new Array(line.length);
  for (let i = 0; i < line.length; i++) {
    if (line[i] >= '0' && line[i] <= '9') {
      arr[i] = line[i];
    }
  }
  return arr;
}

let result = lines.reduce((acc, line) => {
  let wordDigitArray = filterWordDigits(line);
  let digitArray = filterDigitsNumbers(line);
  let first_number = '';
  for (let i = 0; i < line.length; i++) {
    if (digitArray[i] !== undefined) {
      first_number = digitArray[i];
      break;
    }
    else if (wordDigitArray[i] !== undefined) {
      first_number = wordDigitArray[i];
      break;
    }
  }
  let second_number = '';
  for (let i = line.length - 1; i >= 0; i--) {
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

console.log(result)
