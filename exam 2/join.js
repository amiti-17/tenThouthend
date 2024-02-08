const testArr = [1,2,[3],{},5,[6,[7]]];

console.log(testArr.join('-'));

function myJoin(arr, divider, depth = 0) {
  let result = '';
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
        result = result ? currentDepthObj[currentDepth][i] + divider + result : currentDepthObj[currentDepth][i];
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
        result = result ? currentDepthObj[currentDepth][i] + divider + result : currentDepthObj[currentDepth][i];
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

console.log(myJoin(testArr, '-'))