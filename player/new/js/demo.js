function addPlay() {
	var links = document.getElementsByTagName('a');
	var len = links.length;
	var i = 0;
	for (var num = 0; num < len; num++) {
		var a = links[i];
		if (a.getAttribute('pluginPlay') === 'true') {
			new swfobject.embedSWF('http://192.168.1.122/resource/project/reports/suppot_proc/player/swf/flvplayer.swf', a, 400, 200, 9, false, {
				file: a.innerHTML
			}, {
				autostart: false
			}, {
				id: 'swf_' + num
			});
		} else
			i++;
	}
};