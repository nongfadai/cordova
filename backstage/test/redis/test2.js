var login=require("./test")
console.log("login",login);
login({"account":2222},function(data){
	console.log("result=",data);
});