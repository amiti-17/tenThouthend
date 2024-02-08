// function async1() {
//   console.log('async1 start');
//   async2().then(() => {
//     console.log('async1 end');
//   });
// }

// function async2() {
//   return new Promise((resolve) => {
//     resolve();
//     console.log('async2');
//   })
// }

// function* generate() {
//   console.log('generate-1')
//   yield;
//   console.log('generate-1.2')
// }

// function* generate2() {
//   console.log('generate-2')
//   yield;
//   console.log('generate-2.2')
// }

// console.log('script start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// const generator1 = generate();
// generator1.next();
// generator1.next();

// async1();

// new Promise(function (resolve) {
//   console.log('promise1');
//   resolve();
// }).then(function () {
//   console.log('promise2');
// });

// console.log('script end');
// const generator2 = generate2();
// generator2.next();
// generator2.next();

// // script start
// // generate-1
// // generate-1.2
// // async1 start
// // async2
// // promise1
// // script end
// // generate-2
// // generate-2.2
// // async1 end
// // promise2
// // setTimeout

process.nextTick(console.log('custom tick 1'));
new Promise(resolve => resolve()).then(() => console.log('custom promise then 1'));
// queueMicrotask(() => {console.log('custom microtask 1')})
// process.nextTick(console.log('custom tick 2'));
// new Promise((resolve => resolve())).then(() => console.log('custom promise then 2'));
// queueMicrotask(() => {console.log('custom microtask 2')})

// async function async1() {
//   console.log('async1 start');
//   async2().then(() => {
//     console.log('async1 end');
//   });
// }

// function async2() {
//   return new Promise(resolve => {
//     resolve();
//     console.log('async2');
//   });
// }

// function* generate() {
//   console.log('generate-1');
//   yield;
//   console.log('generate-1.2');
// }

// function* generate2() {
//   console.log('generate-2');
//   yield;
//   console.log('generate-2.2');
// }

// console.log('script start');

// setTimeout(function () {
//   console.log('setTimeout');
// }, 0);

// const generator1 = generate();
// async1();

// const generator2 = generate2();

// process.nextTick(() => {
//   setTimeout(() => {
//     console.log('some timer 1');
//   }, 0);

//   console.log('next tick 1');
//   setTimeout(() => {
//     console.log('some timer 2');
//     generator1.next();
//   }, 0);
// });

// queueMicrotask(() => {
//   console.log('microtask 1');
//   setTimeout(() => {
//     console.log('some timer 3');
//   }, 0);
//   for (let i = 0; i < 1000000000; i++) {}
// });

// queueMicrotask(() => {
//   console.log('microtask 2');

//   setImmediate(() => {
//     new Promise(function (resolve) {
//       console.log('promise1');
//       generator1.next();
//       resolve();
//     }).then(function () {
//       console.log('promise2');
//     });
//   });
// });

// generator2.next();

// setImmediate(() => {
//   process.nextTick(() => {
//     generator2.next();
//   });
// });

// console.log('script end');

// script start
// async1 start
// async2
// generate-2
// script end
// next tick 1
// async1 end
// microtask 1
// microtask 2
// setTimeout
// some timer 1
// some timer 2
// generate-1
// some timer 3
// generate-2.2
// promise1
// generate-1.2
// promise2

// in this example "some timer 3" jump to end some times...

// // //
// process.nextTick(() => {
//   setTimeout(() => {
//     console.log('some timer 1');
//   }, 0);
//   console.log('next tick 1');
//   setTimeout(() => {
//     console.log('some timer 2');
//     generator1.next();
//   }, 0);
// });

// // //
// .then(() => {
//   console.log('async1 end');
// });

// // //
// queueMicrotask(() => {
//   console.log('microtask 1');
//   setTimeout(() => {
//     console.log('some timer 3');
//   }, 0);
// });

// // //
// queueMicrotask(() => {
//   console.log('microtask 2');
//   setImmediate(() => {
//     new Promise(function (resolve) {
//       console.log('promise1');
//       generator1.next();
//       resolve();
//     }).then(function () {
//       console.log('promise2');
//     });
//   });
// });

// // // setTimeout

// // // some timer 1

// // //
// setTimeout(() => {
//     console.log('some timer 2');
//     generator1.next();
//   }, 0);

// // // some timer 3

// // //
// setImmediate(() => {
//   process.nextTick(() => {
//     generator2.next();
//   });
// });

// //
// setImmediate(() => {
//   new Promise(function (resolve) {
//     console.log('promise1');
//     generator1.next();
//     resolve();
//   }).then(function () {
//     console.log('promise2');
//   });
// });