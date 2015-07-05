var request = require('request');
//注册
var body = {
	"name": "赵四",
	"username": "zhaosi",
	"password": "123",
	"mobile": "18702797208"
};
var opt = {};
opt.url = "http://localhost/handler/account/register";
opt.method = "POST";
opt.body = body;
opt.json = true;
request(opt, function(err, res, body) {
	console.log("body", body);
});
//登录
var url="http://localhost/handler/account/login?username=1870&password=123";
request(url,function(err, res, body) {
	console.log("body", body);
})