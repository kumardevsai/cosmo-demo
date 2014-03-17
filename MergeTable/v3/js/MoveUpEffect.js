/* 浮动效果 */
AttachEvent(window, 'load', Inits, false);

function Inits() {
	var parentTable = document.getElementById("parentTable");
	/* 加入浮动效果 */
	for (var i = 0; i < parentTable.rows.length; i++) {
		for (var j = 0; j < parentTable.rows[i].cells.length; j++) {
			var cell = parentTable.rows[i].cells[j];
			if (cell.className == "bar") {
				AttachEvent(cell, 'mouseover', newopen(cell), false);
				AttachEvent(cell, 'mouseout', newlev(cell), false);
			}
		}
	}
}
/* 浮动效果 */
function moveover(obj) {
	obj.className = 'up';
}
/* 浮动效果 */
function moveout(obj) {
	obj.className = 'bar';
}
var newopen = function(id) {
	return function() {
		moveover(id);
	}
}
var newlev = function(id) {
	return function() {
		moveout(id);
	}
}