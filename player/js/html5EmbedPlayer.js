function html5EmbedPlayer(container, options, callback) {
	var has = Object.hasOwnPrototype();
	var opts = {
		pluginspage: 'http://www.adobe.com/go/getflashplayer',
		codebase: 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0',
		classid: 'clsid:27CDB6E-AE6D-11cf-96B8-444553540000',
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
		swliveconnect: true,
		filename: '',
		hidden: false
	};
	var specReg = /codebase|pluginspage|classid/ig;
	if (options) {
		for (var key in options) {
			if (has.call(key, options) && has.call(key, opts)) {
				var val = options[key];
				if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean')
					opts[key] = val;
			}
		}
	}
	var object_ = '<object classid="' + opts.classid + '"codebase="' + opts.codebase + '" data="' + opts.filename + '"';
	var embed_ = '<embed pluginspage="' + opts.pluginspage + '" src="' + opts.filename + '"';
	var style_ = ' width="' + opts.width + '" height="' + opts.height + '" style="' + opts.style + '" ';
	object_ += style_ + '>';
	embed_ += style_ + '>';
	var params_ = '';
	var attrs_ = '';
	for (var key in opts) {
		if (has.call(key, opts)) {
			var val = opts[key];
			if (!specReg.test(val)) {
				params_ += '<param name="' + key + '" value="' + val + '"></param>';
				attrs_ += ' ' + key + '="' + val + '" ';
			}
		}
	}
	object_ += params_;
	embed_ += attrs_;
	object_ = object_ + embed_ + '</embed></object>';
	insertHTML(container, 'beforeEnd', object_);
};

/**
 *
 *
 * @param {HTMLElement} el
 * @param {String} where beforeBegin、afterBegin、beforeEnd、afterEnd
 * @param {String} html
 */
function insertHTML(el, where, html) {
	if (!el) {
		return false;
	}
	where = where.toLowerCase();
	if (el.insertAdjacentHTML) { //IE
		el.insertAdjacentHTML(where, html);
	} else {
		var range = el.ownerDocument.createRange(),
			frag = null;
		switch (where) {
			case "beforebegin":
				range.setStartBefore(el);
				frag = range.createContextualFragment(html);
				el.parentNode.insertBefore(frag, el);
				return el.previousSibling;
			case "afterbegin":
				if (el.firstChild) {
					range.setStartBefore(el.firstChild);
					frag = range.createContextualFragment(html);
					el.insertBefore(frag, el.firstChild);
				} else {
					el.innerHTML = html;
				}
				return el.firstChild;
			case "beforeend":
				if (el.lastChild) {
					range.setStartAfter(el.lastChild);
					frag = range.createContextualFragment(html);
					el.appendChild(frag);
				} else {
					el.innerHTML = html;
				}
				return el.lastChild;
			case "afterend":
				range.setStartAfter(el);
				frag = range.createContextualFragment(html);
				el.parentNode.insertBefore(frag, el.nextSibling);
				return el.nextSibling;
		}
	}
};



[quickTime: {
	classid: 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
	codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
}]