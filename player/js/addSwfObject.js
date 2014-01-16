function addSwfObject(options) {
	var defaults = {
		height: 200,
		width: 400,
		allowfullscreen: true,
		repeat: true,
		autostart: false,
		swf: '../swf/flvplayer.swf',
		id: 'swf_',
		quality: 'high',
		version: '9',
		container: document.body,
		file: '',
		poster: '',
		clicktext: '开始'
	};
	for (var i in options) {
		if (options.hasOwnProperty(i) && defaults.hasOwnProperty(i) && options[i] !== null && options[i] !== undefined) {
			defaults[i] = options[i];
		}
	}
	var swf = new SWFObject(defaults.swf, defaults.id, defaults.width, defaults.height, defaults.version);
	swf.addParam("allowfullscreen", defaults.allowfullscreen);
	swf.addVariable("autostart", defaults.autostart);
	swf.addVariable("repeat", defaults.repeat);
	swf.addVariable("image", defaults.poster);
	swf.addVariable("file", defaults.file);
	swf.addVariable("clicktext", defaults.clicktext);
	swf.write(defaults.container);
	return swf;
};