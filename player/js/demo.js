var path = '../../fileaccess.aspx?filename=/reports/suppot_proc/player/video-js/';

function addPlay() {
	loadHTML5Js();
	loadModernizrJs();
	loadVideoJs();
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var a = links[i];
		if (a.getAttribute('pluginPlay') === 'true') {
			addPlugin(a, a.innerHTML);
		}
	}
};

function addPlugin(a, href) {
	var container = a.parentNode;

	var video = document.createElement('video');
	video.id = 'example_video_1';
	video.className = 'video-js vjs-default-skin';
	video.setAttribute('controls', '');
	video.setAttribute('preload', 'none');
	video.width = '640';
	video.height = '260';
	video.setAttribute('poster', '');
	video.setAttribute('data-setup', '{}');

	var source = document.createElement('source');
	source.src = href;
	source.type = 'video/mp4';

	video.appendChild(source);

	if (a.replaceNode)
		a.replaceNode(video);
	else
		container.replaceChild(video, a);
};

function loadVideoJs() {
	var header_ = document.getElementsByTagName('head')[0];
	var script_ = document.createElement('script');
	script_.type = 'text/javascript';
	script_.setAttribute('charset', 'gb2312');
	script_.src = path + 'video.dev.js';
	header_.appendChild(script_);
	script_.onload = script_.onreadystatechange = function() {
		if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
			videojs.options.flash.swf = path + 'video-js.swf';
		}
	};
};

function loadModernizrJs() {
	var header_ = document.getElementsByTagName('head')[0];
	var script_ = document.createElement('script');
	script_.type = 'text/javascript';
	script_.setAttribute('charset', 'gb2312');
	script_.src = '../../fileaccess.aspx?filename=/reports/suppot_proc/player/modernizr/modernizr.custom.13210.js';
	header_.appendChild(script_);
};

function loadHTML5Js() {
	if (!document.all)
		return;
	var header_ = document.getElementsByTagName('head')[0];
	var script_ = document.createElement('script');
	script_.type = 'text/javascript';
	script_.setAttribute('charset', 'gb2312');
	script_.src = '../../fileaccess.aspx?filename=/reports/suppot_proc/player/html5/html5.js';
	header_.appendChild(script_);
};