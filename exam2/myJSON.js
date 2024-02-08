const myJSON = {
  stringify,
  parse,
}

const testObj = {a: []};
const testObj1 = {
  someText: "hi, it's text...",
  andObj: {
    a: [55, 'a', 'new Date()', new Date()],
    b: {bb: 'some text', a: ''},
  },
}

const testText = `{"someText": "hi, it's 7 text..." , "andObj45":{"a":16}}`;
const testText1 = `{"someText": "hi, it's text...","andObj":{"a":"2024-02-04T11:44:49.517Z"}}`;

const result = JSON.parse(testText);
const myResult = myJSON.parse(testText);
console.log(testText);
// console.log(result);
console.log(myResult);

function stringify(obj) {
  let result = '{';
  let currentObj = [
    {
      keys: Object.keys(obj),
      obj: obj,
      ending: '}',
      increaser: 0,
      isArray: false,
    },
  ]
  let currentDepth = 0;
  for (let i = 0; i < Infinity; i++) {
    // console.log(i, currentObj[currentDepth])
  // const testObj1 = {
  //   someText: "hi, it's text...",
  //   andObj: {
  //     a: [55, 3],
  //     b: {bb: 'some text'},
  //   },
  // } // `{"someText":"hi, it's text...","andObj":{"a":[55,3], "b": {"bb":"some tex"'}}}`
    if (currentObj[currentDepth].keys.length !== i) {
      if (!currentObj[currentDepth].isArray) {
        console.log()
        result += (i !== 0 ? ',' : '') + '"' + currentObj[currentDepth].keys[i] + '"' + ':';
      }
      const currentValue = currentObj[currentDepth].obj[currentObj[currentDepth].keys[i]];
      if (!(currentValue instanceof Object)) {
        result += currentObj[currentDepth].isArray && i !== 0 ? ',' : '';
        result += typeof currentValue === 'string' ? `"${currentValue}"` : currentValue;
        continue;
      }
      if (currentValue instanceof Date) {
        result += currentObj[currentDepth].isArray && i !== 0 ? ',' : '';
        result += `"${currentValue.toJSON()}"`;
        continue;
      }
      let isArray = currentValue instanceof Array;
      currentObj[++currentDepth] = {
        keys: Object.keys(currentObj[currentDepth - 1].obj[currentObj[currentDepth - 1].keys[i]]),
        obj: currentObj[currentDepth - 1].obj[currentObj[currentDepth - 1].keys[i]],
        ending: isArray ? ']' : '}',
        increaser: i,
        isArray,
      }
      i = -1;
      result += isArray ? '[' : '{';
      if (currentObj[currentDepth].keys.length === 0) {
        i = currentObj[currentDepth].increaser;
        result += currentObj[currentDepth].ending;
        currentDepth--;
      }
      continue;

    } else {
      result += currentObj[currentDepth].ending;
      i = currentObj[currentDepth].increaser;
      if (--currentDepth == -1) {
        break;
      }
      continue;
    }
  }
  return result;
}

function parse(str) {
  const stack = [{}];
  let isKeyInProgress = false;
  let key = "";
  let isValueInProgress = false;
  let value = "";
  let isValueString = true;
  let increaser = 10;
  let decrease = 0.1;
  let currentDepth = 0;
  let isColonLeft = true;
  let isArrayNow = stack[currentDepth] instanceof Array;

  for (let i = 0; i <= str.length; i++) {
    isArrayNow = stack[currentDepth] instanceof Array;

    if (isArrayNow) {
      if (!isValueInProgress && str[i] === ' ') {
        continue;
      }
      if (isValueInProgress) {
        if (isValueString) {
          if (str[i] === '"') {
            isValueInProgress = false;
          } else {
            value += str[i];
          }
        } else {
          if ((str[i].charCodeAt(0) >= '0'.charCodeAt(0) && str[i].charCodeAt(0) <= '9'.charCodeAt(0)) || str[i].charCodeAt(0) === '.'.charCodeAt(0)) {
            if (str[i].charCodeAt(0) === '.'.charCodeAt(0) || decrease !== 1) {
              decrease *= 10;
            }
            value *= increaser;
            value += str[i].charCodeAt(0) - '0'.charCodeAt(0);
          } else {
            isValueInProgress = false;
          }
        }
        continue;
      } else {
        if (str[i] === '"' && !value) {
          isValueInProgress = true;
          isValueString = true;
          value = 0;
          continue;
        }
        if (!value) {
          if (str[i].charCodeAt(0) >= '0'.charCodeAt(0) && str[i].charCodeAt(0) <= '9'.charCodeAt(0)) {
            isValueInProgress = true;
            isValueString = false;
            value = 0;
            increaser = 10;
            decrease = 0.1;
            continue;
          }
        }
      }
      if (str[i] === ',') {
        if (isValueString) {
          stack[currentDepth].push(value);
        } else {
          stack[currentDepth].push( decrease === 0.1 ? value : value / decrease);
        }
        value = undefined;
        isValueString = true;
        decrease = 0.1;
        continue;
      }
      continue;
    }

    if (str[i] === '"') {
      if (isKeyInProgress) {
        isKeyInProgress = false;
        continue;
      }
      if (isValueInProgress) {
        isValueInProgress = false;
        continue;
      }
    } else {
      if (isKeyInProgress) {
        key += str[i];
        continue;
      }
      if (isValueInProgress) {
        if (isValueString) {
          value += str[i];
        } else {
          value *= increaser;
          value += str[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
        continue;
      }
    }

    if (str[i] === ':' && !isKeyInProgress && !isValueInProgress) {
      isColonLeft = !isColonLeft;
      continue;
    }

    switch (str[i]) {
      case '{':
        currentDepth++;
        stack[currentDepth] = {};
        continue;
        break;
      case '[':
        currentDepth++;
        stack[currentDepth] = [];
        continue;
        break;
      case '}':
        currentDepth--;
        if (currentDepth < 0) {
          return stack[0];
        }
        if (stack[currentDepth] instanceof Array) {
          stack[currentDepth].push(stack[currentDepth + 1]);
        } else {
          stack[currentDepth][key] = stack[currentDepth + 1];
        }
        key = '';
        value = '';
        continue;
        break;
      case ']':
        currentDepth--;
        if (stack[currentDepth] instanceof Array) {
          stack[currentDepth].push(stack[currentDepth + 1]);
        } else {
          stack[currentDepth][key] = stack[currentDepth + 1];
        }
        continue;
        break;
    }

    console.log('somethink went wrong', i, str[i]);

    // if (isKeyInProgress) {
    //   if (str[i] !== '"') {
    //     key += str[i];
    //     continue;
    //   }
    // }
    // if (isValueInProgress) {
    //   if (isValueString) {
    //     if (str[i] !== '"') {
    //       key += str[i];
    //       continue;
    //     }
    //   }
    // }

    // if (isValueInProgress && isValueString && !isKeyInProgress && (str[i].charCodeAt(0) >= '0'.charCodeAt(0) && str[i].charCodeAt(0) <= '9'.charCodeAt(0))) {
    //   value *= increaser;
    //   value += str[i].charCodeAt(0) - '0'.charCodeAt(0);
    // }

    // if (!isKeyInProgress && stack[currentDepth].key && !isValueInProgress
    //   && (str[i].charCodeAt(0) >= '0'.charCodeAt(0) && str[i].charCodeAt(0) <= '9'.charCodeAt(0))) {
    //   isValueInProgress = true;
    //   isValueString = false;
    //   value = str[i].charCodeAt(0) - '0'.charCodeAt(0);
    // }

    // switch (str[i]) {
    //   case '"':
    //     if (isKeyInProgress) {
    //       isKeyInProgress = false;
    //       stack[currentDepth].key = key;
    //       key = '';
    //       break;
    //     } else {
    //       if (isValueInProgress) {
    //         isValueInProgress = false;
    //         if (stack[currentDepth].isArray) {
    //           stack[currentDepth].value.push(value);
    //           value = '';
    //         } else {
    //           stack[currentDepth].value = value;
    //           value = '';
    //         }
    //       } else {
    //         if (stack[currentDepth].key) {
    //           isValueInProgress = true;
    //         } else {
    //           isKeyInProgress = true;
    //         }
    //         isValueString = true;
    //       }
    //     }
    //     break;
    //   case '{':
    //     stack.push({
    //       obj: {},
    //       key: '',
    //       ending: '}',
    //     });
    //     currentDepth++;
    //     break;
    //   case '[':
    //     stack.push({
    //       obj: [],
    //       key: '',
    //       ending: ']',
    //       isArray: true,
    //     });
    //     currentDepth++;
    //     break;
    //   case ']':
    //     stack[currentDepth - 1].obj[stack[currentDepth].key] = stack[currentDepth].obj;
    //     currentDepth--;
    //   case '}':
    //     if (currentDepth === 0) {
    //       return stack[0].obj;
    //     } else {
    //       console.log(stack[currentDepth])
    //       stack[currentDepth - 1].obj[stack[currentDepth].key] = stack[currentDepth].obj;
    //       currentDepth--;
    //       break;
    //     }
    //   default:

    //     break;
    // }
    // if (str[i] === '{') {
    //   stack.push({
    //     obj: {},
    //     key: '',
    //     ending: '}',
    //   });
    //   continue;
    // }

  }
}
