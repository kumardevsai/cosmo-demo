// 获取图片的热区数据
function getImageMapRadians(img , mapArea) {
    var mapArea;
    if(!mapArea)
	{
	    var usemap = img.getAttribute('usemap');
    	mapArea = document.getElementById(usemap.substring(1));
	}
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

// 设置角度显示
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
		var s = arr_.shift();
		var p = arr_.pop();
		if (s > Math.PI / 2 && s <= Math.PI)
			isGt = true;
		if (p < Math.PI / 2 && p >= 0)
			isLt = true;
		if (isLt === true && isGt === true) {
			indicator.renderElement.innerHTML = a.area.getAttribute('title');
		}
	}
};

// 根据热区获取角度
function getMapAreaAngles(coordsArray) {
	var arr = [];
	var c_length = coordsArray.length / 2 - 1;
	for (var i = 0; i < c_length; i++) {
		var re = coordsArray.splice(2, 2);
		arr.push(Math.atan2(re[1] - coordsArray[1], re[0] - coordsArray[0]));
	}
	return arr;
};

// 旋转获取角度
function rotateIndicatorMapArea(radian) {
	for (var i = 0; i < indicator.mapArea.length; i++) {
		var area = indicator.mapArea[i];
		var angle = area.angle;
		for (j = 0; j < angle.length; j++) {
			var r = angle[j];
			r = r + radian;
			if (r > Math.PI)
				r = -(Math.PI - (r - Math.PI));
			else if (r < -Math.PI)
				r = Math.PI - (-r - Math.PI);
			angle[j] = r;
		}
		area.angle = angle;
		indicator.mapArea[i] = area;
	}
	return indicator.mapArea;
}

// 指示器
var indicator = {
	// 角度数据
	mapArea: [],
	renderElement: null
};

// 初始化表盘显示
function initChart(img, containerId, renderElement) {
	indicator.renderElement = renderElement;
	new ImageTrans(containerId, img, {});
	indicator.mapArea = getImageMapRadians(img);
	checkIndicatorMapArea(indicator.mapArea);
};