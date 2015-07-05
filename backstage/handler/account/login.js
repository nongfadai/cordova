module.exports=function(req,res){
	var result={};
	var bo_account_p=require("../../persistence/redis/bo.account/account");
	var username=req.query.username||null;
	var password=req.query.password||null;
	if(username===null){
		result.success=false;
		result.message="用户名不能为空"
		res.send(JSON.stringify(result));
	}
	if(password===null){
		result.success=false;
		result.message="密码不能为空"
		res.send(JSON.stringify(result));
	}
	bo_account_p.login(username,password)
	.then(function(result) {
		res.send(JSON.stringify(result));
	});
}