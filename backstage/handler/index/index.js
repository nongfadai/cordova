/*获取首页数据*/
module.exports=function(req,res){
	var a=req.query.a||0;
	var b=req.query.b||0;
	
	setTimeout(function(){
		var result= {
			a:a,
			b:b,
			sum:parseInt(a)+parseInt(b),
			str:"i am 3000"
		}
		res.send(JSON.stringify(result));
	
	},1000*3);
}


function getData(){
	var data={
			ec:0,
		};
	
}

function getBannerData(){//获取首页数据
	
}

