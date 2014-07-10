var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

var UserController = (function() {
	function add(user, callback) {
		new UserModel(user).save(function(err, user_, numberAffected) {
			if (callback)
				callback(err, user_, numberAffected);
		});
	};

	function findOneUserByUsername(username, callback) {
		UserModel.findOne({
			username: username
		}, function(err, user) {
			if (callback) {
				callback(err, user);
			}
		});
	};
	return {
		add: add,
		findOneUserByUsername: findOneUserByUsername
	};
}());
module.exports = UserController;