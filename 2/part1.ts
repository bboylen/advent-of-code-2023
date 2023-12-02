let fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf8');
let lines = input.split('\n');
lines.pop()

function splitLine(line: string) {
  return line.split(':')[1].split(';').map(x => x.split(',').map(x => x.trim().split(' ')))
}

let max = {
  blue: 14,
  red: 12,
  green: 13,
}

let result = lines.reduce((acc, line, index) => {
  let linesWithCount = splitLine(line)
  let ok = linesWithCount.every((game) => {
    let count = {}
    game.forEach((pair) => count[pair[1]] = (count[pair[1]] || 0) + pair[0])
    return Object.keys(count).every((key) => count[key] <= max[key])
  })
  return ok ? acc + index + 1 : acc
}, 0)

console.log(result)

// --------------------------------------------

type Count = { [key: string]: number };

let result2 = lines.reduce((acc, line) => {
  let linesWithCount = splitLine(line)
  let count: Count = {}
  linesWithCount.forEach((game) => {
    game.forEach((pair) => count[pair[1]] = count[pair[1]] ? Math.max(count[pair[1]], parseInt(pair[0])) : parseInt(pair[0]))
  })

  return acc + Object.values(count).reduce((acc: number, num: number) => acc * num)
}, 0)

console.log(result2)
