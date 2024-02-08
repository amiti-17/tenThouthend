let vocabulary = [];
function isObject(variable) {
  let instance = variable instanceof Object;
  if (instance) {
    return variable.constructor.name
  } else {
    return `It's (${variable}) not a object.`
  }
  // return "Object";
}

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

console.log(isObject(new WeakMap()));
console.log(isObject(new Map()));
console.log(isObject(new Date()));
console.log(isObject(new CustomEvent('click', { detail: { name: 'some custom event' } })));
console.log(isObject(null));
console.log(null instanceof Object);
console.log(isObject(new Rectangle(2,4)));
console.log(new Rectangle(2,4) instanceof Object);
console.log(isObject(new Object()));
console.log(isObject({}));
console.log(isObject([]));
console.log(isObject('asdf'));
console.log(isObject(new Number(3)));
console.log(isObject(new String('asdf')));