const text = 'Hello <@Kate />, you did your work well and I sent you 1000 USDT. <@Dmitrty /> was working at the weekend so I sent you 350 USDT. <@Max /> won 600 USDT';

function checkAndConvertToLC(char) {
  if (char.charCodeAt(0) <= 90 && char.charCodeAt(0) >= 65) {
    return String.fromCharCode(char.charCodeAt(0) + 32)
  }

  return char;
}

function countBalance(message) {

  const result = {};
  let isNameInProgress = false;
  let currentName = '';
  let currentSalary = 0;
  let isSalaryFound = false;
  let multiplicador = 1;

  for (let i = 0; i < message.length; i++) {

    if (message[i].charCodeAt(0) === 60) {
      isNameInProgress = true;
      continue;
    }

    if (isNameInProgress) {
      if (message[i].charCodeAt(0) === 64 || message[i].charCodeAt(0) === 47 || message[i].charCodeAt(0) === 32) { // @ /
        continue;
      }

      if (message[i].charCodeAt(0) === 62) { // >
        isNameInProgress = false;
        continue;
      }

      currentName += checkAndConvertToLC(message[i]);
      continue;
    }

    if (currentName && !isNameInProgress && !isSalaryFound) {
      if (isInteger(message[i])) {
        isSalaryFound = true;
        const currentCharCode = message.charCodeAt(i);
        currentSalary = currentSalary * multiplicador + (currentCharCode - 48);
        multiplicador = 10;
        continue;
      } else {
        continue;
      }
    }

    if (isSalaryFound && isInteger(message[i])) {
      const currentCharCode = message.charCodeAt(i);
      currentSalary = currentSalary * multiplicador + (currentCharCode - 48);
      continue;
    }

    if (isSalaryFound && !isInteger(message[i])) {
      result[currentName] = currentSalary;
      isNameInProgress = false;
      isSalaryFound = false;
      currentName = '';
      currentSalary = 0;
      multiplicador = 1;
    }

  }

  return result;
}

function isInteger(char) {
  
  const currentCharCode = char.charCodeAt(0);

  return (currentCharCode > 57 || currentCharCode < 48) ? false : true;
}

// result {
//  kate: 1000,
//  dmitrty: 350,
//  max: 600
//}

console.log(countBalance(text));
// console.log('/'.charCodeAt(0));
