const text = 'I paid 750 USDT for plane tickets and 921 USDT for a flat. My wallet balance is 14690 USDT.'

function isInteger(char) {
  const currentCharCode = char.charCodeAt(0);
  return (currentCharCode > 57 || currentCharCode < 48) ? false : true;
}

function countBalanceReverse(str) {
  let result = 0;
  let currentNum = 0;
  let multiplicador = 1;

  for (let i = text.length - 1; i >= 0; i--) {

    if (isInteger(str[i])) {
      currentNum += multiplicador * (str[i].charCodeAt(0) - 48);
      multiplicador *= 10;
      continue;
    }
    if (currentNum) {
      if (result) {
        result -= currentNum;
      } else {
        result = currentNum;
      }
      currentNum = 0;
      multiplicador = 1;
    }
  }

  return result;
}

console.log(countBalanceReverse(text));

// function ParseIntReverse(string) {

//   let answer = 0;
//   let isNumberFound = false;
//   let multiplicador = 1;

//   for (let i = 0; i < string.length; i++) {
    
//     if (string[i].charCodeAt(0) === 32 && !isNumberFound) {
//       continue;
//     }

//     if (isInteger(string[i])) {
//       isNumberFound = true;
//       const currentCharCode = string.charCodeAt(i);
//       answer += multiplicador * (currentCharCode - 48);
//       multiplicador *= 10;
//       continue;
//     }
    
//     if ((string[i].charCodeAt(0) === 32 || !isInteger(string[i])) && isNumberFound) {
//       return answer;
//     }

//     if (i + 1 === string.length && isNumberFound) {
//       return answer;
//     }

//     return NaN;
//   }

//   return answer;
// }