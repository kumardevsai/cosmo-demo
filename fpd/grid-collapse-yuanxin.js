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
			// 合并情况下不出现折叠按钮
			if (!arr[attr(cell, 'row')] && cell.id != 'cell_connect')
				cell.innerHTML = '<img src="images/elbow-minus-nl.gif" style="vertical-align:middle;" collapse="false" onclick="javascript:pucker_img(this , 0)">' + cell.innerHTML;
		}
	}
	var max_row = parseInt(mergeCols.pop());
	for (var i = 0; i < tbody.children.length; i++) {
		for (var j = 0; j <= max_row - 1; j++) {
			var cell = tbody.children[i].cells[j];
			// 合并情况下不出现折叠按钮
			if (attr(cell, 'row') < max_row && cell.id != 'cell_connect') {
				// 兼容ie的做法 , 其他浏览器在遇到使用attr(cell , 'rowSpan_prop')的时候都可以用cell.rowSpan代替
				attr(cell, 'rowSpan_prop', cell.rowSpan);
				cell.innerHTML = '<img src="images/elbow-minus-nl.gif" style="vertical-align:middle;" collapse="false" onclick="javascript:pucker_img(this , 1)">' + cell.innerHTML;
			}
		}
	}
}


// 列折叠
function pucker_horizontal(cell, collapse) {
	var rowSpan_prop = parseInt(attr(cell, 'rowSpan_prop'), 10);
	var col_num = parseInt(attr(cell, 'col'));
	var row_num = parseInt(attr(cell, 'row'));
	var tbody = cell.parentNode.parentNode;
	var tb = tbody.parentNode;
	var row_index = cell.parentNode.rowIndex;
	var tHead_num = tb.tHead.children.length;
	// 折叠
	if (collapse === true) {
		// 当列合并的时候
		if (cell.rowSpan > 1) {
			// 假如前后单元格合并列一致，不进行折叠
			if (parseInt(attr(cell.nextSibling, 'rowSpan_prop'), 10) == rowSpan_prop)
				return false;
			// 行对象
			var trDom = tb.getElementsByTagName('tr');
			// 折叠后该单元格显示的列数
			var collapseNum = cell.nextSibling.rowSpan;
			if (document.all) {
				attr(cell, "cos_row", attr(cell.nextSibling, "row"));
				attr(cell, "cos_col", attr(cell.nextSibling, "col"));
			}
			for (var i = collapseNum; i < rowSpan_prop; i++) {
				trDom[col_num + i].style.display = 'none';
				if (attr(trDom[col_num + i], 'hiddenRow') == null) {
					// 增加隐藏行属性，用于记录属于哪行
					attr(trDom[col_num + i], 'hiddenRow', row_num);
					attr(trDom[col_num + i], 'hiddenCol', col_num);
				}
			}
			// 节点的父节点集合
			var parentArr = [];
			// 左侧单元格
			for (var i = 0; i < trDom.length; i++) {
				var tdDom = trDom[i].getElementsByTagName('td');
				for (var j = 0; j < row_num; j++) {
					// 存在跨列时执行
					if (tdDom[j].rowSpan > 1) {
						var pCol = parseInt(attr(tdDom[j], 'col'));
						var pRow = parseInt(attr(tdDom[j], 'row'));
						var pRowspan = parseInt(attr(tdDom[j], 'rowSpan_prop'), 10);
						if ((pCol <= col_num) && ((pCol + pRowspan) >= (col_num + rowSpan_prop)) && pRow < row_num) {
							// 插入节点
							parentArr.push(tdDom[j]);
							// 非ie
							if (!document.all) {
								tdDom[j].rowSpan -= (cell.rowSpan - collapseNum);
							} else {
								// ie下最后一行需要重新计算rowspan
								if ((pCol + pRowspan) == (col_num + rowSpan_prop)) {
									tdDom[j].rowSpan -= (cell.rowSpan - collapseNum);
									// 判断左侧单元格的父节点是否也处于最下面一行
									if (parentArr.length > 1) {
										var PPdom = parentArr[parentArr.length - 2];
										var PPCol = parseInt(attr(PPdom, 'col'));
										if ((col_num + parseInt(cell.rowSpan)) == (PPCol + parseInt(PPdom.rowSpan))) {
											PPdom.rowSpan -= (cell.rowSpan - collapseNum);
										}
									}
								}
								// 当父节点折叠后，在ie下最上一层子节点折叠时需要改变父节点rowspan
								if (attr(tdDom[j], 'cos_row') == attr(cell, 'row') && attr(tdDom[j], 'cos_col') == attr(cell, 'col')) {
									tdDom[j].rowSpan -= (cell.rowSpan - collapseNum);
									var len = parentArr.length;
									if (len > 1) {
										for (var k = len - 1; k > 0; k--) {
											if (parentArr[k - 1]) {
												var pNum1 = parseInt(attr(parentArr[k], 'col')) + parseInt(attr(parentArr[k], 'rowSpan_prop'), 10);
												var pNum2 = parseInt(attr(parentArr[k - 1], 'col')) + parseInt(attr(parentArr[k - 1], 'rowSpan_prop'), 10);
												// 当父单元与子单元都在最下方时
												if (pNum1 == pNum2 || parentArr[k - 1].rowSpan == cell.rowSpan) {
													parentArr[k - 1].rowSpan -= (cell.rowSpan - collapseNum);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			// 本单元格合并
			cell.rowSpan = collapseNum;
		}
	}
	// 列展开
	else {
		// 假如前后单元格合并列一致，不进行展开
		if (parseInt(attr(cell.nextSibling, 'rowSpan_prop'), 10) == rowSpan_prop)
			return false;
		// 行对象
		var trDom = tb.getElementsByTagName('tr');
		// 折叠后该单元格显示的列数
		var collapseNum = cell.nextSibling.rowSpan;
		// 显示最底部行的个数
		var showTrNum = 0;
		// 所有显示行的个数
		var allShowNum = 0;
		var isEnd = true;
		// 当前行要增加减去的row个数
		var cellTrNum = 0;
		var cellEnd = true;
		// 显示隐藏的行
		for (var i = trDom.length - 1; i > col_num; i--) {
			var hiddenRow = attr(trDom[i], 'hiddenRow');
			var hiddenCol = attr(trDom[i], 'hiddenCol');
			// 当隐藏行不是同级时不予显示
			if ((hiddenRow == null || (hiddenRow == row_num && hiddenCol == col_num)) && trDom[i].style.display == 'none') {
				trDom[i].style.display = '';
				isEnd = false;
				if (i < (col_num + rowSpan_prop))
					cellEnd = false;
				// 移出标记的隐藏行属性
				trDom[i].removeAttribute('hiddenRow');
				trDom[i].removeAttribute('hiddenCol');
				allShowNum++;
			}
			// 记录所有
			if (isEnd == true)
				showTrNum++;
			// 只记录当前
			if ((i < (col_num + rowSpan_prop)) && cellEnd == true) {
				cellTrNum++;
			}
		}
		// 节点的父节点集合
		var parentArr = [];
		// 左侧单元格
		for (var i = 0; i < trDom.length; i++) {
			var tdDom = trDom[i].getElementsByTagName('td');
			for (var j = 0; j < row_num; j++) {
				var pCol = parseInt(attr(tdDom[j], 'col'));
				var pRow = parseInt(attr(tdDom[j], 'row'));
				var pRowspan = parseInt(attr(tdDom[j], 'rowSpan_prop'), 10);
				if ((pCol <= col_num) && ((pCol + pRowspan) >= (col_num + rowSpan_prop)) && pRow < row_num) {
					// 插入节点
					parentArr.push(tdDom[j]);
					// 非ie
					if (!document.all) {
						tdDom[j].rowSpan += allShowNum;
					} else {
						// ie下最后一行需要重新计算rowspan
						if ((pCol + pRowspan) == (col_num + rowSpan_prop)) {
							tdDom[j].rowSpan = pRowspan - cellTrNum;
							// 判断左侧单元格的父节点是否也处于最下面一行
							if (parentArr.length > 1) {
								var PPdom = parentArr[parentArr.length - 2];
								var PPCol = parseInt(attr(PPdom, 'col'));
								var PPRowspan = parseInt(attr(PPdom, 'rowSpan_prop'), 10);
								if ((col_num + parseInt(cell.rowSpan)) == (PPCol + parseInt(PPdom.rowSpan))) {
									PPdom.rowSpan = parseInt(PPdom.rowSpan) + allShowNum;
								}
							}
						}
						// 当父节点折叠后，在ie下最上一层子节点折叠时需要改变父节点rowspan
						if (attr(tdDom[j], 'cos_row') == attr(cell, 'row') && attr(tdDom[j], 'cos_col') == attr(cell, 'col')) {
							tdDom[j].rowSpan = col_num - pCol + (rowSpan_prop - cellTrNum);
							var len = parentArr.length;
							if (len > 1) {
								for (var k = len - 1; k > 0; k--) {
									if (parentArr[k - 1]) {
										var pNum1 = parseInt(attr(parentArr[k], 'col')) + parseInt(attr(parentArr[k], 'rowSpan_prop'), 10);
										var pNum2 = parseInt(attr(parentArr[k - 1], 'col')) + parseInt(attr(parentArr[k - 1], 'rowSpan_prop'), 10);
										// 当父单元与子单元都在最下方时
										if (pNum1 == pNum2 || parentArr[k - 1].rowSpan == cell.rowSpan) {
											parentArr[k - 1].rowSpan = col_num - parseInt(attr(parentArr[len - 2], 'col')) + (rowSpan_prop - cellTrNum);
										}
									}
								}
							}
						}
					}
				}
			}
		}
		if (document.all) {
			cell.rowSpan = rowSpan_prop - cellTrNum;
			cell.removeAttribute("cos_row");
			cell.removeAttribute("cos_col");
		} else
			cell.rowSpan += allShowNum;
	}
}
// 表头折叠
function pucker_vertical(cell, collapse) {
	var colSpan = parseInt(cell.colSpan, 10);
	var row_number = parseInt(attr(cell, 'row'));
	var begin_row = row_number;
	var thead = cell.parentNode.parentNode;
	var tb = thead.parentNode;
	if (collapse === true) {
		attr(cell, 'preColSpan', cell.colSpan);
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
					if (attr(cell_, 'preColSpan'))
						attr(cell_, 'preColSpan', attr(cell_, 'preColSpan') - (colSpan - parseInt(cell.colSpan)));
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
		var preColSpan = parseInt(attr(cell, 'preColSpan'));
		// 上表头设置跨行属性
		for (var i = 0; i < cell.parentNode.rowIndex; i++) {
			var row = thead.children[i];
			for (var j = 0; j < row.cells.length; j++) {
				var cell_ = row.cells[j];
				var cell_row = parseInt(attr(cell_, 'row'));
				if (cell_row + parseInt(cell_.colSpan) >= row_number + colSpan || cell_row + parseInt(attr(cell_, 'factColSpan')) >= row_number + colSpan) {
					cell_.colSpan = cell_.colSpan + preColSpan - cell.colSpan;
					if (attr(cell_, 'preColSpan'))
						attr(cell_, 'preColSpan', parseInt(attr(cell_, 'preColSpan')) + (preColSpan - cell.colSpan));
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
					cell_.style.display = '';
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
					cell_.style.display = '';
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