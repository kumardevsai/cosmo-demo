$(document).ready(function() {
	var $all = $('#listAll');
	var redirectHiForm = function() {
		chrome.browserAction.setPopup({
			popup: '../hiform.html'
		});
		window.location.href = '../hiform.html';
	};
	$('#addHttp').bind('click', function() {
		redirectHiForm();
	});
	$('#delHttp').bind('click', function() {
		var $ssns = $('input[name="ssn"]');
		if ($ssns.length === 0) {
			alert('当前没有数据可以删除!');
			return;
		}
		var arry = [];
		for (var i = 0; i < $ssns.length; i++) {
			var $ssn = $($ssns[i]);
			if ($ssn[0].checked === true) {
				arry.push({
					ssn: $ssn.attr('ssn'),
					obj: $ssn
				});
			}
		}
		if (arry.length === 0) {
			alert('请选择一条数据进行删除!');
			return;
		}
		$.each(arry, function(i, ssn) {
			deleteListItem(ssn.ssn, function() {
				if (ssn && ssn.obj) {
					ssn.obj.parent().animate({
						'height': '0px'
					}, 200, function() {
						ssn.obj.parent().remove();
					});
				}
			});
		});
	});
	var renderOne = function(json) {
		if (json === null)
			return;
		var $c = $('<div class="item"></div>');
		$all.append($c);
		var $checkbox = $('<input type="checkbox" name="ssn" ssn="' + json.ssn + '" class="item-checkbox">');
		$c.append($checkbox);
		var $text = $('<span class="item-text" title="' + json.http + '">' + json.http + '</span>');
		$c.append($text);
	};
	openDatabase(function() {
		fetchList(renderOne);
	});
});