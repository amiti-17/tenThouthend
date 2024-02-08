const text = 'Hello team. My wallet balance is 0,0092911 BTC.';

function parseBalance(str) {
  let answer = 0;
  let multiplicador = 0;
  for (let i = 0; i < str.length; i++) {

    if (isInteger(str[i])) {
      if (multiplicador > 0) {
        multiplicador *= 10;
      }
       answer = answer * 10 + str[i].charCodeAt(0) - 48;
       continue;
    }
    if ((str[i].charCodeAt(0) === 44 || str[i].charCodeAt(0) === 46) && isInteger(str[i + 1])) {
      multiplicador = 1;
      continue;
    }
    if (answer) {
      return answer / (multiplicador || 1);
    }
  }

  return answer;
}

function isInteger(char) {
  return (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57);
}

console.log(parseBalance(text));
// console.log(isInteger('8'));