var arr = [{
	key: 1,
	value: 31
}, {
	key: 2,
	value: 12
}, {
	key: 3,
	value: 4
}, {
	key: 5,
	value: 6
}]

var arr2=arr.sort(function(a,b){
	//return a.value>b.value;//小的放前面
	return a.value<b.value;//大的放前面
})

var arr3=arr.filter(function(e){
	//return e.value<10;//只过滤出来10以下的
	return e.value>10;//只过滤出来10以上的

})

console.log(arr2);
console.log(arr3);