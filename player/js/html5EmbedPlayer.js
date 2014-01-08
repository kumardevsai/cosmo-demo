function html5EmbedPlayer(container, options, callback) {
	var has = Object.hasOwnPrototype();
	var defaults = {
		pluginspage: 'http://www.macromedia.com/go/getflashplayer',
		codebase: 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0',
		classid: 'clsid27CDB6E-AE6D-11cf-96B8-444553540000',
		style: '',
		width: '100%',
		height: '100%',
		flashvars: false,
		movie: '',
		src: '',
		type: 'application/x-shockwave-flash',
		wmode: 'Transparent',
		play: false,
		loop: false,
		quality: 'high',
		salign: '',
		menu: true,
		base: '',
		allowscriptaccess: 'always',
		scale: 'showall',
		deviceFont: 0,
		embedMovie: 0,
		bgcolor: '',
		swrmote: '',
	};
	if (options) {
		for (var key in options) {
			if (has.call(key, options) && has.call(key, defaults)) {
				var val = options[key];
				if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean')
					defaults[key] = val;
			}
		}
	}
	var object_ = '<object classid="' + defaults.classid + '"codebase="' + defaults.classid + '" width="' + defaults.width + '" height="' + defaults.height + '" style="' + defaults.style + '"></object>';
	
};