var dataPull = require('./getData.js');

for (var i = 0; i < 10; i++) {
    console.log(dataPull.getNext('GOOG'));
}
for (var i = 0; i < 10; i++) {
    console.log(dataPull.getNext('AAPL'));
}
for (var i = 0; i < 10; i++) {
    console.log(dataPull.getNext('GOOG'));
}
for (var i = 0; i < 3; i++) {
    console.log('----'); // Should be the same and should not advance
    console.log(dataPull.getLastN('GOOG', 50));
}

// TEST for getName(ticker)
console.log(dataPull.getName('GOOG'));
console.log(dataPull.getName('SHIT'));
console.log(dataPull.getName('YHOO'));
console.log(dataPull.getName('JPM'));
