$(document).ready(function() {
	var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new CookieStorage();
	var bindIds = {
		username: '',
		password: ''
	};
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		var current = tabs[0];
		if (memory['autoCatch'] !== 'false') {
			var url = current.url.toLowerCase();
			if (memory['isFilterParams'] === 'true') {
				if (url.indexOf('?') !== -1)
					url = url.substring(0, url.indexOf('?'));
				else
					url = url;
			}
			$('#httphost').val(url);
		}
		chrome.tabs.sendMessage(current.id, {
			status: 1
		}, function(response) {
			var usernameid = response.username;
			var passwordid = response.password;
			if (usernameid) {
				bindIds.username = usernameid;
				$('#username').attr('placeholder', '已锁定请输入用户名');
			}
			if (passwordid) {
				bindIds.password = passwordid;
				$('#password').attr('placeholder', '已锁定请输入密码');
			}
		});
	});
	openDatabase(function() {});
	var redirectList = function() {
		chrome.browserAction.setPopup({
			popup: '../list.html'
		});
		window.location.href = '../list.html';
		return;
	};
	$('#goList').bind('click', function(ev) {
		redirectList();
	});
	$('#goSetting').bind('click', function(ev) {
		window.location.href = '../setting.html';
	});
	$('#goSearch').bind('click', function(ev) {
		chrome.tabs.query({
			active: true,
			currentWindow: true,
			status: 'complete'
		}, function(tabs) {
			var current = tabs[0];
			chrome.tabs.executeScript(current.id, {
				file: 'js/select.js',
				allFrames: true,
				runAt: "document_end"
			}, function(result) {

			});
		});
	});
	$('#ok').bind('click', function(ev) {
		var $btn = $(this);
		if (bindIds.username === '') {
			alert('还未锁定用户名输入框，无法为您保存账户数据');
			return;
		}
		if (bindIds.password === '') {
			alert('还未锁定密码框，无法为您保存账户数据');
			return;
		}
		var httphost = $('#httphost').val();
		var username = $('#username').val();
		var password = $('#password').val();
		if (httphost && username && password) {
			var item = {
				ssn: String(Math.random()).substring(2),
				http: httphost.toLowerCase(),
				username: username,
				password: password,
				usernameBindId: bindIds.username,
				passwordBindId: bindIds.password,
				updateDate: new Date(),
				createDate: new Date()
			};
			if (fetchListByHttpIndex(item.http, function(item_) {
				if (item_ !== null) {
					item_.username = item.username;
					item_.password = item.password;
					item_.usernameBindId = item.usernameBindId;
					item_.passwordBindId = item.passwordBindId;
					item_.http = item.http;
					updateListItemByHttp(item_, function(flag) {
						if (flag === true)
							alert('更新成功!');
						else
							alert('更新失败!');
					});
				} else {
					addListItem(item, function(flag) {
						if (flag === true)
							alert('保存成功!');
						else
							alert('保存失败!');
					});
				}
			}));
		}
	});
	$('#cancel').bind('click', function(ev) {
		window.close();
	});
});