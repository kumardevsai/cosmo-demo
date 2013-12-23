if (window.attachEvent) {
	window.attachEvent('onload', function() {
		var imgInterval = setInterval(function() {
			var frame_window = document.frames["iframe0"];
			var meterImg = frame_window.document.getElementById(meterId);
			if (meterImg) {
				var usemap = meterImg.getAttribute('usemap');
				var mapArea = frame_window.document.getElementById(usemap.substring(1));
				initChart(document.getElementById(imgId), containerId, document.getElementById(renderElementId), meterImg, mapArea);
				clearInterval(imgInterval);
			}
		}, 100);
	});
} else if (window.addEventListener) {
	window.addEventListener('load', function() {
		var frame_interval = setInterval(function() {
			if (document.getElementsByName('iframe0')) {
				clearInterval(frame_interval);
				var frame_window = document.getElementsByName('iframe0')[0].contentWindow;
				var imgInterval = setInterval(function() {
					var meterImg = frame_window.document.getElementById(meterId);
					if (meterImg) {
						clearInterval(imgInterval);
						var usemap = meterImg.getAttribute('usemap');
						var mapArea = frame_window.document.getElementById(usemap.substring(1));
						initChart(document.getElementById(imgId), containerId, document.getElementById(renderElementId), meterImg, mapArea);
					}
				}, 100);
			}
		}, 100);
	});
}

var containerId = 'divcon3';
var imgId = 'img1';
var renderElementId = "indicator";
var meterId = "Meter1";