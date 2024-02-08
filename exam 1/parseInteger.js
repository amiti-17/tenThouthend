// 48 - 57 == 0 - 9;

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

console.log(ParseInt(' 123678004 gjh'));
// console.log(' '.charCodeAt(0))