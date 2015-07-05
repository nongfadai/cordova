module.exports=function(req,res){
	var bo_account_p=require("../../persistence/redis/bo.account/account");
	var account=req.body
	bo_account_p.addAccount(account)
	.then(function(result) {
		res.send(JSON.stringify(result));
	});
}