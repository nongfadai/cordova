module.exports=function(req,res){
	var a=req.query.a||0;
	var b=req.query.b||0;
	console.log("req.body=",req.body)
	
	setTimeout(function(){
		var result= {
			a:a,
			b:b,
			sum:parseInt(a)+parseInt(b),
			str:"i am 5000"
		}
		res.send(JSON.stringify(result));
	
	},0);
}