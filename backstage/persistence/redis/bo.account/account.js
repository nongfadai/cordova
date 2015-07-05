var Q = require("q");
var client = require("../api/client_p");

var tableName = "account";
//取得所有帐号
function getAllAccount() {
	return client.clearAllData(tableName)
		.then(function(results) {
			return Q.fcall(function() {
				return results;
			})
		})
		.catch(function(error) {
			return Q.fcall(function() {
				return [];
			})
		})
}
//增加帐号
function addAccount_p(account) {
	var rjson = {
		"success": "true",
		"message": "增加成功"
	};
	var indexUsername = "index:" + tableName + ":username:" + account.username;
	var indexMobile = "index:" + tableName + ":mobile:" + account.mobile;
	console.log("indexUsername", indexUsername);
	//判断是否已存在
	return client.exists(indexUsername)
		.then(function(result) {
			//console.log("exists username=", result);
			if (result == 1) {
				throw new Error("用户名已经存在")
			} else {
				return client.exists(indexMobile);
			}
		})
		.then(function(result) {
			//console.log("exists mobile=", result);
			if (result === 1) {
				throw new Error("手机号已经存在");
			} else if (result === 0) {
				return client.nextSeq(tableName)
			}
		}).then(function(result) {
			//增加一条记录
			//console.log("seq", result)
			var key = "table:" + tableName + ":uuid:" + result;
			var promises = [];
			promises.push(client.savejson(key, account));
			promises.push(client.set(indexUsername, key));
			promises.push(client.set(indexMobile, key));
			return Q.allSettled(promises);
		})
		.then(function(results) {
			//console.log("add result", results[0]);
			return Q.fcall(function() {
				return rjson;
			})
		})
		.catch(function(error) {
			//console.log("error", error.message)
			return Q.fcall(function() {
				rjson.success = false;
				rjson.message = error.message;
				return rjson;
			})
		})
}
//登录
function login_p(username, password) {
	var rjson = {
		"success": "true",
		"message": "登录成功"
	};
	var key = "index:" + tableName + ":*:" + username
	return client.keys(key)
		.then(function(results) {
			if (!results || !results.length) {
				throw new Error("用户名不存在");
			}
			var promises = [];
			for (var i = 0; i < results.length; i++) {
				promises.push(client.get(results[i]));
			}
			return Q.allSettled(promises)
		})
		.then(function(results) {
			var data = results[0].value;
			var b = true;
			for (var i = 1; i < results.length; i++) {
				if (data !== results[i].value) {
					b = false;
				}
			};
			if (b) { //找到对应记录，判断密码
				return client.getKeyData(data);
			} else {
				throw new Error("未找到记录");
			}
		})
		.then(function(result) { //判断密码
			if (result.password !== password) {
				rjson.success = false;
				rjson.message = "密码不正确";
			}
			return Q.fcall(function() {
				return rjson;
			});
		})
		.catch(function(error) {
			return Q.fcall(function() {
				rjson.success = false;
				rjson.message = error.message;
				return rjson;
			})
		})
}
//删除key对应的数据、索引
function delAccount_p(key) {
	var rjson = {
		"success": "true",
		"message": "删除成功"
	};
	return client.getKeyData(key)
		.then(function(result) {
			if (result === null) {
				throw new Error("记录不存在")
			};
			var indexUsername = "index:" + tableName + ":username:" + result.username;
			var mobileUsername = "index:" + tableName + ":mobile:" + result.mobile;
			var promises = [];
			promises.push(client.del(key));
			promises.push(client.del(indexUsername));
			promises.push(client.del(mobileUsername));
			return Q.allSettled(promises)
		})
		.then(function(results) {
			if (results === null || results.length < 1) {
				rjson.success = false;
				rjson.message = "删除失败";
			}
			return Q.fcall(function() {
				return rjson;
			})
		})
		.catch(function(error) {
			return Q.fcall(function() {
				rjson.success = false;
				rjson.message = error.message;
				return rjson;
			})
		})
}

module.exports = {
	addAccount: addAccount_p,
	login: login_p,
	delAccount: delAccount_p
};

//测试开始

// addAccount_p({"name": "赵四","username": "zhaosi","password": "123","mobile": "18702797208"})
// .then(function(result) {
// 	console.log(result);
// });
//取得所有数据
// client.getAllData("account")
// .then(function(result){
// 	console.log("result",result);
// })
//清空所有数据
// client.clearAllData("account")
// .then(function(result){
// 	console.log("result",result);
// })
//登录
// login_p("zhaosi", "123").then(function(result) {
// 	console.log("login=", result)
// });
//删除
// delAccount_p("table:account:uuid:28").then(function(result) {
// 	console.log("delAccount=", result)
// });