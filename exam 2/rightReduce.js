function reduce(array, fn, accumulator) {
  let startIndex;
  if (!array.length) throw(new Error("It's one of edge cases. Not valid array"));
  if (accumulator === undefined) {
    if (array.length === 1) {
      return array[0];
    }
    startIndex = array.length - 2;
    accumulator = array[array.length - 1];
  } else {
    startIndex = array.length - 1;
  }
  for (let i = startIndex; i >= 0; i--) {
    accumulator = fn(accumulator, array[i], i, array);
  }
  return accumulator;
}

console.log(reduce([1,2,3,4,5], (accum, el, i, arr) => {
  accum += el;
  return accum;
}));