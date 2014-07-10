var express = require('express');
var router = express.Router();
var UserController = require('../controls/user');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: '周报填报',
		func: 'index'
	});
});

router.get('/login', function(req, res) {
	res.render('login', {
		title: '登录',
		func: 'login'
	});
});

router.get('/regist', function(req, res) {
	res.render('regist', {
		title: '注册',
		func: 'regist'
	});
});

router.post('/regist-user', function(req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	UserController.findOneUserByUsername(username, function(err, user) {
		if (err)
			res.send({
				status: "fail",
				message: err.message ? err.message : "内部错误!"
			});
		else {
			if (user) {
				res.send({
					message: "用户存在!",
					status: "fail"
				});
			} else {
				UserController.add({
					username: username,
					email: email,
					password: password
				}, function(err, user, numberAffected) {
					if (err) {
						res.send({
							status: "fail",
							message: err.message ? err.message : "内部错误!"
						});
					} else {
						if (user && numberAffected === 1) {
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
});

module.exports = router;