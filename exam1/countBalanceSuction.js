const text = 'My wallet balance is 14690 USDT. I paid 750 USDT for plane tickets and 921 USDT for a flat';

function isInteger(char) {
  const currentCharCode = char.charCodeAt(0);
  return (currentCharCode > 57 || currentCharCode < 48) ? false : true;
}

function ParseInt(string) {

  let answer = 0;
  let isNumberFound = false;
  let multiplicador = 1;

  for (let i = 0; i < string.length; i++) {
    
    if (string[i].charCodeAt(0) === 32 && !isNumberFound) {
      continue;
    }

    if (isInteger(string[i])) {
      isNumberFound = true;
      const currentCharCode = string.charCodeAt(i);
      answer = answer * multiplicador + (currentCharCode - 48);
      multiplicador = 10;
      continue;
    }
    
    if ((string[i].charCodeAt(0) === 32 || !isInteger(string[i])) && isNumberFound) {
      return answer;
    }

    if (i + 1 === string.length && isNumberFound) {
      return answer;
    }

    return NaN;
  }

  return answer;
}

function countBalance(str) {
  let result = 0;
  // let isBaseFound = false;
  let currentNumStr = '';

  for (let i = 0; i < text.length; i++) {

    if (isInteger(str[i])) {
      currentNumStr += str[i];
      continue;
    }

    if (currentNumStr) {
      result = result ? result - ParseInt(currentNumStr) : result + ParseInt(currentNumStr);
      currentNumStr = '';
    }
  }

  return result;
}

console.log(countBalance(text));