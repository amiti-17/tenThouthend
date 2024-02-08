const text = `Max received 2400 USDT.
Kate received 1900.044 USDT.
Andrey received 2550.23 USDT.
Before I confirmed first transaction platform deposit was 11750 USDT.
Than I send Money to charity 900 USDT and paid for flat 1600.93 USDT`;

function countMyBalance(text) {
  let currentResult = 0;
  let currentMax = 0;
  let currentNum = 0;
  let multiplicador = 0;
  for (let i = 0; i < text.length; i++) {
    if (isInteger(text[i])) {
      if (multiplicador > 0) {
        multiplicador *= 10;
      }
      currentNum *= 10;
      currentNum += text[i].charCodeAt(0) - 48;
      continue;
    }
    if ((text[i].charCodeAt(0) === 44 || text[i].charCodeAt(0) === 46) && isInteger(text[i + 1])) {
      multiplicador = 1;
      continue;
    }
    if (currentNum) {
      currentNum /= multiplicador || 1;
      console.log(currentNum)
      if (currentMax < currentNum) {
        currentResult += currentMax;
        currentMax = currentNum;
      } else {
        currentResult += currentNum;
      }
      currentNum = 0;
      multiplicador = 0;
    }
  }
  return currentMax - currentResult;
}

function isInteger(char) {
  return (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57);
}

console.log(countMyBalance(text));