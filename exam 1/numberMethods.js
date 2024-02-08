const methods = ['isFinite', 'isInteger', 'isNaN', 'isSafeInteger', 'parseFloat', 'parseInt'];
const methodsFromPrototype = ['toExponential', 'toFixed', 'toPrecision', 'toString', 'valueOf'];

const iterableArr = ['1', 1, 0, new Number(1), 'abc1', 1n, 10**20, 1.1234, 10.12345, 'someText1.12345moreText', [], [' '], [''], new Set(), {}, undefined, null, NaN];
const iterableNumArr = [1, new Number(10), 1n, 10**20, 10.12345, 1.1234, [], [' '], [''], new Set(), {}, undefined, null, NaN, 1 / 0];

for (let method of methods) {
  iterableArr.forEach(arg => {
    try {
      console.log(method, arg, Number[method](arg, 2));
    } catch (error) {
      console.error(error);
    }
  })
}

for (let method of methodsFromPrototype) {
  iterableNumArr.forEach(arg => {
    try {
      console.log(method, arg, Number.prototype[method].call(arg, 2));
    } catch (error) {
      console.error(error.message);
    }
  })
}

for (let method of methodsFromPrototype) {
  iterableNumArr.forEach(arg => {
    try {
      console.log(method, arg, Number.prototype[method].call(arg));
    } catch (error) {
      console.error(error.message);
    }
  })
}


  // iterableNumArr.forEach(arg => {
  //   try {
  //     console.log('Number.prototype.valueOf', arg, Number.prototype.valueOf());
  //   } catch (error) {
  //     console.error(error);
  //   }
  // })