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

const text = 'My wallet balance is 14960 USDT';

function parseBalance(message) {

  let answer = '';
  let isNumberFound = false;

  for (let i = 0; i < message.length; i++) {
    if (isInteger(text[i])) {
      if (isNumberFound && answer) {
        answer += text[i];
      } else {
        answer += text[i];
        isNumberFound = true;
      }
    } else {
      isNumberFound = false;
    }
  }

  return ParseInt(answer);
}

console.log(parseBalance(text));