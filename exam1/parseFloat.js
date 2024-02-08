// 48 - 57 == 0 - 9;

function isInteger(char) {
  
  const currentCharCode = char.charCodeAt(0);

  return (currentCharCode > 57 || currentCharCode < 48) ? false : true;
}

function ParseFloat(string) {

  let answer = 0;
  let isNumberFound = false;
  let isDotFound = false;
  let multiplicador = 1;

  for (let i = 0; i < string.length; i++) {
    
    if (string[i].charCodeAt(0) === 32 && !isNumberFound) {
      continue;
    }

    if (isInteger(string[i]) || string[i].charCodeAt(0) === 46) {
      if (string[i].charCodeAt(0) === 46 && !isNumberFound) {
        return NaN;
      }
      isNumberFound = true;
      if (string[i].charCodeAt(0) === 46) {
        isDotFound = true;
      }
      const currentCharCode = string.charCodeAt(i);
      if (isDotFound) {
        if (currentCharCode == 46) {
          multiplicador *= 0.1;
          continue;
        }
        multiplicador *= 0.1;
        answer += (currentCharCode - 48) * multiplicador;
      } else {
        answer = answer * multiplicador + (currentCharCode - 48);
        multiplicador = 10;
      }
      
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

console.log(typeof ParseFloat(' 2.2341234 gjh'));
// console.log('.'.charCodeAt(0))