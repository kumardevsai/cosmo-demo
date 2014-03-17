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

	MergeTable.init("tableContainer" ,'<table class="etable" id="etable" border="1px" bordercolor="#433423"><tbody>' 
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' 
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
		+ '</tbody></table>', {});
}, false);


function openEdit() {
	var editContent = document.getElementById("editContent");
	editContent.style.display = "";
	document.getElementById("op").style.display="";
	var editTextArea = document.getElementById("editTextArea");
	var tableContainer = document.getElementById("tableContainer");
	editTextArea.value = tableContainer.innerHTML;
};

function edit() {
	var editTextArea = document.getElementById("editTextArea");
	MergeTable.reloadStr(editTextArea.value);
	document.getElementById("editContent").style.display = "none";
	document.getElementById("op").style.display="none";
};

function closeEdit(){
	document.getElementById("editContent").style.display = "none";
	document.getElementById("op").style.display="none";
};