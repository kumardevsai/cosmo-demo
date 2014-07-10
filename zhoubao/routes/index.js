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

router.get('/work', function(req, res) {
	res.render('work', {
		title: '工作空间',
		func: 'work'
	});
});

router.get('/me', function(req, res) {
	res.render('me', {
		title: '用户中心',
		func: 'work'
	});
});

router.get('/logout', function(req, res) {
	req.session.user = null;
	res.redirect("/");
});

router.post('/regist-user', function(req, res) {
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	UserController.findOneUserByUsername(username, function(err, user) {
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
				UserController.add({
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
});

router.post("/login-user", function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	UserController.findOneUserByUsernameAndPassword(username, password, function(err, user) {
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
});

module.exports = router;