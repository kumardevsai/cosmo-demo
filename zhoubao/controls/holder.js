var HolderService = require('../services/holder');
var HolderController = (function() {

	function add(req, res) {
		var name = req.body.name;
		console.log(req.session.user);
		var userid = req.session.user.id;
		HolderService.findOneByName(name, userid, function(err, one) {
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
						userid: userid
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
									message: "添加成功!"
								});
							}
						}
					});
				}
			}
		});
	};

	function list(req, res) {
		var userid = req.session.user.id;
		HolderService.list(userid, function(err, holders) {
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