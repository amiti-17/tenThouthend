function flat(arr, depth = 1) {
  let result = [];
  let increaser = 0;
  let currentDepth = 0;
  let currentDepthObj = {
    currentDepth: arr,
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    if (currentDepth) {
      if (currentDepthObj[currentDepth][i - increaser] === undefined) {
        let tempIncreaser = increaser;
        increaser -= currentDepthObj[currentDepth].length;
        i = currentDepthObj[currentDepth].length === 1 ? tempIncreaser - 1 : tempIncreaser;
        currentDepth--;
        continue;
      } else {
        if (currentDepthObj[currentDepth][i - increaser] instanceof Array) {
          currentDepth++;
          currentDepthObj[currentDepth] = currentDepthObj[currentDepth - 1][i - increaser];
          increaser += i;
          i += currentDepthObj[currentDepth - 1].length;
          continue;
        }
        result.unshift(currentDepthObj[currentDepth][i - increaser]);
        continue;
      }
    }
    if (arr[i] instanceof Array) {
      currentDepth++;
      currentDepthObj[currentDepth] = arr[i];
      increaser += i;
      i += arr[i].length;
      continue;
    }
    result.unshift(arr[i]);
  }
  return result;
}

console.log(flat([1,[2,3, [4, 5]]]));

// [1,2,3,[4,5.[[6]]]]