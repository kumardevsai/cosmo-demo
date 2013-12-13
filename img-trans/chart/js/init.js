if (window.attachEvent) {
	window.attachEvent('onload', function() {
		initChart();
	});
} else if (window.addEventListener)
	window.addEventListener('load', function() {
		var imgInterval = setInterval(function() {
			var img = document.getElementById(imgId);
			if (img) {
				clearInterval(imgInterval);
				initChart(img);
			}
		}, 100);
	}, false);

var containerId = 'LabelChart';
var imgId = 'Meter1';

function initChart(img) {
	var imgtrans = new ImageTrans(containerId, {});
	if (img)
		imgtrans.setExistImg(img);
	else
		imgtrans.setExistImg(document.getElementById(imgId));
};