var SWFObjectSupport = (function() {
	var defaults = {
		height: 200,
		width: 400,
		allowfullscreen: true,
		repeat: true,
		autostart: false,
		swf: 'media/flvplayer.swf',
		id: 'single',
		quality: 'high',
		version: '9'
	};
	var objects = [];
	var object_prefix = 'swf_object_';
	var objectIds = [];

	function generateSwfObjectId() {
		var p = object_prefix + "_" + imgId;
		var num = areaEle_id_arr[p] ? areaEle_id_arr[p] : 0;
		areaEle_id_arr[p] = num + 1;
		if (num)
			return p + "_" + num;
		else
			return p + '_0';
	};

	function setOptions() {};

	function SWFObject_() {};
	SWFObject_.prototype = {
		setOptions: function() {}
	};
	return {
		setOptions: setOptions
	};
})();