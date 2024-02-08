function customFlat(arr, depth = 1) {
  let result = [];
  let stack = [[arr, depth]];

  while (stack.length) {
      let [currentArr, currentDepth] = stack.pop();

      for (let i = currentArr.length - 1; i >= 0; i--) {
          let value = currentArr[i];
          if (Array.isArray(value) && currentDepth > 0) {
              stack.push([value, currentDepth - 1]);
          } else {
              result.unshift(value);
          }
      }
  }

  return result;
}

// Example usage:
const arr = [1, [2, [3, 4], 5], 6];
console.log(customFlat(arr)); // Output: [1, 2, 3, 4, 5, 6]
// console.log(customFlat(arr, 2)); // Output: [1, 2, [3, 4], 5, 6]