var xlsx       = require('node-xlsx');

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
			res.json(objExcel[0].data);
			//res.send(200)
		}
	})
}