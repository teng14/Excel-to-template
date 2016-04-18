var xlsx       = require('node-xlsx');
var cheerio	= require('cheerio');
var server = require("./getResourse");

module.exports = function(app){
	app.post('/handle', function(req, res){
		var file = req.files.excelfile; 
		var filePath = file.path;//文件路径
		var temp = req.body.template; //模板内容
		
		//判断文件和内容是否合法
		if(file.extension == 'xls' || file.extension == 'xlsx'){
			objExcel = xlsx.parse(filePath);
			//获取Excel 第一张表
			//返回JSON数据
			var getResourseArray=[];
			for(var i=0; i< objExcel[0].data.length; i++){
				var url = objExcel[0].data[i][objExcel[0].data[i].length-1]
				var j = i;
				server.download(url, function(data) {
				  if (data) {
				    var ___ = cheerio.load(data);
					var goodsId = ___('#GoodsId').val();
					var imgUrl = ___('.bigimg').attr('src');
					console.log(goodsId)
					//objExcel[0].data[0].push('34321');
					// objExcel[0].data[1].imgurl = imgUrl;
				    console.log("done");
				  } else {
				      console.log("error");
				  } 
				});
			}
			// objExcel[0].data[0].goodsid = 111
			//console.log(objExcel[0].data)
			res.json(objExcel[0].data);
			//res.send(200)
		}
	});


	function getImgUrl(str){
		var index = str.indexOf('_300');
		return str.substring(0,index);
	}
}