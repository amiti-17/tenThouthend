const methods = [
  'E',
  'LN10',
  'LN2',
  'LOG10E',
  'LOG2E',
  'PI',
  'SQRT1_2',
  'SQRT2',
  'min',
  'max',
  'floor',
  'ceil',
  'round',
  'trunc',
  'abs',
  'random'
];

const methodsWithArgs = [
  'min',
  'max',
  'floor',
  'ceil',
  'round',
  'trunc',
  'abs'
];

const someNums = [1, 0, Infinity, -Infinity, 10**20];
// someNums.forEach(el => console.log(typeof el))

function consoleInOrder(arrWithNums, order) {
  const copy = [...arrWithNums];
  const currentNum = order ? Math.max(...copy) : Math.min(...copy);
  console.log(currentNum);
  const currentIndex = copy.indexOf(currentNum);
  const newArr = copy.slice(0, currentIndex).concat(copy.slice(currentIndex + 1));
  if (newArr.length) {
    return consoleInOrder(newArr, order);
  }
}

consoleInOrder(someNums, 0);