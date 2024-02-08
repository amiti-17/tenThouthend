const words = ['hello', 'zelda', 'world', 'its', 'jeka'];

function getSortedString(data) {
  let currentStr = data.join('');
  let result = {};

  for (let i = 0; i < currentStr.length; i++) {
    result[currentStr[i].charCodeAt(0)] = currentStr[i];
  }

  return Object.values(result).join('');
}

console.log(getSortedString(words));
const obj = {};
obj[99] = 'test1'
obj[34] = 'test2'
obj[55] = 'test3'
obj['c'] = 'test7'
obj[4] = 'test4'
obj['b'] = 'test6'
obj['a'] = 'test5'
console.log(obj)
// написать функцию getSortedString, которая объединит все символы в алфавитном порядке без дубликатов. 
// Запрещено использовать sort, запрещено использовать цикл в цикле, запрещено использовать рекурсии, запрещено явно использовать 2 или более цикла типа for, while, filter, map, reduce, etc.

// результат функции 'abcdefghxyz'