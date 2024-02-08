function flat(arr, depth = 1) {
  let i = arr.length - 1;
  let result = [];
  let currentDepth = 0;
  let isShouldFloatUp = false;
  const currentDepthObj = {
    [currentDepth]: arr,
  }
  const indexObj = {
    [currentDepth]: currentDepthObj[currentDepth].length - 1,
  };

  for (let i = indexObj[currentDepth]; i >= 0; i--) {
    if (currentDepthObj[currentDepth][i] instanceof Array && !isShouldFloatUp) {
      if (currentDepth + 1 > depth) {
        result.unshift(currentDepthObj[currentDepth][i]);
        if (i) {
          continue;
        } else {
          isShouldFloatUp = true;
        }
      } 
      currentDepth++;
      currentDepthObj[currentDepth] = currentDepthObj[currentDepth - 1][i];
      indexObj[currentDepth] = i;
      i = currentDepthObj[currentDepth].length;
      continue;
    } else {
      if (isShouldFloatUp) {
        currentDepth--;
        i = indexObj[currentDepth + 1];
        isShouldFloatUp = false;
      } else {
        result.unshift(currentDepthObj[currentDepth][i]);
      }
      
      if (i === 0 && currentDepth > 0) {
        currentDepth--;
        i = indexObj[currentDepth + 1];
        if ( i === 0 && currentDepth === 0) break;
        if (i === 0 && currentDepth > 0) {
          isShouldFloatUp = true;
          i++;
        }
      }
      continue;
    }
  }
  return result;
}
console.log(flat([1, [[[[[3]]], 4]], [[5]]], Infinity));