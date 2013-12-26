var DundasMapMoExElementId = 'img1';
var DundasMapMoExElement;
DundasMapMoExElement = document.getElementById(DundasMapMoExElementId);
var DundasMapMoOptions = {
	offsetX: -4,
	offsetY: -4
};

if (window.attachEvent)
	window.attachEvent('onload', initLoad);
else if (window.addEventListener)
	window.addEventListener('load', initLoad);

function initLoad() {
	var imgInterval = setInterval(function() {
		DundasMapMoExElement = document.getElementById(DundasMapMoExElementId);
		if (DundasMapMoExElement)
			clearInterval(imgInterval);
	}, 10);
};