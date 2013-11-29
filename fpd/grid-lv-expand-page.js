// 折叠展开方法
var cellListExpand = function(t) {
	var btn = t;
	if (btn === null)
		return;
	var cell_obj = getEventCell(btn);
	var cell = cell_obj.cell;
	// 初始化时折叠的
	if (cell.getAttribute('row_collapse') === null || cell.getAttribute('row_collapse') === 'true') {
		expandNextCells(cell_obj);
		cell.setAttribute('row_collapse', 'false');
		btn.className = 'arrow arrow-l-hover';
	} else {
		collapseNextCells(cell_obj);
		cell.setAttribute('row_collapse', 'true');
		btn.className = 'arrow arrow-r-hover';
	}
};

// 修改鼠标移动到折叠箭头时候的样式
var btnMouseOver = function(t) {
	var btn = t;
	if (btn === null)
		return;
	var cell_obj = getEventCell(btn);
	var cell = cell_obj.cell;
	// 初始化时折叠的
	if (cell.getAttribute('row_collapse') === null || cell.getAttribute('row_collapse') === 'true') {
		btn.className = 'arrow arrow-r-hover';
	} else {
		btn.className = 'arrow arrow-l-hover';
	}
};

var btnMouseOut = function(t) {
	var btn = t;
	if (btn === null)
		return;
	var cell_obj = getEventCell(btn);
	var cell = cell_obj.cell;
	// 初始化时折叠的
	if (cell.getAttribute('row_collapse') === null || cell.getAttribute('row_collapse') === 'true') {
		btn.className = 'arrow arrow-r';
	} else {
		btn.className = 'arrow arrow-l';
	}
};

// 获取事件触发的单元格
function getEventCell(btn) {
	var cell = btn.parentNode ? btn.parentNode : btn.parentElement;
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

// 展开单元格
function expandNextCells(cell_obj) {
	var cell = cell_obj.cell;
	var thead = cell.parentNode.parentNode;
	if (thead.tagName.toLowerCase() === 'thead') {
		for (var i = cell_obj.row + 1; i < cell.parentNode.cells.length; i++) {
			var cell_ = cell.parentNode.cells[i];
			if (cell_.style.display === 'none') {
				cell_.style.display = '';
				// 设置属性，向后有多少列被展开
				if (cell.getAttribute('thead_row_collapse') === null)
					cell.setAttribute('thead_row_collapse', 1)
				else
					cell.setAttribute('thead_row_collapse', parseInt(cell.getAttribute('thead_row_collapse')) + 1);
			} else
				break;
		}
	}
	var tbody = thead.parentNode.tBodies[0];
	// 展开body
	for (var i = 0; i < tbody.children.length; i++) {
		var tr = tbody.children[i];
		for (var j = cell_obj.row + 1; j < tr.cells.length; j++) {
			var cell_ = tr.cells[j];
			if (cell_.style.display === 'none') {
				cell_.style.display = '';
			} else
				break;
		}
	}
};


// 折叠
function collapseNextCells(cell_obj) {
	var cell = cell_obj.cell;
	var thead_row_collapse = cell.getAttribute('thead_row_collapse');
	if (thead_row_collapse)
		thead_row_collapse = parseInt(thead_row_collapse);
	var thead = cell.parentNode.parentNode;
	if (thead.tagName.toLowerCase() === 'thead') {
		for (var i = cell_obj.row + 1; i <= cell_obj.row + thead_row_collapse; i++) {
			cell.parentNode.cells[i].style.display = 'none';
		}
		cell.removeAttribute('thead_row_collapse');
	}
	// 折叠body
	var tbody = thead.parentNode.tBodies[0];
	for (var i = 0; i < tbody.children.length; i++) {
		var tr = tbody.children[i];
		for (var j = cell_obj.row + 1; j <= cell_obj.row + thead_row_collapse; j++) {
			var cell_ = tr.cells[j];
			cell_.style.display = 'none';
		}
	}
};