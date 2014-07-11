/**
	前台用户登录验证
**/
(function(win, global) {

	// 页面初始化
	utils.AttachEvent(window, "load", login_init, false);

	// 文档
	var doc = win.document;

	// 简便写法
	function g(id) {
		return doc.getElementById(id);
	};

	// 表单提交内容
	var form = {
		username: null,
		password: null
	};

	// 表单提示
	var helper = {
		username: null,
		password: null,
		// 用于登录反馈
		login: null
	};

	// 页面初始化
	function login_init() {
		form.username = g("inputUsername");
		form.password = g("inputPassword");

		helper.username = g("inputUsernameHelper");
		helper.password = g("inputPasswordHelper");

		helper.login = g("loginHelper");

		// 遍历表单元素，添加失去焦点的事件监听
		for (var i in form)
			utils.AttachEvent(form[i], "blur", checkInputHelper(i), false);

		// 提交按钮点击事件
		utils.AttachEvent(g("okBtn"), "click", login, false);

		form.username.focus();
	};

	// 登录验证正则表达式
	var reg = {
		username: /^[a-z][a-z0-9_]{5,9}$/,
		password: /^[a-z][a-z0-9_]{5,9}$/
	};

	// 提示文本
	var helperText = (function() {
		var common = "数字字母下划线(第一个字符必须是英文，长度6-10)!";
		return {
			username: {
				nil: common,
				error: common,
				success: "正确!"
			},
			password: {
				nil: common,
				error: common,
				success: "正确!"
			}
		};
	}());

	// 表单样式
	var cls = {
		inputError: "has-error",
		inputSuccess: "has-success",
		helperError: "helper-error",
		helperSuccess: "helper-success"
	};

	// 检查填写内容
	var checkInputHelper = function(which) {
		return function() {
			checkInput(which);
		};
	};

	// 检查提交内容
	function checkInput(which) {
		var ele, val, eleGroup, eleHelper;
		// 遍历表单文本框
		for (var i in form) {
			if (i === which) {
				ele = form[i];
				val = ele.value;
				eleGroup = ele.parentNode;
				eleHelper = helper[i];
			}
		}

		// 验证成功
		if (reg[which].test(val)) {
			eleGroup.classList.remove(cls.inputError);
			if (!eleGroup.classList.contains(cls.inputSuccess))
				eleGroup.classList.add(cls.inputSuccess);
			// 显示错误提示
			changeHeplerClass(eleHelper, helperText[which].success, "success");
			return true;
		} else {
			eleGroup.classList.remove(cls.inputSuccess);
			if (!eleGroup.classList.contains(cls.inputError))
				eleGroup.classList.add(cls.inputError);
			// 显示正确提示
			changeHeplerClass(eleHelper, helperText[which].error, "fail");
			return false;
		}
	};

	// 改变提示的内容及样式
	function changeHeplerClass(eleHelper, text, status) {
		eleHelper.innerHTML = text;
		if (status === "fail") {
			eleHelper.classList.remove(cls.helperSuccess);
			eleHelper.classList.add(cls.helperError);
		} else if (status === "success") {
			eleHelper.classList.remove(cls.helperError);
			eleHelper.classList.add(cls.helperSuccess);
		}
	};

	// 检查提交内容，是否可以与服务进行交互
	function check() {
		var flag = true;
		for (var i in form) {
			if (checkInput(i) === false)
				flag === false;
		}
		if (flag === true) {
			login();
		}
	};

	// 按钮注册
	function login(e) {
		utils.preventDefault(e);
		doLogin();
	};

	// 注册任务
	function doLogin() {
		$.ajax({
			url: "/login-user",
			async: true,
			cache: false,
			method: "post",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "json",
			data: {
				"username": form.username.value,
				"password": form.password.value
			},
			success: function(data, status) {
				if (status === "success") {
					if (data) {
						if (data.status === "success") {
							changeHeplerClass(helper.login, data.message, "success");
							window.location.href = "/work";
						} else if (data.status === "fail") {
							changeHeplerClass(helper.login, data.message, "fail");
						}
					}
				} else {
					changeHeplerClass(helper.login, "抱歉，登录失败，请重新登录!", "fail");
				}
			},
			error: function(data, status) {},
			complete: function(data, status) {}
		});
	};

}(window, this));