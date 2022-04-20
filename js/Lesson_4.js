const stringForTest = `'These people aren't a local'`;
let regexp = /(?!\b\w*'\w*\b)'/gi;
console.log(stringForTest.replace(regexp, '"'));
