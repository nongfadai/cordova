var matrix = [
	[1, 2],
	[3, 4],
	[5, 6]
];

// 二维数组扁平化
var flatten = matrix.reduce(function(previous, current) {
	console.log("previous", previous);
	console.log("current", current);
	return previous.concat(current);
});

console.log(flatten); // [1, 2, 3, 4, 5, 6]