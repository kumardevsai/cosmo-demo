// 折叠
function pucker() { //debugger;debugger;
	var tb_div = document.getElementById('table0');
	var tb = tb_div.getElementsByTagName('table')[0];
	var tHead = tb.tHead;
	for (var i = 0; i < tHead.children.length; i++) {
		for (var j = 0; j < tHead.children[i].cells.length; j++) {
			var cell = tHead.children[i].cells[j];
			if (cell.colSpan && parseInt(cell.colSpan, 10) > 1) {
				cell.innerHTML = '<img src="images/elbow-minus-nl.gif" style="vertical-align:middle;" onclick="javascript:pucker_vertical(this.parentNode , true)">' + cell.innerHTML;
			}
		}
	}
}


function pucker_horizontal(cell, collapse) {

}

function pucker_vertical(cell, collapse) {
	var colSpan = parseInt(cell.colSpan, 10);
	var row_number = parseInt(attr(cell, 'row'));
	var begin_row = row_number;
	var thead = cell.parentNode.parentNode;
	var tb = thead.parentNode;
	var remove_num = 0;
	// 下表头收缩
	for (var i = cell.parentNode.rowIndex + 1; i < thead.children.length; i++) {
		var row = thead.children[i];
		for (var j = 0; j < row.cells.length; j++) {
			var cell_ = row.cells[j];
			var cell_row = parseInt(attr(cell_, 'row'));
			if (cell_row === row_number && i === cell.parentNode.rowIndex + 1) {
				cell.colSpan = cell_.colSpan;
				begin_row = parseInt(cell_.colSpan);
				continue;
			} else if (cell_row >= row_number + begin_row && cell_row < colSpan + row_number)
				cell_.style.display = 'none';
		}
	}
	// 上表头收缩
	for (var i = 0; i < cell.parentNode.rowIndex; i++) {
		var row = thead.children[i];
		for (var j = 0; j < row.cells.length; j++) {
			var cell_ = row.cells[j];
			var cell_row = parseInt(attr(cell_, 'row'));
			if (cell_row === row_number) {
				cell_.colSpan = cell_.colSpan - (colSpan - parseInt(cell.colSpan));
			}
		}
	}
	// 单元格
	for (var i = 0; i < tb.tBodies[0].children.length; i++) {
		var row = tb.tBodies[0].children[i];
		for (var j = 0; j < row.cells.length; j++) {
			var cell_ = row.cells[j];
			var cell_row = parseInt(attr(cell_, 'row'));
			if (cell_row === row_number && i === cell.parentNode.rowIndex + 1) {
				continue;
			} else if (cell_row >= row_number + begin_row && cell_row < colSpan + row_number)
				cell_.style.display = 'none';
		}
	}
	cell.children[0].src = 'images/elbow-end-plus-nl.gif';
}