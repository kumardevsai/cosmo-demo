function caculateMapAreaPosition(img, imageMap, viewport, divIframe) {
	var contentFillerDiv = img.parentNode;
	var p_left = parseInt(contentFillerDiv.style.left);
	var p_top = parseInt(contentFillerDiv.style.top);
	var img_left = parseInt(img.style.left);
	var img_top = parseInt(img.style.top);

	var mapAreas = imageMap.children;
	for (var i = 0; i < mapAreas.length; i++) {
		var area = mapAreas[i];
		var coords = area.getAttribute("coords");
		var arr = coords.split(",");
		var c_left = p_left + img_left + parseInt(arr[0]) + DundasMapEx.MapManagerEx.exConfig.offsetX + parseInt(divIframe.style.left);
		var c_top = p_top + img_top + parseInt(arr[1]) + DundasMapEx.MapManagerEx.exConfig.offsetY + parseInt(divIframe.style.top);
		var tipDiv = document.createElement('div');
		tipDiv.className = 'tip-div';
		tipDiv.style.left = c_left + 'px';
		tipDiv.style.top = c_top + 'px';
		tipDiv.area = area;
		viewport.appendChild(tipDiv);
		exDivs.push({
			ele: tipDiv,
			x: c_left,
			y: c_top
		});
	}
};



if (window.attachEvent)
	window.attachEvent('onload', dundasInit);
else if (window.addEventListener)
	window.addEventListener('load', dundasInit);

function dundasInit() {
	var iframeInterval = setInterval(function() {
		var mapIframe;
		if (document.all)
			mapIframe = document.frames[mapIframeId].window;
		else
			mapIframe = document.getElementsByName(mapIframeId)[0].contentWindow;
		if (mapIframe) {
			var dundasInterval = setInterval(function() {
				if (mapIframe.DundasMap) {
					dundasSupport(mapIframe.ctl03Manager, document.getElementById(mapIframeId));
					clearInterval(dundasInterval);
				}
			}, 100);
			clearInterval(iframeInterval);
		}
	}, 100);
};

function dundasSupport(ctl03Manager, divIframe) {
	ctl03Manager.addImageMap = function(image) {
		if (image.imageMapText != null) {
			var imageMap = document.createElement("MAP");
			imageMap.id = image.name + "Map";
			imageMap.name = imageMap.id;
			imageMap.i = image.i;
			imageMap.j = image.j;
			imageMap.innerHTML = image.imageMapText;
			this.viewport.appendChild(imageMap);
			image.useMap = "#" + imageMap.id;
			caculateMapAreaPosition(image, imageMap, window.parent.document.body, divIframe);
		}
	};
	ctl03Manager.onMouseMove = function(e) {
		e = e || window.event;
		var thisManager = null;
		if (window.__thisManager) {
			thisManager = window.__thisManager;
		} else if (this.__thisManager) {
			thisManager = this.__thisManager;
		}
		if (thisManager.mouseDownX != null) {
			var deltaX = e.clientX - thisManager.mouseDownX;
			var deltaY = e.clientY - thisManager.mouseDownY;
			thisManager.scrollTo(thisManager.initialScrollX + deltaX, thisManager.initialScrollY + deltaY);
			thisManager.updateVisibleSections();
			moveExDivsPosition(deltaX, deltaY);
		}
		return true;
	};
	ctl03Manager.onMouseUp = function(e) {
		e = e || window.event;
		var thisManager = null;
		if (window.__thisManager) {
			thisManager = window.__thisManager;
			window.removeEventListener("mousemove", thisManager.onMouseMove, false);
			window.removeEventListener("mouseup", thisManager.onMouseUp, false);
			window.__thisManager = null;
		} else if (this.__thisManager) {
			thisManager = this.__thisManager;
			if (thisManager.viewport.releaseCapture)
				thisManager.viewport.releaseCapture();
			thisManager.viewport.onmousemove = null;
			thisManager.viewport.onmouseup = null;
			this.__thisManager = null;
		}
		thisManager.mouseDownX = null;
		thisManager.mouseDownY = null;
		resetExDivsPosition();
	}
};

var mapIframeId = 'iframe0';

var DundasMapEx = {
	MapManagerEx: {
		exConfig: {
			offsetX: 0,
			offsetY: 0
		}
	}
};

var exDivs = [];

function moveExDivsPosition(deltaX, deltaY) {
	for (var i = 0; i < exDivs.length; i++) {
		var exDiv = exDivs[i];
		exDiv.ele.style.left = exDiv.x + deltaX + 'px';
		exDiv.ele.style.top = exDiv.y + deltaY + 'px';
	}
};

function resetExDivsPosition() {
	for (var i = 0; i < exDivs.length; i++) {
		var exDiv = exDivs[i];
		exDiv.x = parseInt(exDiv.ele.style.left);
		exDiv.y = parseInt(exDiv.ele.style.top);
	}
};

DundasMapEx.MapManagerEx.exConfig.offsetX = -4;
DundasMapEx.MapManagerEx.exConfig.offsetY = -20;