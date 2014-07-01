$(document).ready(function() {
	var memory = window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new CookieStorage();

	$('#setAutoCatch').attr('checked', memory['autoCatch'] === 'false' ? false : true);
	$('#checkPage').attr('checked', memory['checkPage'] === 'false' ? false : true);
	$('#checkLogin').attr('checked', memory['checkLogin'] === 'false' ? false : true);
	$('#isFilterParams').attr('checked', memory['isFilterParams'] === 'false' ? false : true);
	
	$('#setAutoCatch').bind('change', function(ev) {
		var $t = $(this);
		memory.setItem('autoCatch', $t[0].checked);
	});
	$('#checkPage').bind('change', function(ev) {
		var $t = $(this);
		memory.setItem('checkPage', $t[0].checked);
	});
	$('#checkLogin').bind('change', function(ev) {
		var $t = $(this);
		memory.setItem('checkLogin', $t[0].checked);
	});
	$('#isFilterParams').bind('change', function(ev) {
		var $t = $(this);
		memory.setItem('isFilterParams', $t[0].checked);
	});
	var redirectList = function() {
		chrome.browserAction.setPopup({
			popup: '../list.html'
		});
		window.location.href = '../list.html';
		return;
	};
	$('#goList').bind('click', function() {
		redirectList();
	});
	var redirectHiForm = function() {
		chrome.browserAction.setPopup({
			popup: '../hiform.html'
		});
		window.location.href = '../hiform.html';
	};
	$('#addHttp').bind('click', function() {
		redirectHiForm();
	});
});