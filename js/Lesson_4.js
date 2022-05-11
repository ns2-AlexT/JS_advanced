const stringForTest = `'These people aren't a local'`;
let regexp = /(?!\b\w*'\w*\b)'/ig;
console.log(stringForTest.replace(regexp, '"'));
