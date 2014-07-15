var HolderService = require('../services/holder');
var HolderController = (function() {

	function add(req, res) {
		var name = req.body.name;
		var userId = req.session.user._id;
		HolderService.findOneByName(name, userId, function(err, one) {
			if (err) {
				res.send({
					status: "fail",
					message: "查询失败!"
				});
			} else {
				if (one) {
					res.send({
						status: "fail",
						message: "报夹已存在!"
					});
				} else {
					HolderService.add({
						name: name,
						userId: userId
					}, function(err, holder, numberAffected) {
						if (err) {
							res.send({
								status: "fail",
								message: "添加失败!"
							});
						} else {
							if (holder && numberAffected) {
								res.send({
									status: "success",
									message: "添加成功!",
									data: {
										_id: holder._id,
										name: holder.name
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
		HolderService.list(userId, function(err, holders) {
			if (err) {
				res.send({
					status: "fail",
					message: "查询失败!"
				});
			} else {
				res.send({
					status: "success",
					message: "查询成功!",
					data: holders
				});
			}
		});
	};

	return {
		add: add,
		list: list
	};

}());

module.exports = HolderController;