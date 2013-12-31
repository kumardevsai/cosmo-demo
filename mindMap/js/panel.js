var panel = document.getElementById('draw_panel');
var bodyHeight = document.body.offsetHeight;
var bodyWidth = document.body.offsetWidth;
panel.style.left = -(panel.offsetWidth - bodyWidth) / 2 + 'px';
panel.style.top = -(panel.offsetHeight - bodyHeight) / 2 + 'px';

// 显示位置
document.getElementById('panelX').innerHTML = -(panel.offsetWidth - bodyWidth) / 2;
document.getElementById('panelY').innerHTML = -(panel.offsetHeight - bodyHeight) / 2;

var deltaX, deltaY;
var panelMouseDown = function(e) {
	deltaX = e.clientX - parseInt(panel.style.left);
	deltaY = e.clientY - parseInt(panel.style.top);
	AttachEvent(panel, 'mousemove', panelMove, false);
	AttachEvent(panel, 'mouseup', panelMouseUp, false);
};

var panelMouseUp = function(e) {
	panel.style.cursor = 'default';
	DetachEvent(panel, 'mousemove', panelMove, false);
};

var panelMove = function(e) {
	panel.style.cursor = 'move';
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	panel.style.left = (e.clientX - deltaX) + 'px';
	panel.style.top = (e.clientY - deltaY) + 'px';

	// 显示位置
	document.getElementById('panelX').innerHTML = e.clientX - deltaX;
	document.getElementById('panelY').innerHTML = e.clientY - deltaY;
};

var panelUnSelect = function(e) {
	if (mindPaper.currentSelected)
		up(mindPaper.currentSelected.element);
	mindPaper.currentSelected = null;
};

AttachEvent(panel, 'mousedown', panelMouseDown, false);
AttachEvent(panel, 'click', panelUnSelect, false);

var one = new MouseMenu("one");
one.addLink("添加", "", "javascript:DelCtl();", "_self", "添加节点");
one.addLink("删除", "", "javascript:HideMenuAll()", "_self", "删除节点");
one.addLink("删除分支", "", "javascript:HideMenuAll()", "_self", "删除所有节点");

/**
var two = new MouseMenu("two");
two.addLink('清空面板', "", "_self", "只保留根节点");
**/