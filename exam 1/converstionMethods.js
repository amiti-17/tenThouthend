class Animal {
  constructor(speach, amountOfLegs) {
    this.say = Array(3).fill(speach).join(', ') + '!';
    this.amountOfLegs = amountOfLegs;
  }
  
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string':
        return this.say;
      case 'number':
        return this.amountOfLegs;
      default:
        return `This is ${this.constructor.name} and it says ${this.say}. Also it has just ${this.amountOfLegs} legs.`
        break;
    }
  }

  toString() {
    return this.say + "it's form to String method";
  }

  valueOf() {
    return this.amountOfLegs * 2;
  }
}

const dog = new Animal('Gav', 4);
const parrot = new Animal('Kar', 2);

console.log(dog);
console.log(parrot);
console.log(dog + parrot);
console.log(dog / 2);
console.log([dog, parrot].join(', '));