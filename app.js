var express=require("express");
var app=express();
var fs=require("fs");
app.set("port",process.env.PORT||3000);
//设置跨域访问
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
//获取SocktIP借口并写入
app.get("/ross/:ms",function(req,res){
	var newIp=req.params.ms,
	msg={"ip":newIp};
	fs.writeFile(__dirname+"/data/ip.json",JSON.stringify(msg),function(err){
	   if (err) {
            console.error(err)
        } else {
            console.log(new Date()+ "更新IP成功！");
    	}
	});
	res.send({msg:"ip更新成功："+newIp});
});
//前段取ip.json
app.get("/get",function(req,res){
	fs.readFile(__dirname+"/data/ip.json",function(err,data){
		if(err){
			console.log(err)
		}else{
			res.send(data.toString())
		}
	})
});

app.listen(app.get("port"),function(){
	console.log("express 启动在HTTP://LOCALHOST:"+app.get("port")+"。按ctrl+c返回退出返回控制台");
});