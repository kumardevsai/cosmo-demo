var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

var DailyDoc = require('../models/daily');
var DailyModel = DailyDoc.DailyModel;

/**
	日志控制
**/
var DailyService = (function() {

	// 添加日志
	function add(daily, callback) {
		new DailyModel(daily).save(function(err, daily_, numberAffected) {
			if (callback)
				callback(err, daily_, numberAffected);
		});
	};

	function list(userId, dailyCataId, callback) {
		DailyModel.find({
			userId: userId,
			dailyCataId: dailyCataId
		}, "name content", function(err, dailys) {
			if (callback)
				callback(err, dailys);
		});
	};

	function findOneById(id, callback) {
		DailyModel.findOne({
			_id: id
		}, "name content", function(err, daily) {
			if (callback)
				callback(err, daily);
		});
	};

	return {
		add: add,
		list: list,
		findOneById: findOneById
	};
}());

module.exports = DailyService;