var DailyCataService = require('../services/dailyCata');
var DailyCataController = (function() {

	function add(req, res) {
		var name = req.body.name;
		var userId = req.session.user._id;
		DailyCataService.findOneByName(name, userId, function(err, one) {
			if (err) {
				res.send({
					status: "fail",
					message: "查询失败!"
				});
			} else {
				if (one) {
					res.send({
						status: "fail",
						message: "日志目录已存在!"
					});
				} else {
					DailyCataService.add({
						name: name,
						userId: userId
					}, function(err, dailyCata, numberAffected) {
						if (err) {
							res.send({
								status: "fail",
								message: "添加失败!"
							});
						} else {
							if (dailyCata && numberAffected) {
								res.send({
									status: "success",
									message: "添加成功!",
									data: {
										_id: dailyCata._id,
										name: dailyCata.name
									}
								});
							}
						}
					});
				}
			}
		});
	};

	function list(req, res) {
		var userId = req.session.user._id;
		DailyCataService.list(userId, function(err, dailyCatas) {
			if (err) {
				res.send({
					status: "fail",
					message: "查询失败!"
				});
			} else {
				res.send({
					status: "success",
					message: "查询成功!",
					data: dailyCatas
				});
			}
		});
	};

	function detail(req, res) {
		var id = req.query.id;
		DailyCataService.findOneById(id, function(err, dailyCata) {
			if (err) {
				res.end({
					status: "fail",
					message: "请求出错"
				});
			} else {
				res.render("dailyCata-detail", {
					title: "打开日志目录",
					dailyCata: dailyCata
				});
			}
		});
	};

	return {
		add: add,
		list: list,
		detail: detail
	};

}());

module.exports = DailyCataController;