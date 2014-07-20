var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

var HolderDoc = require('../models/holder');
var HolderModel = HolderDoc.HolderModel;

/**
	报夹控制
**/
var HolderService = (function() {

	// 添加报夹
	function add(holder, callback) {
		new HolderModel(holder).save(function(err, holder_, numberAffected) {
			if (callback)
				callback(err, holder_, numberAffected);
		});
	};

	function findOneByName(name, userId, callback) {
		HolderModel.findOne({
			name: name,
			userId: userId
		}, function(err, holder) {
			if (callback)
				callback(err, holder);
		});
	};

	function list(userId, callback) {
		HolderModel.find({
			userId: userId
		}, "name", function(err, holders) {
			if (callback)
				callback(err, holders);
		});
	};

	function findOneById(id, callback) {
		HolderModel.findOne({
			_id: id
		}, "name", function(err, holder) {
			if (callback)
				callback(err, holder);
		});
	};

	return {
		add: add,
		findOneByName: findOneByName,
		list: list,
		findOneById: findOneById
	};
}());

module.exports = HolderService;