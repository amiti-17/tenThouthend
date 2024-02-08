console.time('test');
for (let i = 0; i < 1000000000; i++) {}
console.timeEnd('test');

let i = 0;
console.time('test');
while (i < 1000000000) { i++ }
console.timeEnd('test');