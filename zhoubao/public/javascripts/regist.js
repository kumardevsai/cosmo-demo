var loginHandler = window.loginHandler = (function(win, global) {

	utils.AttachEvent(window, "load", login_init, false);

	var doc = win.document;

	function g(id) {
		return doc.getElementById(id);
	};

	var form = {
		email: null,
		username: null,
		password: null
	};

	var helper = {
		email: null,
		username: null,
		password: null
	};

	function login_init() {
		form.email = g("inputEmail");
		form.username = g("inputUsername");
		form.password = g("inputPassword");

		helper.email = g("inputEmailHelper");
		helper.username = g("inputUsernameHelper");
		helper.password = g("inputPasswordHelper");

		for (var i in form)
			utils.AttachEvent(form[i], "blur", checkInputHelper(i), false);

		utils.AttachEvent(g("okBtn"), "click", regist, false);
	};

	var reg = {
		email: /[a-z0-9-.]{1,30}@[a-z0-9-]{1,65}.(com|net|org|info|biz|([a-z]{2,3}.[a-z]{2}))/,
		username: /^[a-z][a-z0-9_]{5,9}$/,
		password: /^[a-z][a-z0-9_]{5,9}$/
	};

	var helperText = (function() {
		var common = "数字字母下划线(第一个字符必须是英文，长度6-10)!";
		return {
			email: {
				nil: "example@gmail.com",
				error: "请输入电子邮件地址!",
				success: "正确!"
			},
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

	var cls = {
		inputError: "has-error",
		inputSuccess: "has-success",
		helperError: "helper-error",
		helperSuccess: "helper-success"
	};

	var checkInputHelper = function(which) {
		return function() {
			checkInput(which);
		};
	};

	function checkInput(which) {
		var ele, val, eleGroup, eleHelper;
		for (var i in form) {
			if (i === which) {
				ele = form[i];
				val = ele.value;
				eleGroup = ele.parentNode;
				eleHelper = helper[i];
			}
		}

		if (reg[which].test(val)) {
			eleGroup.classList.remove(cls.inputError);
			if (!eleGroup.classList.contains(cls.inputSuccess))
				eleGroup.classList.add(cls.inputSuccess);
			eleHelper.innerHTML = helperText[which].success;
			eleHelper.classList.remove(cls.helperError);
			eleHelper.classList.add(cls.helperSuccess);
			return true;
		} else {
			eleGroup.classList.remove(cls.inputSuccess);
			if (!eleGroup.classList.contains(cls.inputError))
				eleGroup.classList.add(cls.inputError);
			eleHelper.innerHTML = helperText[which].error;
			eleHelper.classList.remove(cls.helperSuccess);
			eleHelper.classList.add(cls.helperError);
			return false;
		}
	};

	function check() {
		var flag = true;
		for (var i in form) {
			if (checkInput(i) === false)
				flag === false;
		}
		if (flag === true) {
			regist();
		}
	};

	function regist(e) {
		utils.preventDefault(e);
		doRegist();
	};

	function doRegist() {
		$.ajax({
			url: "/regist-user",
			async: true,
			cache: false,
			method: "post",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			dataType: "json",
			data: {
				"email": form.email.value,
				"username": form.username.value,
				"password": form.password.value
			},
			success: function(data, status) {},
			error: function(data, status) {},
			complete: function(data, status) {}
		});
	};

}(window, this));