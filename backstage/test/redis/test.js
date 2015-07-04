
var Q=require("q")
var promiseFactory = require("q").Promise,
	redis = require('promise-redis')(promiseFactory);

// redis is the usual node_redis object. Do what you usually do with it:
var client = redis.createClient(6379, 'www.51blb.com', {});
client.on("error", function(err) {
	console.log("uh oh", err);
});

function test() {
	//testAdd()
	//testAdd2();
	//testQueryKey();
	// testQueryData();
	// del();
	login({"account":22,"mobile":1234});
}

function testQueryKey() {
	//查询
	client.keys("*").then(function(data) {
		console.log("data=", data)
	}).catch(function(error) {

	});

}

function testQueryData() {
	//查询
	client.hgetall("table:test:uuid:11").then(function(data) {
		console.log("data=", data)
	}).catch(function(error) {

	});

}

function testAdd(){
	var key="table:test:uuid:11";//redis命名方式[table|meta|index]:account:uuid:111
	//var obj={"username":""}
	client.hmset(key,"names","llll","age",15,"marry","true").then(function(data) {
		console.log("data=", data)
	}).catch(function(error) {

	});
}

function testAdd2(){
	var key="table:test:uuid:11";//redis命名方式[table|meta|index]:account:uuid:111
	var indexKey1="index:test:username:2222"
	var indexKey2="index:test:mobile:1234"
	client.hmset(key,"username","2222","age",20,"mobile",1234)
	.then(function(data) {
		console.log("data=", data)
		return client.set(indexKey1,key);
	})
	.then(function(){
		return client.set(indexKey2,key);
	})
	.catch(function(error) {

	});
}
function del(){
	var key="table:test:uuid:11";//redis命名方式[table|meta|index]:account:uuid:111
	//var obj={"username":""}
	client.del(key).then(function(data) {
		console.log("del data=", data)
	}).catch(function(error) {
		console.log("error=",error)
	});
}
function login(user){
	console.log("login enter")
	var account=user.account,mobile=user.mobile;
	var key1="index:test:username:"+account;
	var key2="index:test:mobile:"+mobile;
	client.exists(key1)
	.then(function(data) {
		console.log("data=", data);
		if(!data){
			return client.exists(key2);
		}
	}).then(function(data){
		console.log("data222=", data);
	})
	.catch(function(error) {
	 	console.log("error=",error)
	});
	console.log("login end");
}
test();