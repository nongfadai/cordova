var Q=require("q");


//console.log(fn_P);

// Q.Promise(function(resolve){
// 	resolve(1);
// }).then(function(result){
// 	console.log(result);
// });

var x=Q.Promise.get(1).
then(function(result){
	console.log(result);
});
