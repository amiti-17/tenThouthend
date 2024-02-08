// array need to be sorted
// time to access to any element of data structure are equal
const array = [2, 3, 5, 8, 12, 16, 23, 38, 56, 72, 91];

function binarySearch(arr, data) {
  let startIndex = 0;
  let finishIndex = arr.length - 1;
  const maxAmountOfIteration = Math.round(Math.log2(array.length)) + 1;
  for(let i = 0; i <= maxAmountOfIteration; i++) {
    console.log(startIndex, finishIndex, i)
    if (startIndex <= finishIndex) {
      const currentIndex = startIndex + Math.floor((finishIndex - startIndex) / 2);
      const currentData = arr[currentIndex]
      if (currentData === data) {
        return currentIndex;
      } else {
        if (currentData > data) {
          finishIndex = currentIndex - 1;
        } else {
          startIndex = currentIndex + 1;
        }
      }
    } else {
      return -1;
    }
  }
  
}

console.log(binarySearch(array, -1));