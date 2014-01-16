function addPlay() {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var a = links[i];
		if (a.getAttribute('pluginPlay') === 'true') {
			addSwfObject({
				file: a.innerHTML,
				id: 'swf_' + i,
				container: a.parentNode,
				swf: '../../fileaccess.aspx?filename=/reports/suppot_proc/player/swf/flvplayer.swf',
				autostart: false
			});
			if (a.parentNode)
				a.parentNode.removeChild(a);
		}
	}
};