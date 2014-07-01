chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.status === 1) {
		if (http) {
			sendResponse({
				username: http.username.id,
				password: http.password.id
			});
		} else
			sendResponse({});
	}
});
var hifrom_selects = document.getElementsByName('hiform_select');
for (var i = 0; i < hifrom_selects.length; i++) {
	var bindid = hifrom_selects[i].getAttribute('bindid');
	document.getElementById(bindid).style.border = Eles[bindid].border;
	hifrom_selects[i].parentNode.removeChild(hifrom_selects[i]);
	i--;
}
var hiform_inputs = document.getElementsByTagName("input");
var Imgs = {
	check: 'images/check_alt.png',
	question: 'images/question_mark.png'
};
var Css = function(border) {
	this.border = border ? border : '';
};
var Eles = [];
var http = {
	username: {
		id: '',
		btn: null
	},
	password: {
		id: '',
		btn: null
	}
};
for (var i = 0; i < hiform_inputs.length; i++) {
	var hiform_input = hiform_inputs[i];
	if (hiform_input.type === 'text' || hiform_input.type === 'password') {
		Eles[hiform_input.id] = new Css(hiform_input.style.border);
		var hiform_input_position = hiform_input.getBoundingClientRect();
		var hifrom_select = document.createElement('img');
		hifrom_select.setAttribute('bindid', hiform_input.id);
		hifrom_select.id = 'hifrom_select' + i;
		hifrom_select.name = 'hiform_select';
		hifrom_select.style.height = '14px';
		hifrom_select.style.width = '14px';
		hifrom_select.style.top = hiform_input_position.top + (hiform_input.clientHeight - 14) / 2 + 'px';
		hifrom_select.style.left = hiform_input_position.left + hiform_input.clientWidth - 14 + 'px';
		hifrom_select.style.zIndex = '99999';
		hifrom_select.style.position = 'absolute';
		hifrom_select.title = '是这个么?';
		var imgURL = chrome.extension.getURL(Imgs.question);
		hifrom_select.src = imgURL;
		hifrom_select.draggable = true;
		hifrom_select.onmousedown = function(ev) {
			var t = ev.target;
			var t_input = document.getElementById(t.getAttribute('bindid'));
			if (t_input.type !== 'password') {
				if (http.username.id !== '') {
					document.getElementById(http.username.id).style.border = Eles[http.username.id].border;
					document.getElementById(http.username.btn).src = chrome.extension.getURL(Imgs.question);
					document.getElementById(http.password.btn).title = '是这个么?';
				}
				http.username = {
					id: t_input.id,
					btn: t.id
				};
			} else {
				if (http.password.id !== '') {
					document.getElementById(http.password.id).style.border = Eles[http.password.id].border;
					document.getElementById(http.password.btn).src = chrome.extension.getURL(Imgs.question);
					document.getElementById(http.password.btn).title = '是这个么?';
				}
				http.password = {
					id: t_input.id,
					btn: t.id
				};
			}
			t.style.cursor = "arrow";
			t.src = chrome.extension.getURL(Imgs.check);
			t.title = '已锁定';
			t_input.style.border = '1px dashed red';
			chrome.extension.sendRequest({
				username: http.username.id,
				password: http.password.id
			}, function(response) {
				console.log(response.farewell);
			});
		};
		document.body.appendChild(hifrom_select);
	}
}