"use strict";
AttachEvent(window, 'load', function() {
	var editContent = document.getElementById("editContent");
	var d_height = document.body.clientHeight;
	var d_width = document.body.clientWidth;
	if (d_height - 400 > 0)
		editContent.style.top = (d_height - 400) / 2 + "px";
	else
		editContent.style.top = 0;
	if (d_width - 600 > 0)
		editContent.style.left = (d_width - 600) / 2 + "px";
	else
		editContent.style.left = 0;
}, false);