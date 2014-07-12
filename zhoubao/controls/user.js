var UserService = require('../services/user');
var UserController = (function() {

	function registUser(req, res) {
		var email = req.body.email;
		var username = req.body.username;
		var password = req.body.password;
		UserService.findOneUserByUsername(username, function(err, user) {
			if (err)
				res.send({
					status: "fail",
					message: err.message ? err.message : "500错误!"
				});
			else {
				if (user) {
					res.send({
						message: "用户存在!",
						status: "fail"
					});
				} else {
					UserService.add({
						username: username,
						email: email,
						password: password
					}, function(err, user, numberAffected) {
						if (err) {
							res.send({
								status: "fail",
								message: err.message ? err.message : "500错误!"
							});
						} else {
							if (user && numberAffected === 1) {
								// TODO 执行登录
								req.session.user = user;
								res.send({
									status: "success",
									message: "注册成功!"
								});
							}
						}
					});
				}
			}
		});
	};

	function userLogin(req, res) {
		var username = req.body.username;
		var password = req.body.password;
		UserService.findOneUserByUsernameAndPassword(username, password, function(err, user) {
			if (err)
				res.send({
					status: "fail",
					message: err.message ? err.message : "500错误!"
				});
			else {
				if (user) {
					// 将用户添加到当前session中
					req.session.user = user;
					res.send({
						message: "登录成功!",
						status: "success"
					});
				} else {
					res.send({
						message: "用户名或密码错误!",
						status: "fail"
					});
				}
			}
		});
	};

	return {
		registUser: registUser,
		userLogin: userLogin
	};
}());

module.exports = UserController;