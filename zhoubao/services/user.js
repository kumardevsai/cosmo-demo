var crypto = require('crypto');

var UserDoc = require('../models/user');
var UserModel = UserDoc.UserModel;

/**
	用户逻辑控制
**/
var UserService = (function() {

	// 添加用户
	function add(user, callback) {
		// md5保存密码
		user.password = crypto.createHash('md5').update(user.password).digest('hex');
		new UserModel(user).save(function(err, user_, numberAffected) {
			if (callback)
				callback(err, user_, numberAffected);
		});
	};

	// 根据用户名查找用户
	function findOneUserByUsername(username, callback) {
		UserModel.findOne({
			username: username
		}, function(err, user) {
			if (callback) {
				callback(err, user);
			}
		});
	};

	// 根据用户名及密码查找用户
	function findOneUserByUsernameAndPassword(username, password, callback) {
		// find
		UserModel.findOne({
			username: username,
			password: crypto.createHash('md5').update(password).digest('hex')
		}, "username", function(err, user) {
			if (callback) {
				callback(err, user);
			}
		});
	};
	return {
		add: add,
		findOneUserByUsername: findOneUserByUsername,
		findOneUserByUsernameAndPassword: findOneUserByUsernameAndPassword
	};
}());
module.exports = UserService;