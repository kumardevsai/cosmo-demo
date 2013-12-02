// 折叠
function pucker() {
	var tb_div = document.getElementById('table0');
	var tb = tb_div.getElementsByTagName('table')[0];
	var tbody = tb.tBodies[0];
	var mergeCols = attr(tbody, 'MergeCols').split(',');
	var arr = chargeArrayProperty(mergeCols);
	var tHead = tb.tHead;
	for (var i = 0; i < tHead.children.length - 1; i++) {
		for (var j = 0; j < tHead.children[i].cells.length; j++) {
			var cell = tHead.children[i].cells[j];
			if (!arr[attr(cell, 'row')])
				cell.innerHTML = '<img src="images/elbow-minus-nl.gif" style="vertical-align:middle;" collapse="false" onclick="javascript:pucker_img(this , 0)">' + cell.innerHTML;
		}
	}
	var max_row = parseInt(mergeCols.pop());
	for (var i = 0; i < tbody.children.length; i++) {
		for (var j = 0; j <= max_row - 1; j++) {
			var cell = tbody.children[i].cells[j];
			if (attr(cell, 'row') < max_row) {
				// 兼容ie的做法 , 其他浏览器在遇到使用attr(cell , 'rowSpan_prop')的时候都可以用cell.rowSpan代替
				attr(cell, 'rowSpan_prop', cell.rowSpan);
				cell.innerHTML = '<img src="images/elbow-minus-nl.gif" style="vertical-align:middle;" collapse="false" onclick="javascript:pucker_img(this , 1)">' + cell.innerHTML;
			}
		}
	}
}



function pucker_horizontal(cell, collapse) {
	var rowSpan_prop = parseInt(attr(cell, 'rowSpan_prop'), 10);
	var col_num = parseInt(attr(cell, 'col'));
	var row_num = parseInt(attr(cell, 'row'));
	var tbody = cell.parentNode.parentNode;
	var tb = tbody.parentNode;
	var row_index = cell.parentNode.rowIndex;
	var tHead_num = tb.tHead.children.length;
	var factRowSpan = attr(cell, 'factRowSpan') === null ? rowSpan_prop : parseInt(attr(cell, 'factRowSpan'));
	if (collapse === true) {
		// 实际需要遍历查询的单元行数
		var fac_rowSpan = factRowSpan > rowSpan_prop ? factRowSpan : rowSpan_prop;
		// 右单元格操作
		for (var i = row_index; i < fac_rowSpan + col_num; i++) {
			var row = tbody.children[i - tHead_num];
			// 基准行，当前执行折叠单元格所属的行
			if (i === row_index) {
				for (var j = 0; j < row.cells.length; j++) {
					var cell_ = row.cells[j];
					if (parseInt(attr(cell_, 'row')) === row_num + 1 && col_num == attr(cell_, 'col')) {
						if (attr(cell, 'factRowSpan') === null)
							attr(cell, 'factRowSpan', attr(cell, 'rowSpan_prop'));
						cell.rowSpan = parseInt(cell_.rowSpan);
						attr(cell, 'rowSpan_prop', cell.rowSpan);
						break;
					}
				}
			} else if (i > row_index + parseInt(attr(cell, 'rowSpan_prop')) - 1) {
				if (row.style.display !== 'none') {
					if (attr(cell, 'collapse_rows') === null)
						attr(cell, 'collapse_rows', i - tHead_num);
					else
						attr(cell, 'collapse_rows', attr(cell, 'collapse_rows') + ',' + (i - tHead_num));
					row.style.display = 'none';
				}
			}
		}
		var islastcell = cell.parentNode;
		for (var m = 1; m < attr(cell, 'factRowSpan'); m++) {
			islastcell = islastcell.nextSibling;
		}

		if (!islastcell.nextSibling) {
			// 左单元格操作
			for (var i = 0; i < tbody.children.length; i++) {
				for (var j = 0; j < tbody.children[i].cells.length; j++) {
					var cell_ = tbody.children[i].cells[j];
					if (parseInt(attr(cell_, 'row')) >= row_num || parseInt(attr(cell_, 'col')) > col_num || parseInt(attr(cell_, 'col')) + parseInt(attr(cell_, 'factRowSpan') !== null ? attr(cell_, 'factRowSpan') : attr(cell_, 'rowSpan_prop')) - 1 < col_num)
						break;
					else {
						if (parseInt(attr(cell_, 'rowSpan_prop')) >= rowSpan_prop) {
							if (attr(cell_, 'factRowSpan') === null)
								attr(cell_, 'factRowSpan', attr(cell_, 'rowSpan_prop'));
							cell_.rowSpan = parseInt(attr(cell_, 'factRowSpan') !== null ? attr(cell_, 'factRowSpan') : cell_.rowSpan) - (factRowSpan - cell.rowSpan);
							attr(cell_, 'preRowSpan', cell_.rowSpan);
						}
					}
				}
			}
		}
	} else {
		var collapse_rows = attr(cell, 'collapse_rows');
		if (!stringAvialable(collapse_rows))
			return;
		collapse_rows = collapse_rows.split(',');
		for (var i = 0; i < collapse_rows.length; i++) {
			tbody.children[collapse_rows[i]].style.display = '';
		}
		// 还原跨行  TODO 这样做不好，应该计算还原 兼容ie
		if (attr(cell, 'preRowSpan') != null)
			cell.rowSpan = attr(cell, 'preRowSpan');
		else
			cell.rowSpan = factRowSpan;
		attr(cell, 'rowSpan_prop', factRowSpan);
		// 移出标记的隐藏行属性
		cell.removeAttribute('collapse_rows');
		var islastcell = cell.parentNode;
		for (var m = 1; m < attr(cell, 'factRowSpan'); m++) {
			islastcell = islastcell.nextSibling;
		}

		// 左单元格设置跨行属性
		for (var i = 0; i < tbody.children.length; i++) {
			for (var j = 0; j < tbody.children[i].cells.length; j++) {
				var cell_ = tbody.children[i].cells[j];
				if (parseInt(attr(cell_, 'row')) >= row_num || parseInt(attr(cell_, 'col')) > col_num || parseInt(attr(cell_, 'col')) + parseInt(attr(cell_, 'factRowSpan') !== null ? attr(cell_, 'factRowSpan') : attr(cell_, 'rowSpan_prop')) - 1 < col_num)
					break;
				else {
					if (parseInt(attr(cell_, 'rowSpan_prop')) >= rowSpan_prop) {
						var islastcell_ = cell_.parentNode;
						for (var m = 1; m < attr(cell_, 'factRowSpan'); m++) {
							islastcell_ = islastcell_.nextSibling;
						}
						if (attr(cell_, 'factRowSpan') === null)
							attr(cell_, 'factRowSpan', attr(cell_, 'rowSpan_prop'));
						if (!islastcell.nextSibling) {
							if (islastcell_.nextSibling || !attr(cell, 'preRowSpan'))
								cell_.rowSpan = attr(cell_, 'factRowSpan');
							else
								cell_.rowSpan = parseInt(cell_.rowSpan) + (attr(cell, 'preRowSpan') - 1);
						} else {
							if (islastcell_.nextSibling)
								cell_.rowSpan = attr(cell_, 'factRowSpan');
						}
						attr(cell_, 'preRowSpan', cell_.rowSpan);
					}
				}
			}
		}
	}
}

function pucker_vertical(cell, collapse) {
	var colSpan = parseInt(cell.colSpan, 10);
	var row_number = parseInt(attr(cell, 'row'));
	var begin_row = row_number;
	var thead = cell.parentNode.parentNode;
	var tb = thead.parentNode;
	if (collapse === true) {
		// 下表头收缩
		for (var i = cell.parentNode.rowIndex + 1; i < thead.children.length; i++) {
			var row = thead.children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (cell_row === row_number && i === cell.parentNode.rowIndex + 1) {
					if (!attr(cell, 'factColSpan'))
						attr(cell, 'factColSpan', cell.colSpan);
					cell.colSpan = cell_.colSpan;
					begin_row = parseInt(cell_.colSpan);
					continue;
				} else if (cell_row >= row_number + begin_row && (cell_row < colSpan + row_number || cell_row < parseInt(attr(cell, 'factColSpan')) + row_number)) {
					if (cell_.style.display !== 'none') {
						if (attr(cell, 'collapse_hcells') === null)
							attr(cell, 'collapse_hcells', i + '_' + cell_row);
						else
							attr(cell, 'collapse_hcells', attr(cell, 'collapse_hcells') + ',' + i + '_' + cell_row);
						cell_.style.display = 'none';
					}
				}
			}
		}
		// 上表头收缩
		for (var i = 0; i < cell.parentNode.rowIndex; i++) {
			var row = thead.children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (cell_row + parseInt(cell_.colSpan) >= row_number + colSpan || cell_row + parseInt(attr(cell_, 'factColSpan')) >= row_number + colSpan) {
					if (!attr(cell_, 'factColSpan'))
						attr(cell_, 'factColSpan', cell_.colSpan);
					cell_.colSpan = cell_.colSpan - (colSpan - parseInt(cell.colSpan));
					break;
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
				} else if (cell_row >= row_number + begin_row && (cell_row < colSpan + row_number || cell_row < parseInt(attr(cell, 'factColSpan')) + row_number)) {
					if (cell_.style.display !== 'none') {
						if (attr(cell, 'collapse_bcells') === null)
							attr(cell, 'collapse_bcells', i + '_' + cell_row);
						else
							attr(cell, 'collapse_bcells', attr(cell, 'collapse_bcells') + ',' + i + '_' + cell_row);
						cell_.style.display = 'none';
					}
				}
			}
		}
	} else if (collapse === false) {
		// 获取隐藏的表头
		var collapse_hcells = attr(cell, 'collapse_hcells');
		if (!stringAvialable(collapse_hcells))
			return;
		var arrh = chargeArrayProperty(collapse_hcells.split(','));
		// 获取隐藏的单元格
		var collapse_bcells = attr(cell, 'collapse_bcells');
		if (!stringAvialable(collapse_bcells))
			return;
		var arrb = chargeArrayProperty(collapse_bcells.split(','));
		collapse_bcells = collapse_bcells.split(',');
		var factColSpan = parseInt(attr(cell, 'factColSpan'));
		// 上表头设置跨行属性
		for (var i = 0; i < cell.parentNode.rowIndex; i++) {
			var row = thead.children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (cell_row + parseInt(cell_.colSpan) >= row_number + colSpan || cell_row + parseInt(attr(cell_, 'factColSpan')) >= row_number + colSpan) {
					cell_.colSpan = cell_.colSpan + factColSpan - 1;
					break;
				}
			}
		}
		var num = 0;
		// 下表头展开
		for (var i = cell.parentNode.rowIndex + 1; i < thead.children.length; i++) {
			var row = thead.children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (i === cell.parentNode.rowIndex + 1) {
					if (cell_row >= row_number && (cell_row < colSpan + row_number || cell_row < parseInt(attr(cell, 'factColSpan')) + row_number))
						num += cell_.colSpan;
				}
				if (arrh[i + '_' + cell_row] !== '' && arrh[i + '_' + cell_row] !== undefined)
					cell_.style.display = 'block';
			}
		}
		cell.colSpan = num;
		// 单元格展开
		for (var i = 0; i < tb.tBodies[0].children.length; i++) {
			var row = tb.tBodies[0].children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (arrb[i + '_' + cell_row] !== '' && arrb[i + '_' + cell_row] !== undefined)
					cell_.style.display = 'block';
			}
		}
		cell.removeAttribute('collapse_hcells');
		cell.removeAttribute('collapse_bcells');
	}
}

// 图片按钮触发事件
function pucker_img(img, flag) {
	var cell = img.parentNode;
	if (attr(img, 'collapse') === 'false') {
		if (flag === 0)
			pucker_vertical(cell, true);
		else
			pucker_horizontal(cell, true);
		attr(img, 'collapse', true);
		img.src = 'images/elbow-end-plus-nl.gif';
	} else {
		if (flag === 0)
			pucker_vertical(cell, false);
		else
			pucker_horizontal(cell, false);
		attr(img, 'collapse', false);
		img.src = 'images/elbow-minus-nl.gif';
	}
}

// 数组内容转下标
function chargeArrayProperty(array) {
	if (Object.prototype.toString.call(array) === '[object Array]') {
		var arr = [];
		for (var i in array) {
			if (array.hasOwnProperty(i))
				arr[array[i]] = array[i];
		}
		return arr;
	} else
		return null;
}

// 判断有效字符串
function stringAvialable(value) {
	return value !== undefined && value !== '' && value !== null;
}