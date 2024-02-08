const str = 'Right part 72 is 49 asdhsad 15 and left part is 56,02'; // 56.02154972

const str2 = 'Right part is 14992 and left part is 0.006'; // 0.00614992

const str3 = 'Right part is 1493 and left part is 5602'; // 56021493

const str4 =  'Right part 82 is 93 lasdlkask 14 and left part is 5602'; // 5602149382

const contactNumber = str => {
  let result = 0;
  let currentNum = 0;
  let multiplicador = 0;
  let divider = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (isInteger(str[i])) {
      if (divider && result) {
        divider++;
      }
      currentNum += (str[i].charCodeAt(0) - 48) * (10 ** multiplicador);
      multiplicador++;
      continue;
    }
    if ((str[i].charCodeAt(0) === 44 || str[i].charCodeAt(0) === 46) && isInteger(str[i + 1])) {
      divider = multiplicador;
      continue;
    }
    if (currentNum) {
      if (divider) {
        if (result) {
          result += currentNum / 10 ** divider;
        } else {
          result = currentNum / 10 ** divider;
        }
      } else {
        if (result) {
          result = result * (10 ** multiplicador) + currentNum;
        } else {
          result = currentNum;
        }
      }
      multiplicador = 0;
      currentNum = 0;
    }
  }
  return result;
}

function isInteger(char) {
  return (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57);
}

console.log(contactNumber(str));