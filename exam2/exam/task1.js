class TestClass {}

const arr = [{value: 1}, {value: 2}, 5, 6,  7, 'test', 'test2', 'test3', 'test4', false, null, undefined, [123], [456], new Date("2021-06-22"), new Date("2022-02-01"), new Set([1,2,3]), new Set([4,5,6]), Symbol(), Symbol(), Symbol(), new Map(), new TestClass(), new TestClass()];

function groupByDataType(data) {
  return data.reduce((accum, el, i , arr) => {
    // console.log(el);
    if (el instanceof Object) {
      accum[el.constructor.name] ??= [];
      accum[el.constructor.name].push(el);
      return accum;
    }
    accum[typeof el] ??= [];
    accum[typeof el].push(el);
    return accum;
  }, {});
}

const result = groupByDataType(arr);

Object.keys(result).forEach(key => {
  console.log(key, result[key]);
});

// console.log(arr[0])

// Ожидаемый результат
// {
//   object: [ { value: 1 }, { value: 2 } ],
//   number: [ 5, 6, 7 ],
//   string: [ 'test', 'test2', 'test3', 'test4' ],
//   boolean: [ false ],
//   null: [ null ],
//   undefined: [ undefined ],
//   array: [ [ 123 ], [ 456 ] ],
//   date: [new Date("2021-06-22"), new Date("2022-02-01")],
//   set: [new Set([1,2,3]), new Set([4,5,6])],
//   symbol: [Symbol(), Symbol(), Symbol()],
//   map: [new Map()],
//   TestClass: [new TestClass(), new TestClass()]
// }