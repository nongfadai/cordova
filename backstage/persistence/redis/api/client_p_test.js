var Q=require("q");
var promiseFactory = require("q").Promise,
    redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function (err) {
    console.log("uh oh", err);
});


client.getAll=function(keys){/*orderby 排序函数，filter过滤函数 groupby分组统计函数*/
	var promises=[];
	for(var i=0;i<keys.length;i++){
		promises.push(client.hgetall(keys[i]));
	}
	return Q.allSettled(promises)
	.then(function(results){
		//console.log("results",results);
		var arr=[];
		for(var i=0;i<results.length;i++){
			arr.push(results[i].value);
		}
		return Q.fcall(function(){
			return arr;
		});
	})

	// client.hgetall("table:account:uuid:5", "table:accountUUID:2")
	// .then(function(result){
	// 	console.log("result",result);
	// }).catch(function(err){
	// 	console.log("err",err);
	// });
}

client.keys("[inde]?[table]?")
.then(function(data){
	console.log("data",data);
});

// All your redis commands return promises now.
// client.set('mykey', 'myvalue')
//     .then(console.log)
//     .catch(console.log)

// client.get("mykey").then(function(result){
// 	console.log("result",result);
// }).catch(function(){
// 	console.log("error123",arguments);
// })

module.exports=client;