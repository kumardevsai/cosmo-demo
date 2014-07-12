var IndexController = (function() {

	function index(req, res) {
		res.render('index', {
			title: '周报填报',
			func: 'index'
		});
	};

	function login(req, res) {
		res.render('login', {
			title: '登录',
			func: 'login'
		});
	};

	function regist(req, res) {
		res.render('regist', {
			title: '注册',
			func: 'regist'
		});
	};

	function work(req, res) {
		res.render('work', {
			title: '工作空间',
			func: 'work'
		});
	};

	function me(req, res) {
		res.render('me', {
			title: '用户中心',
			func: 'work'
		});
	};

	function logout(req, res) {
		req.session.user = null;
		res.redirect("/");
	};

	return {
		index: index,
		login: login,
		regist: regist,
		work: work,
		me: me,
		logout: logout
	};
}());

module.exports = IndexController;