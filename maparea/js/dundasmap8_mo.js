var DundasMapMo = (function(options, exElement) {
	var exElementClone;
	var exElementClone_height = 0;
	if (exElement) {
		exElementClone = exElement.cloneNode(true);
		exElementClone_height = parseInt(exElement.style.height);
		exElement.parentNode.removeChild(exElement);
	}
	var config = {
		offsetX: 0,
		offsetY: 0
	};
	if (options) {
		for (var i in options) {
			if (options.hasOwnProperty(i)) {
				if (config.hasOwnProperty(i)) {
					if (options[i] !== undefined && options[i] !== null)
						config[i] = options[i];
				}
			}
		}
	}

	var exEles = [];

	var exEle_prefix = 'exEle';

	var exEle_id_arr = [];

	function generateExEleId(imgId) {
		var p = exEle_prefix + "_" + imgId;
		var num = exEle_id_arr[p] ? exEle_id_arr[p] : 0;
		exEle_id_arr[p] = num + 1;
		if (num)
			return p + "_" + num;
		else
			return p + '_0';
	};

	function caculateExElesPosition(img, imageMap) {
		if (exElementClone) {
			if (img.tipElementVisiable === true)
				return;
			var contentFillerDiv = img.parentNode;
			var img_left = parseInt(img.style.left);
			var img_top = parseInt(img.style.top);

			var mapAreas = imageMap.children;
			for (var i = 0; i < mapAreas.length; i++) {
				var tipElement = exElementClone.cloneNode(true);
				img.parentNode.appendChild(tipElement);

				var area = mapAreas[i];
				var coords = area.getAttribute("coords");
				var arr = coords.split(",");
				var c_left = img_left + parseInt(arr[0]) + config.offsetX;
				var c_top = img_top + parseInt(arr[1]) - exElementClone_height + config.offsetY;

				tipElement.style.left = c_left + 'px';
				tipElement.style.top = c_top + 'px';
				tipElement.style.display = 'block';
				tipElement.id = generateExEleId(img.id);
				exEles.push({
					ele: tipElement
				});
			}
			img.tipElementVisiable = true;
		}
	};

	function destroyExEles() {
		for (var i = 0; i < exEles.length; i++) {
			exEles[i].ele.parentNode.removeChild(exEles[i].ele);
		}
		exEles = [];
		exEle_id_arr = [];
	};
	return {
		MapManager: {
			caculateExElesPosition: caculateExElesPosition,
			compatMo: true,
			destroyExEles: destroyExEles
		}
	};
})(function() {
	if (window.parent.DundasMapMoOptions)
		return window.parent.DundasMapMoOptions;
	else
		return {};
}(), function() {
	if (window.parent.DundasMapMoExElement)
		return window.parent.DundasMapMoExElement;
	else
		return null;
}());