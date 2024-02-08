const methods = ['at', 'chartAt', 'fromCharCode', 'charCodeAt', 'concat', 'endsWith', 'includes', 'indexOf', 'lastIndexOf', 'match', 'matchAll', 'normalize', 'padEnd',
'padStart', 'repeat', 'replace', 'replaceAll', 'search', 'slice', 'split', 'startsWith', 'substring', 'toLowerCase', 'toUpperCase', 'trim', 'trimEnd', 'trimStart',
'localeCompare'];

const str = 'some not so long 🤔 string';
console.log(str.substring(-1));
console.log(str.charAt(-1), '... charAt');
console.log(str.charAt(100), '... charAt');
console.log(str.split(''));
console.log(str.endsWith('4'));
console.log(str.replace(str.slice(-8,-7), 'here was the smile'));
console.log(str.padStart(9, 'g'))
console.log("a".localeCompare("z", 'fr'));