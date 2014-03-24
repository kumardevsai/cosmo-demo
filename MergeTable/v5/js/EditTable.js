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

	MergeTable.init("tableContainer", '<table class="etable" id="etable" border="1px"><tbody>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' + '</tbody></table>', {});
}, false);


function openEdit() {
	var editContent = document.getElementById("editContent");
	editContent.style.display = "";
	document.getElementById("op").style.display = "block";
	var editTextArea = document.getElementById("editTextArea");
	// 打开编辑前先要关闭格式刷
	if (MergeTable.checkBrushFormatOpened()) {
		MergeTable.closeBrushFormat();
		document.getElementById("brushtext").innerHTML = "&nbsp;格式刷&nbsp;";
	}
	editTextArea.value = MergeTable.read();
};

function edit() {
	var editTextArea = document.getElementById("editTextArea");
	if (editTextArea.value) {
		MergeTable.write(editTextArea.value);
		document.getElementById("editContent").style.display = "none";
		document.getElementById("op").style.display = "none";
	} else {
		alert("表格不能为空!");
	}
};

function closeEdit() {
	document.getElementById("editContent").style.display = "none";
	document.getElementById("op").style.display = "none";
};

function setCss() {
	var selectionCells = MergeTable.getSelectionCells();
	if (selectionCells.length > 0) {
		var css = "";
		css = selectionCells[0].style.cssText;
		var url = "CssEdit/SetCss.htm?t=" + Math.random();
		var str = window.showModalDialog(url, css);
		if (str !== undefined && str !== null) {
			MergeTable.setSelectionCss(str);
		}
	} else {
		alert("请选择有效单元格!");
	}
};

function brushCss() {
	if (MergeTable.checkBrushFormatOpened() === false) {
		MergeTable.openBrushFormat();
		document.getElementById("brushtext").innerHTML = "&nbsp;格式刷(<font color='red'>已开启</font>)&nbsp;";
	} else {
		MergeTable.closeBrushFormat();
		document.getElementById("brushtext").innerHTML = "&nbsp;格式刷&nbsp;";
	}
};


function operate(command) {
	if (MergeTable.checkBrushFormatOpened()) {
		alert("请先关闭格式刷!");
		return;
	}
	if (command === "deleteCol")
		MergeTable.deleteCol();
	else if (command === "merge")
		MergeTable.merge();
	else if (command === "deleteRow")
		MergeTable.deleteRow();
	else if (command === "deleteCol")
		MergeTable.deleteCol();
	else if (command === "addColLeft")
		MergeTable.addColLeft();
	else if (command === "addRowTop")
		MergeTable.addRowTop();
	else if (command === "addRowBottom")
		MergeTable.addRowBottom();
	else if (command === "addColRight")
		MergeTable.addColRight();
	else if (command === "clearMerge")
		MergeTable.clearMerge();
	else if (command === "splitH")
		MergeTable.splitH();
	else if (command === "splitV")
		MergeTable.splitV();
};