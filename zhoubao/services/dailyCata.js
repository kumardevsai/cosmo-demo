var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

var DailyCataDoc = require('../models/dailyCata');
var DailyCataModel = DailyCataDoc.DailyCataModel;

/**
	日志目录控制
**/
var DailyCataService = (function() {

	// 添加日志目录
	function add(dailyCata, callback) {
		new DailyCataModel(dailyCata).save(function(err, dailyCata_, numberAffected) {
			if (callback)
				callback(err, dailyCata_, numberAffected);
		});
	};

	function findOneByName(name, userId, callback) {
		DailyCataModel.findOne({
			name: name,
			userId: userId
		}, function(err, dailyCata) {
			if (callback)
				callback(err, dailyCata);
		});
	};

	function list(userId, callback) {
		DailyCataModel.find({
			userId: userId
		}, "name", function(err, dailyCatas) {
			if (callback)
				callback(err, dailyCatas);
		});
	};

	function findOneById(id, callback) {
		DailyCataModel.findOne({
			_id: id
		}, "name", function(err, dailyCata) {
			if (callback)
				callback(err, dailyCata);
		});
	};

	return {
		add: add,
		findOneByName: findOneByName,
		list: list,
		findOneById: findOneById
	};
}());

module.exports = DailyCataService;