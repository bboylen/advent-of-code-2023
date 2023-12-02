let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8');
let lines = input.split('\n');
lines.pop()

let result = lines.reduce((acc, line) => {
  let number = line.split('').filter(char => char >= '0' && char <= '9').join()
  console.log(number)
  return acc + parseInt(number[0] + number[number.length - 1], 10);
}, 0);

console.log(result)
