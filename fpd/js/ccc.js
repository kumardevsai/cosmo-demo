if (window.attachEvent)
	window.attachEvent('onload', addTab);
else if (window.addEventListener)
	window.addEventListener('load', addTab, false);

function addTab() {
	var id_left = 'ul_left';
	var id_right = 'ul_right';
	var id_top = 'ul_top';
	var id_bottom = 'ul_bottom';
	var checkInterval_left = setInterval(function() {
		var ul = document.getElementById(id_left);
		if (ul) {
			setTabLinks(id_left, 'left', 0, true);
			clearInterval(checkInterval_left);
		}
	}, 10);

	var checkInterval_right = setInterval(function() {
		var ul = document.getElementById(id_right);
		if (ul) {
			setTabLinks(id_right, 'right', '', true);
			clearInterval(checkInterval_right);
		}
	}, 10);

	var checkInterval_top = setInterval(function() {
		var ul = document.getElementById(id_top);
		if (ul) {
			setTabLinks(id_top, 'top', '', true);
			clearInterval(checkInterval_top);
		}
	}, 10);

	var checkInterval_bottom = setInterval(function() {
		var ul = document.getElementById(id_bottom);
		if (ul) {
			setTabLinks(id_bottom, 'bottom', '', true);
			clearInterval(checkInterval_bottom);
		}
	}, 10);
};