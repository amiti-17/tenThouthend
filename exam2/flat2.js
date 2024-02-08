function flat(arr, depth = 1) {
  let i = arr.length - 1;
  let result = [];
  let currentDepth = 0;
  let isEntered = false;
  const increaser = {
    [currentDepth]: 0,
  };
  const currentDepthObj = {
    [currentDepth]: arr,
  }

  // for (let i = arr.length - 1; i >= 0; i--) {
  //   if (currentDepthObj[currentDepth][i - increaser] === undefined) {

  //     continue;
  //   }
  //   if (currentDepthObj[currentDepth][i - increaser] instanceof Array) {
  //     currentDepth++;
  //     currentDepthObj[currentDepth] = currentDepthObj[currentDepth - 1][i];
  //     increaser += 2;
  //     i += currentDepthObj[currentDepth].length;
  //     continue;
  //   } else {
  //     result.unshift(currentDepthObj[currentDepth][i]);
  //     continue;
  //   }
  // }

  while (i >= 0) {
    if (currentDepthObj[currentDepth][i - increaser[currentDepth]] === undefined) {
      console.log('out of array', i, currentDepth, increaser[currentDepth], currentDepthObj[currentDepth]);
      // i = increaser;
      // increaser -= currentDepthObj[currentDepth].length;
      currentDepth--;
      // i--;
      isEntered = false;
      continue;
    }
    if (currentDepthObj[currentDepth][i - increaser[currentDepth]] instanceof Array) {
      console.log('instanceof Array', i, currentDepth, increaser[currentDepth], currentDepthObj[currentDepth]);
      currentDepthObj[currentDepth + 1] = currentDepthObj[currentDepth][i - increaser[currentDepth]];
      increaser[currentDepth + 1] = increaser[currentDepth] + i;
      i += currentDepthObj[currentDepth][i - increaser[currentDepth]].length;
      currentDepth++;
      if (!isEntered) {
        i--;
      }
      isEntered = true;
      continue;
    } else {
      result.unshift(currentDepthObj[currentDepth][i - increaser[currentDepth]]);
      console.log('unshift', i, currentDepth, increaser[currentDepth], currentDepthObj[currentDepth]);
      i--;
      isEntered = false;
      continue;
    }
  }

  return result;
}

console.log(flat([1,[2,3,[4,5]]])); // [1,2,3,4,5]

// [1,2,3,[4,5]]  =>  [1,2,3,4,5]

// [1, [2]] => [1,2]
// [1,[2,[3]]] => [1,2,3]