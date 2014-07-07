var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;
var UserSchema = UserModel.schema;

var UserController = (function() {
	function add(user) {
		UserSchema.add(user);
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