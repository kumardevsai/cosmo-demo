function getImageMapRadians(img) {
	var usemap = img.getAttribute('usemap');
	var mapArea = document.getElementById(usemap.substring(1));
	var mapAreaArray = [];
	if (mapArea) {
		for (var i = 0; i < mapArea.children.length; i++) {
			var area = mapArea.children[i];
			var coords = area.getAttribute('coords');
			var coordsArray = coords.split(',');
			mapAreaArray.push({
				area: area,
				angle: getMapAreaAngles(coordsArray)
			});
		}
	}
	return mapAreaArray;
};

function checkIndicatorMapArea(mapAreaArray) {
	for (var i = 0; i < mapAreaArray.length; i++) {
		var isLt = false;
		var isGt = false;
		var a = mapAreaArray[i];
		var arr_ = [];
		for (var j = 0; j < a.angle.length; j++) {
			var angle = a.angle[j];
			if (angle > 0)
				arr_.push(angle);
		}
		arr_.sort(function(k, m) {
			return -(k - m);
		});
		if (arr_.shift() > Math.PI / 2)
			isGt = true;
		if (arr_.pop() < Math.PI / 2)
			isLt = true;
		if (isLt === true && isGt === true) {
			document.getElementById('indicator').value = a.area.getAttribute('title');
			break;
		}
	}
};

function getMapAreaAngles(coordsArray) {
	var arr = [];
	var c_length = coordsArray.length;
	for (var i = 0; i < c_length; i++) {
		var re = coordsArray.splice(2, 2);
		arr.push(Math.atan2(re[1] - coordsArray[1], re[0] - coordsArray[0]));
	}
	return arr;
};