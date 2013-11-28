/**
	不支持分页，但速度快
**/
var cellListExpand = (function() {
	var activeTheadCells = [];
	return function(e) {
		var cell = getEventCell(e);
		// 默认应该是处于折叠状态
		var pre_ = cell.col + '_' + cell.row;
		var activeCell = activeTheadCells[pre_];
		if (activeCell === undefined) {
			var mxwCell = new MxwTableCell(cell.cell, cell.col, cell.row);
			mxwCell.getNextCells().expandNexts();
			activeTheadCells[pre_] = mxwCell;
		} else {
			if (activeCell.collapse === true)
				activeCell.collapseNexts();
			else
				activeCell.expandNexts();
		}
	};
})();

function MxwTableCell(cell, col, row) {
	this.cell = cell ? cell : null;
	this.nexts = [];
	this.collapse = true;
	this.col = col !== undefined ? col : null;
	this.row = row !== undefined ? row : null;
};

// 展开显示所有的单元格
MxwTableCell.prototype.expandNexts = function() {
	for (var i = 0; i < this.nexts.length; i++) {
		var next = this.nexts[i];
		next.cell.style.display = '';
	}
	this.collapse = true;
};

// 隐藏所有的单元格
MxwTableCell.prototype.collapseNexts = function() {
	for (var i = 0; i < this.nexts.length; i++) {
		var next = this.nexts[i];
		next.cell.style.display = 'none';
	}
	this.collapse = false;
};

// 获取事件触发的单元格
function getEventCell(e) {
	e = window.event ? window.event : e;
	var et = e.srcElement ? e.srcElement : e.target;
	var cell = et.parentNode ? 　et.parentNode : et.parentElement;
	if (cell.tagName.toLowerCase() === 'td' || cell.toLowerCase().tagName === 'th') {
		var row;
		// ie下cellIndex不计算被隐藏的单元格
		if (document.all) {
			for (var i = 0; i < cell.parentNode.cells.length; i++) {
				if (cell.parentNode.cells[i] == cell)
					row = i;
			}
		} else
			row = cell.cellIndex;
		return {
			cell: cell,
			col: 0,
			row: row
		};
	}
};

MxwTableCell.prototype.getNextCells = function() {
	var cell = this.cell;
	var thead = cell.parentNode.parentNode;
	if (thead.tagName.toLowerCase() === 'thead') {
		for (var i = this.row + 1; i < cell.parentNode.cells.length; i++) {
			var cell_ = cell.parentNode.cells[i];
			if (cell_.style.display === 'none')
				this.nexts.push(new MxwTableCell(cell_));
			else
				break;
		}
	}
	var tbody = thead.parentNode.tBodies[0];
	for (var i = 0; i < tbody.children.length; i++) {
		var tr = tbody.children[i];
		for (var j = this.row + 1; j < tr.cells.length; j++) {
			var cell_ = tr.cells[j];
			if (cell_.style.display === 'none')
				this.nexts.push(new MxwTableCell(cell_));
			else
				break;
		}
	}
	return this;
};