var DailyService = require('../services/daily');
var DailyController = (function() {

	function add(req, res) {
		var name = req.body.name;
		var content = req.body.content;
		var userId = req.session.user._id;
		var dailyCataId = req.body.dailyCataId;
		DailyService.add({
			name: name,
			content: content,
			userId: userId,
			dailyCataId: dailyCataId
		}, function(err, daily, numberAffected) {
			if (err) {
				res.send({
					status: "fail",
					message: "添加失败!"
				});
			} else {
				if (daily && numberAffected) {
					res.send({
						status: "success",
						message: "添加成功!",
						data: {
							_id: daily._id,
							name: daily.name
						}
					});
				}
			}
		});
	};

	function list(req, res) {
		var userId = req.session.user._id;
		var dailyCataId = req.query.dailyCataId;
		DailyService.list(userId, dailyCataId, function(err, dailys) {
			if (err) {
				res.send({
					status: "fail",
					message: "查询失败!"
				});
			} else {
				res.send({
					status: "success",
					message: "查询成功!",
					data: dailys
				});
			}
		});
	};

	function detail(req, res) {
		var id = req.query.id;
		DailyService.findOneById(id, function(err, daily) {
			if (err) {
				res.end({
					status: "fail",
					message: "请求出错"
				});
			} else {
				res.render("daily-detail", {
					title: "查看日志",
					daily: daily
				});
			}
		});
	};

	function addDispacher(req, res) {
		var dailyCataId = req.query.dailyCataId;
		res.render("daily-add", {
			title: "日志添加",
			dailyCataId: dailyCataId
		});
	};

	return {
		add: add,
		list: list,
		detail: detail,
		addDispacher: addDispacher
	};

}());

module.exports = DailyController;