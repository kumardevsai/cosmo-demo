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
		UserModel.save(holder, function(err, holder_, numberAffected) {
			if (callback)
				callback(err, holder_, numberAffected);
		});
	};

	function findOneByName(name, userid, callback) {
		UserModel.findOne({
			name: name,
			userid: userid
		}, function(err, holder) {
			if (callback)
				callback(err, holder);
		});
	};

	function list(userid, callback) {
		UserModel.find({
			userid: userid
		}, function(err, holders) {
			if (callback)
				callback(err, holders);
		});
	};

	return {
		add: add
	};
}());

module.exports = HolderService;