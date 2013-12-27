if (window.attachEvent)
	window.attachEvent('onload', initScript);
else if (window.addEventListener)
	window.addEventListener('load', initScript);

function initScript() {
	var rainbowScript = document.createElement("script");
	rainbowScript.setAttribute('type', 'text/javascript');
	rainbowScript.setAttribute('charset', 'gb2312');
	rainbowScript.src = '../../js/rainbow/tips.js';
	rainbowScript.defer = true;
	document.getElementsByTagName('head')[0].appendChild(rainbowScript);
	rainbowScript.onload = rainbowScript.onreadystatechange = function() {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			_intlStrings._globalPathPre = "../../JS";
			_setupIW();
		}
	}
};

function showProvider(id) {
	var e = window.event ? window.event : arguments.callee.caller.arguments[0];
	if (e.preventDefault)
		e.preventDefault();
	else
		e.returnValue = false;
	myPop('../../FileAccess.aspx?&FileName=/reports/suppot_proc/飞鸿点睛/support/供应商显示.fpd&ParamPair=供应商ID==' + id, 300, 260, e);
};