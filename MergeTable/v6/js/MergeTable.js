/**
	已知浏览器bug，当存在多个thead/tbody/tfoot时，rowIndex不准确
**/
/**
	此版本加入：
	1.空行移除
	2.区域限制
**/
/**
	TODO 
	1.代码优化
	2.有bug，未复现
	3.单元格尺寸的计算（添加行、添加列）
	4.关于单元格被选中时的自定义样式（不仅是背景色，包括虚线边框，透明度等）
	5.实现绝对的正方形选区（而不是提示选区不正确显示红色）
**/
"use strict";

var MergeTable = window.MergeTable = (function() {
	var id;

	var utils = {
		// 获取右侧相邻的节点
		nextSibling: function(ele) {
			return ele.nextElementSibling || ele.nextSibling;
		},
		// 当前行的下一行
		nextRow: function(row) {
			var rows = this.fixedTableRows(row.parentNode.parentNode);
			var m = 0;
			for (var i = 0; i < rows.length; i++) {
				if (rows[i] === row) {
					m = i;
					break;
				}
			}
			if (rows[m + 1])
				return rows[m + 1];
			else
				return null;
		},
		// 添加事件
		attachEvent: function(cell) {
			AttachEvent(cell, "mousedown", onCellMouseDown, false);
			AttachEvent(cell, "mouseup", onCellMouseUp, false);
			AttachEvent(cell, "mouseover", onCellMouseOver, false);
		},
		// 单元格下标转对象
		index2Obj: function(index) {
			var arr = index.split(defaults.separator);
			return {
				// cellIndex
				y: parseInt(arr[0]),
				// rowIndex
				x: parseInt(arr[1])
			};
		},
		index2Region: function(index) {
			var arr = index.split(defaults.separator);
			return arr[2] + defaults.separator + arr[3];
		},
		firstChild: function(ele) {
			return ele.firstElementChild || ele.firstChild
		},
		fixedRowIndex: function(row) {
			var rows = this.fixedTableRows(row.parentNode.parentNode)
			for (var i = 0; i < rows.length; i++) {
				if (rows[i] === row)
					return i;
			}
		},
		fixedTableRows: function(table) {
			var cs = [];
			try {
				cs = Array.prototype.slice.call(table.children);
			} catch (e) {
				for (var i = 0; i < table.children.length; i++)
					cs.push(table.children[i]);
			}
			for (var i = 0; i < cs.length; i++) {
				if (cs[i].tagName.toLowerCase() === "tfoot") {
					var p = cs.slice(0, i);
					var t = cs.slice(i);
					cs = p.concat(t.reverse());
					break;
				}
			}
			var rows = [];
			for (var i = 0; i < cs.length; i++) {
				for (var j = 0; j < cs[i].children.length; j++)
					rows.push(cs[i].children[j]);
			}
			return rows;
		}
	};

	var defaults = {
		// 错误  
		wrong: "red",
		// 正确
		right: "green",
		// 点击单元格显示的颜色
		normal: "#e4e4e4",
		// 分隔符
		separator: "_",
		// 合并单元格提示信息
		mergeMsg: "请选择有效的单元格进行合并!",
		// 合并单元格时是否保存被销毁的单元格的内容
		retainMergeText: true,
		// 单元格垂直拆分提示信息
		splitVMsg: "当前单元格无法进行横向拆分!",
		// 单元格水平拆分提示信息
		splitHMsg: "当前单元格无法进行纵向拆分!",
		// 只能选择一个单元格提示信息
		oneSelectedMsg: "只能选择一个单元格!",
		// 删除行提示
		deleteRowMsg: "请选择有效行进行删除!",
		// 删除列提示
		deleteColMsg: "请选择有效列进行删除!",
		// 没有选择任何单元格
		selectionNullMsg: "请选择单元格!",
		// 采用格式刷时单元格的样式(选区正确)
		brushright: '2px dashed green',
		// 空行是否移除
		nullRowRomoved: true,
		// 行不存在提示
		noRowExist: "对不起，行不存在!"
	};

	// 数据存储
	var persist = {
		// 单元格二维数组
		storage: [],
		// 表格初始化中colSpan 或 rowSpan大于1的单元格的数组占位
		place: [],
		// 当前被选择的单元格下标数组
		selection: [],
		// 当前处于编辑状态的单元格下标
		edition: {},
		// 被选择的单元格的范围
		range: {
			// 开始单元格，鼠标按下时的单元格下标
			start: null,
			// 结束单元格，鼠标抬起时的单元格下标
			end: null
		},
		// 鼠标
		mouse: {
			// 鼠标状态 -1表示鼠标抬起 ， 0 表示鼠标按下
			status: -1
		},
		// 被选择的单元个的样式缓存
		// TODO 。。。
		css: {},
		// 格式刷
		brush: {
			// 格式刷不可用-1 ， 使用中0
			status: -1,
			// 格式单元格未选择-1 ， 已经选择0
			selected: -1,
			// 格式单元格样式
			selectedCss: {}
		}
	};

	// 获取同行前置不为空的单元格
	function getPreviousSiblingStorageElementNotNull(y, x) {
		var x_ = x - 1;
		if (x_ >= 0) {
			while (!persist.storage[y][x_]) {
				x_--;
				if (x_ < 0)
					break;
			}
		}
		// 返回的结果可能为null ， 所以在调用后还是需要进行判断
		return persist.storage[y][x_];
	};

	// 转换二维数组
	function selectionTrans2ArrayStack() {
		var selection2Array = [];
		// 遍历被选择的单元格的下标数组
		for (var i = 0; i < persist.selection.length; i++) {
			// 拆分单元格下标
			var y = persist.selection[i].split(defaults.separator)[0];
			// 建立数组
			if (!selection2Array[y])
				selection2Array[y] = [];
			// 插入单元格下标值
			selection2Array[y].push(persist.selection[i]);
		}
		// 单元格数组
		var selection2ArrayStack = [];
		// 初始索引为0
		var index = 0;
		for (var i in selection2Array) {
			selection2ArrayStack[index] = selection2Array[i];
			index++;
		}
		return selection2ArrayStack;
	};

	// 合并单元格
	function merge() {
		// 单元格是否可以合并
		if (checkMerge()) {
			var selection2ArrayStack = selectionTrans2ArrayStack();
			// 总共跨列数
			var totalColSpan = 0;
			// 总共跨行数
			var totalRowSpan = 0;
			// 文本
			var text = "";
			// 遍历单元格
			for (var i = 0; i < selection2ArrayStack[0].length; i++) {
				// 拆分下标获取单元格
				var arr = selection2ArrayStack[0][i].split(defaults.separator);
				var y = arr[0];
				var x = arr[1];
				// 如果单元格存在
				if (persist.storage[y][x])
				// 跨列增加
					totalColSpan += persist.storage[y][x].colSpan;
			}
			// 遍历单元格
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					if (persist.storage[y][x]) {
						// 如果需要保存文本
						if (defaults.retainMergeText)
						// 文本连接
							text += persist.storage[y][x].innerHTML.Trim();
						// 如果是第一列
						if (j === 0) {
							// 跨行数增加
							totalRowSpan += persist.storage[y][x].rowSpan;
							// 如果单元格跨行数大于1
							if (selection2ArrayStack[i][0].rowSpan > 1)
							// 跳过中间行
								i = i + persist.storage[y][x].rowSpan - 1;
						}
					}
				}
			}
			// 选区置空
			persist.selection = [];
			// 遍历
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					// 如果单元格存在
					if (persist.storage[y][x]) {
						// 选中区左上角单元格
						if (i === 0 && j === 0) {
							// 添加到选区数组
							persist.selection.push(selection2ArrayStack[i][j]);
							persist.storage[y][x].rowSpan = totalRowSpan;
							persist.storage[y][x].colSpan = totalColSpan;
							// 如果保留文本
							if (defaults.retainMergeText)
								persist.storage[y][x].innerHTML = text.Trim();
							// 还原背景色
							persist.storage[y][x].style.backgroundColor = defaults.normal;
							// TODO style.width and style.height
							// 设置选区开始
							persist.range.start = selection2ArrayStack[i][j];
							// 设置选区结束
							persist.range.end = selection2ArrayStack[i][j];
						} else {
							// 移除单元格
							persist.storage[y][x].parentNode.removeChild(persist.storage[y][x]);
							// 设置对应下标的单元格为空
							persist.storage[y][x] = null;
						}
					}
				}
			}
		} else {
			// 提示错误信息
			alert(defaults.mergeMsg);
			return;
		}
	};

	// 清除单元格的格式，完全拆分
	function clearMerge() {
		// 当前是否只选择了一个单元格
		if (checkSelectionOne()) {
			var obj = utils.index2Obj(persist.range.start);
			// 完全拆分单元格操作
			clearMergeHandler(obj.y, obj.x);
		} else {
			// 提示错误信息
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	// 完全拆分单元格的操作
	function clearMergeHandler(y, x) {
		// 下一行
		var nextRow = null;
		// 单元格
		var cell = persist.storage[y][x];
		// 遍历跨行
		for (var i = 0; i < cell.rowSpan; i++) {
			if (i === 0)
				nextRow = cell.parentNode;
			else
				nextRow = utils.nextRow(nextRow);
			// 跨列遍历
			for (var j = 0; j < cell.colSpan; j++) {
				if (j === 0 && i === 0)
					continue;
				else {
					// 创建单元格并插入
					var insertCell = document.createElement(cell.tagName.toLowerCase());
					// 获取前置单元格
					var previousElement = getPreviousSiblingStorageElementNotNull(y + i, x + j);
					// 如果存在
					if (previousElement) {
						// 获取后置单元格
						if (utils.nextSibling(previousElement))
							nextRow.insertBefore(insertCell, utils.nextSibling(previousElement));
						else
							nextRow.appendChild(insertCell);
					} else {
						if (utils.firstChild(nextRow))
							nextRow.insertBefore(insertCell, utils.firstChild(nextRow))
						else
							nextRow.appendChild(insertCell);
					}
					// 缓存
					persist.storage[y + i][x + j] = insertCell;
					// 添加事件
					utils.attachEvent(insertCell);
				}
			}
		}
		cell.rowSpan = 1;
		cell.colSpan = 1;
	};

	// 检查单元格是否可以被完全拆分
	function checkMerge() {
		if (checkSelection() && persist.selection.length > 1)
			return true;
		else
			return false;
	};

	// 横拆操作
	function splitVHandler(y, x) {
		// 获取单元格
		var cell = persist.storage[y][x];
		var colSpan_ = cell.colSpan;
		var rowSpan_ = cell.rowSpan;

		var rowSpan1;
		var rowSpan2;
		if (rowSpan_ % 2 === 0) {
			rowSpan1 = rowSpan_ / 2;
			rowSpan2 = rowSpan_ / 2;

		} else {
			rowSpan1 = rowSpan_ - 1;
			rowSpan2 = 1;
		}
		cell.rowSpan = rowSpan1;
		var insertCell = document.createElement(cell.tagName.toLowerCase());
		insertCell.colSpan = colSpan_;
		insertCell.rowSpan = rowSpan2;
		var nextRowIndex = y + rowSpan1;
		var i = x - 1;
		while (persist.storage[nextRowIndex][i] === null)
			i--;
		if (i >= 0) {
			var beforeCell = persist.storage[nextRowIndex][i];
			if (beforeCell) {
				if (utils.nextSibling(beforeCell))
					beforeCell.parentNode.insertBefore(insertCell, utils.nextSibling(beforeCell));
				else
					beforeCell.parentNode.appendChild(insertCell);
			} else {
				utils.nextRow(cell.parentNode).insertBefore(insertCell, utils.firstChild(utils.nextRow(cell.parentNode)));
			}
		} else if (i === -1) {
			var nextTr;
			var rowSpan1_ = rowSpan1;
			while (rowSpan1_ >= 1) {
				if (!nextTr)
					nextTr = utils.nextRow(cell.parentNode);
				else
					nextTr = utils.nextRow(nextTr);
				rowSpan1_--;
			}
			nextTr.insertBefore(insertCell, utils.firstChild(nextTr));
		}
		utils.attachEvent(insertCell);
		persist.storage[nextRowIndex][x] = insertCell;
	};

	function splitV() {
		if (checkSplitV()) {
			var obj = utils.index2Obj(persist.range.start);
			splitVHandler(obj.y, obj.x);
		} else {
			alert(defaults.splitVMsg);
			return;
		}
	};

	function splitHHandler(y, x) {
		var cell = persist.storage[y][x];
		var colSpan_ = cell.colSpan;
		var rowSpan_ = cell.rowSpan;

		var colSpan1;
		var colSpan2;
		if (colSpan_ % 2 === 0) {
			colSpan1 = colSpan_ / 2;
			colSpan2 = colSpan_ / 2;

		} else {
			colSpan1 = colSpan_ - 1;
			colSpan2 = 1;
		}
		cell.colSpan = colSpan1;
		var insertCell = document.createElement(cell.tagName.toLowerCase());
		insertCell.colSpan = colSpan2;
		insertCell.rowSpan = rowSpan_;
		// appendChild?
		cell.parentNode.insertBefore(insertCell, utils.nextSibling(cell));
		utils.attachEvent(insertCell);
		persist.storage[y][x + colSpan1] = insertCell;
	};

	function splitH() {
		if (checkSplitH()) {
			var obj = utils.index2Obj(persist.range.start);
			splitHHandler(obj.y, obj.x);
		} else {
			alert(defaults.splitHMsg);
			return;
		}
	};

	function addRowTopHandler(y, x) {
		var cell = persist.storage[y][x];
		var len = persist.storage[y].length;
		// TODO 添加多行
		var insertStorage = [];
		insertStorage[0] = [];
		var insertRow = document.createElement(cell.parentNode.tagName.toLowerCase());
		cell.parentNode.parentNode.insertBefore(insertRow, cell.parentNode);
		if (y === 0) {
			for (var i = 0; i < len; i++) {
				var insertCell = document.createElement(cell.tagName.toLowerCase());
				insertRow.appendChild(insertCell);
				insertStorage[0][i] = insertCell;
				utils.attachEvent(insertCell);
			}
			persist.storage = insertStorage.concat(persist.storage);
		} else {
			var preRowIndex = y - 1;
			for (var i = 0; i < persist.storage[preRowIndex].length; i++) {
				if (persist.storage[preRowIndex][i]) {
					if (persist.storage[preRowIndex][i].rowSpan > 1) {
						insertStorage[0][i] = null;
						persist.storage[preRowIndex][i].rowSpan++;
						if (persist.storage[preRowIndex][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex][i].colSpan; k++) {
								insertStorage[0][i + k] = null;
							}
							i += persist.storage[preRowIndex][i].colSpan - 1;
						}
					} else {
						var insertCell = document.createElement(cell.tagName.toLowerCase());
						insertRow.appendChild(insertCell);
						insertStorage[0][i] = insertCell;
						utils.attachEvent(insertCell);
						if (persist.storage[preRowIndex][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex][i].colSpan; k++) {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i + k] = insertCell;
								utils.attachEvent(insertCell);
							}
							i += persist.storage[preRowIndex][i].colSpan - 1;
						}
					}
				} else {
					insertStorage[0][i] = null;
					var preRowIndex_ = preRowIndex;
					while (!persist.storage[preRowIndex_][i])
						preRowIndex_--;
					if (persist.storage[preRowIndex_][i].rowSpan + preRowIndex_ > y) {
						persist.storage[preRowIndex_][i].rowSpan++;
						if (persist.storage[preRowIndex_][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex_][i].colSpan; k++) {
								insertStorage[0][i + k] = null;
							}
							i += persist.storage[preRowIndex_][i].colSpan - 1;
						}
					} else {
						for (var k = 0; k < persist.storage[preRowIndex_][i].colSpan; k++) {
							var insertCell = document.createElement(cell.tagName.toLowerCase());
							insertRow.appendChild(insertCell);
							insertStorage[0][i + k] = insertCell;
							utils.attachEvent(insertCell);
						}
						i += persist.storage[preRowIndex_][i].colSpan - 1;
					}
				}
			}
			persist.storage.splice(y, 0, insertStorage[0]);
		}
		persist.range.start = y + 1 + defaults.separator + x + defaults.separator + getIndexByElement(cell.parentNode.parentNode);
		persist.selection = [persist.range.start];
	};

	function addRowTop() {
		if (checkSelectionOne()) {
			var obj = utils.index2Obj(persist.range.start);
			addRowTopHandler(obj.y, obj.x);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function addRowBottomHandler(y, x) {
		var cell = persist.storage[y][x];
		var rowNum = persist.storage.length;
		var len = persist.storage[y].length;
		// TODO 添加多行
		var insertStorage = [];
		insertStorage[0] = [];
		var insertRow = document.createElement(cell.parentNode.tagName.toLowerCase());
		if (!utils.nextRow(cell.parentNode))
			cell.parentNode.parentNode.appendChild(insertRow);
		else {
			var index_ = y + cell.rowSpan;
			var nextSiblingTr;
			while (index_ !== y) {
				if (!nextSiblingTr)
					nextSiblingTr = utils.nextRow(cell.parentNode);
				else
					nextSiblingTr = utils.nextRow(nextSiblingTr);
				index_--;
			}
			if(nextSiblingTr.parentNode !== cell.parentNode.parentNode)
				cell.parentNode.parentNode.appendChild(insertRow);
			else
				cell.parentNode.parentNode.insertBefore(insertRow, nextSiblingTr);
		}
		if (y === rowNum - 1) {
			for (var i = 0; i < len; i++) {
				var insertCell = document.createElement(cell.tagName.toLowerCase());
				insertRow.appendChild(insertCell);
				insertStorage[0][i] = insertCell;
				utils.attachEvent(insertCell);
			}
			persist.storage = persist.storage.concat(insertStorage);
		} else {
			var preRowIndex = y + cell.rowSpan - 1;
			for (var i = 0; i < persist.storage[preRowIndex].length; i++) {
				if (persist.storage[preRowIndex][i]) {
					if (persist.storage[preRowIndex][i].rowSpan > 1) {
						insertStorage[0][i] = null;
						persist.storage[preRowIndex][i].rowSpan++;
						if (persist.storage[preRowIndex][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex][i].colSpan; k++) {
								insertStorage[0][i + k] = null;
							}
							i += persist.storage[preRowIndex][i].colSpan - 1;
						}
					} else {
						var insertCell = document.createElement(cell.tagName.toLowerCase());
						insertRow.appendChild(insertCell);
						insertStorage[0][i] = insertCell;
						utils.attachEvent(insertCell);
						if (persist.storage[preRowIndex][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex][i].colSpan; k++) {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i + k] = insertCell;
								utils.attachEvent(insertCell);
							}
							i += persist.storage[preRowIndex][i].colSpan - 1;
						}
					}
				} else {
					insertStorage[0][i] = null;
					var preRowIndex_ = preRowIndex;
					while (!persist.storage[preRowIndex_][i])
						preRowIndex_--;
					if (persist.storage[preRowIndex_][i].rowSpan + preRowIndex_ - 1 === preRowIndex) {
						var insertCell = document.createElement(cell.tagName.toLowerCase());
						insertRow.appendChild(insertCell);
						insertStorage[0][i] = insertCell;
						utils.attachEvent(insertCell);
						if (persist.storage[preRowIndex_][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex_][i].colSpan; k++) {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i + k] = insertCell;
								utils.attachEvent(insertCell);
							}
							i += persist.storage[preRowIndex_][i].colSpan - 1;
						}
					} else {
						persist.storage[preRowIndex_][i].rowSpan++;
						if (persist.storage[preRowIndex_][i].colSpan > 1) {
							for (var k = 1; k < persist.storage[preRowIndex_][i].colSpan; k++) {
								insertStorage[0][i + k] = null;
							}
							i += persist.storage[preRowIndex_][i].colSpan - 1;
						}
					}
				}
			}
			persist.storage.splice(preRowIndex + 1, 0, insertStorage[0]);
		}
	};

	function addRowBottom() {
		if (checkSelectionOne()) {
			var obj = utils.index2Obj(persist.range.start);
			addRowBottomHandler(obj.y, obj.x);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function deleteRowHandler(y, x, removeRow) {
		var cell = persist.storage[y][x];
		for (var m = 0; m < persist.storage[y].length; m++) {
			var mergeCell = persist.storage[y][m];
			if (mergeCell) {
				if (mergeCell.rowSpan > 1) {
					var nextRow = null;
					for (var i = 1; i < mergeCell.rowSpan; i++) {
						if (!nextRow)
							nextRow = utils.nextRow(mergeCell.parentNode);
						else
							nextRow = utils.nextRow(nextRow);
						var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
						if (m === 0) {
							nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
						} else {
							var l = 0;
							var preCell = persist.storage[y + i][m - 1];
							while (!preCell) {
								l++;
								if (m - 1 - l < 0) {
									preCell = utils.firstChild(nextRow);
								} else
									preCell = persist.storage[y + i][m - 1 - l];
							}
							nextRow.insertBefore(insertCell, utils.nextSibling(preCell));
						}
						utils.attachEvent(insertCell);
						persist.storage[y + i][m] = insertCell;
					}
				}
				if (mergeCell.colSpan > 1) {
					var nextRow = null;
					for (var i = 1; i < mergeCell.rowSpan; i++) {
						if (!nextRow)
							nextRow = utils.nextRow(mergeCell.parentNode);
						else
							nextRow = utils.nextRow(nextRow);
						for (var j = 0; j < mergeCell.colSpan - 1; j++) {
							var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
							nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[y + i][m + j]));
							persist.storage[y + i][m + j + 1] = insertCell;
							utils.attachEvent(insertCell);
						}
					}
				}
			} else {
				var preRowIndex = y - 1;
				if (preRowIndex !== -1) {
					while (!persist.storage[preRowIndex][m]) {
						preRowIndex--;
						if (preRowIndex === -1)
							break;
					}
				}
				if (preRowIndex !== -1) {
					if (persist.storage[preRowIndex][m]) {
						if (persist.storage[preRowIndex][m].rowSpan > 1) {
							persist.storage[preRowIndex][m].rowSpan--;
							if (persist.storage[preRowIndex][m].colSpan > 1) {
								m += persist.storage[preRowIndex][m].colSpan - 1;
							}
						} else {
							if (m > 0) {
								if (persist.storage[y][m - 1]) {
									// 需要考虑到赋值之后发生自增的情况
									m += persist.storage[y][m - 1].colSpan - 1 - 1;
								} else {
									var preRowIndex_ = y - 1;
									if (preRowIndex_ !== -1) {
										while (!persist.storage[preRowIndex_][m - 1]) {
											preRowIndex_--;
											if (preRowIndex_ === -1)
												break;
										}
									}
									if (persist.storage[preRowIndex_][m - 1]) {
										persist.storage[preRowIndex_][m - 1].rowSpan--;
										m += persist.storage[preRowIndex_][m - 1].colSpan -

										2;
									}
								}
							}
						}
					}
				} else { // 需要考虑到赋值之后发生自增的情况
					m += persist.storage[y][m - 1].colSpan - 1 - 1;
				}
			}
		}
		persist.storage.splice(y, 1);
		persist.start = null;
		persist.selection = [];
		// 如果要删除行
		if (removeRow === true) {
			// 获取行
			var row = getRow(y);
			// 删除
			row.parentNode.removeChild(row);
		} else
		// 删除单元格
			cell.parentNode.parentNode.removeChild(cell.parentNode);
	};

	function deleteRow() {
		if (checkSelection()) {
			var selection2ArrayStack = selectionTrans2ArrayStack();
			var y;
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				var obj = utils.index2Obj(selection2ArrayStack[i][0]);
				if (i === 0)
					y = obj.y;
				deleteRowHandler(y, obj.x);
			}
		} else {
			alert(defaults.deleteRowMsg);
			return;
		}
	};

	function deleteColHandler(y, x) {
		for (var i = 0; i < persist.storage.length; i++) {
			var mergeCell = persist.storage[i][x];
			if (mergeCell) {
				if (mergeCell.colSpan > 1) {
					var currentCell = null;
					for (var m = 1; m < mergeCell.colSpan; m++) {
						var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
						if (!currentCell)
							currentCell = utils.nextSibling(mergeCell);
						if (currentCell)
							mergeCell.parentNode.insertBefore(insertCell, currentCell);
						else
							mergeCell.parentNode.appendChild(insertCell);
						currentCell = insertCell;
						persist.storage[i][x + mergeCell.colSpan - m] = insertCell;
						utils.attachEvent(insertCell);
					}
				}
				if (mergeCell.rowSpan > 1) {
					if (mergeCell.colSpan > 1) {
						var nextRow = null;
						for (var n = 1; n < mergeCell.rowSpan; n++) {
							if (!nextRow)
								nextRow = utils.nextRow(mergeCell.parentNode);
							else
								nextRow = utils.nextRow(nextRow);
							for (var j = 0; j < mergeCell.colSpan - 1; j++) {
								var x_ = x;
								if (x_ >= 0) {
									while (!persist.storage[i + n][x_ - 1]) {
										x_--;
										if (x_ - 1 < 0)
											break;
									}
								}
								var insertCell = document.createElement

								(mergeCell.tagName.toLowerCase());
								if (persist.storage[i + n][x_ - 1]) {
									if (utils.nextSibling(persist.storage[i + n][x_ - 1])) {
										nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + n][x_ - 1]));
										persist.storage[i + n][x + mergeCell.colSpan - 1 - j] = insertCell;
									} else {
										nextRow.appendChild(insertCell);
										persist.storage[i + n][x + mergeCell.colSpan - 1] = insertCell;
									}
								} else {
									if (utils.firstChild(nextRow))
										nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
									else
										nextRow.appendChild(insertCell);
									persist.storage[i + n][x + mergeCell.colSpan - j - 1] =

									insertCell;
								}
								utils.attachEvent(insertCell);
							}
						}
					}
				}
				persist.storage[i].splice(x, 1);
				mergeCell.parentNode.removeChild(mergeCell);
			} else {
				var flag = false;
				var x_ = x;
				if (x_ >= 0) {
					while (!persist.storage[i][x_]) {
						x_--;
						if (x_ < 0)
							break;
					}
				}
				if (x_ >= 0) {
					var rowSpan_ = persist.storage[i][x_].rowSpan;
					if (persist.storage[i][x_].colSpan + x_ > x) {
						if (persist.storage[i][x_].colSpan > 1) {
							persist.storage[i][x_].colSpan--;
							if (rowSpan_ > 1) {
								for (var b = 1; b < rowSpan_; b++) {
									persist.storage[i + b].splice(x, 1);
								}
								i += rowSpan_ - 1;
							} else {
								flag = true;
							}
							persist.storage[i - rowSpan_ + 1].splice(x, 1);
						}
					}
				}
				if (flag === false)
					persist.storage[i].splice(x, 1);
			}
		}
		persist.start = null;
		persist.selection = [];
	};

	function deleteCol() {
		if (checkSelection()) {
			var y;
			var x;
			var selection2ArrayStack = selectionTrans2ArrayStack();
			for (var i = 0; i < selection2ArrayStack[0].length; i++) {
				var obj = utils.index2Obj(selection2ArrayStack[0][i]);
				if (i === 0) {
					y = obj.y;
					x = obj.x;
				}
				deleteColHandler(y, x);
			}
		} else {
			alert(defaults.deleteColMsg);
			return;
		}
	};

	function addColLeftHandler(y, x, arr) {
		var cell = persist.storage[y][x];
		if (x === 0) {
			var nextRow = null;
			for (var i = 0; i < persist.storage.length; i++) {
				if (i === 0)
					nextRow = persist.storage[i][0].parentNode;
				else
					nextRow = utils.nextRow(nextRow);
				var insertCell = document.createElement(cell.tagName.toLowerCase());
				if (utils.firstChild(nextRow))
					nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
				else
					nextRow.appendChild(insertCell);
				persist.storage[i].splice(0, 0, insertCell);
				utils.attachEvent(insertCell);
			}
			persist.range.start = y + defaults.separator + (x + 1) + defaults.separator + getIndexByElement(cell.parentNode.parentNode);
			persist.selection = [persist.range.start];
		} else {
			var p_x = x - 1;
			if (p_x >= 0) {
				while (!persist.storage[y][p_x]) {
					p_x--;
					if (p_x < 0)
						break;
				}
			}
			if (persist.storage[y][p_x]) {
				x = p_x;
				cell = persist.storage[y][p_x];
				var x_ = null;
				for (var i = 0; i < persist.storage.length; i++) {

					var isColMerge = false;
					var mergeCell = persist.storage[i][x];
					if (x_ === null)
						x_ = x + cell.colSpan;
					if (mergeCell) {
						if (mergeCell.colSpan + x < x_) {
							for (var j = 0; j < persist.storage[i].length; j++) {
								if (persist.storage[i][j] && persist.storage[i][j].colSpan + j >=

									x_) {
									mergeCell = persist.storage[i][j];
									x = j;
									break;
								}
							}
							if (mergeCell.colSpan + x > x_)
								isColMerge = true;
							else
								isColMerge = false;
						} else if (mergeCell.colSpan + x > x_) {
							isColMerge = true;
						}
						if (isColMerge === false) {
							var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
							utils.attachEvent(insertCell);
							if (utils.nextSibling(mergeCell))
								mergeCell.parentNode.insertBefore(insertCell, utils.nextSibling(mergeCell));
							else
								mergeCell.parentNode.appendChild(insertCell);
							persist.storage[i].splice(x_, 0, insertCell);
							if (mergeCell.rowSpan > 1) {
								var nextRow = null;
								for (var k = 1; k < mergeCell.rowSpan; k++) {
									var insertCell = document.createElement

									(mergeCell.tagName.toLowerCase());
									utils.attachEvent(insertCell);
									if (!nextRow)
										nextRow = utils.nextRow(mergeCell.parentNode);
									else
										nextRow = utils.nextRow(nextRow);
									var x_1 = x_ - 1;
									if (x_1 >= 0) {
										while (!persist.storage[i + k][x_1]) {
											x_1--;
											if (x_1 < 0)
												break;
										}
									}
									if (persist.storage[i + k][x_1]) {
										if (utils.nextSibling(persist.storage[i + k][x_1]))
											nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + k][x_1]));
										else
											nextRow.appendChild(insertCell);
									} else {
										if (utils.firstChild(nextRow))
											nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
										else
											nextRow.appendChild(insertCell);
									}
									persist.storage[i + k].splice(x_, 0, insertCell);
								}
								i += mergeCell.rowSpan - 1;
							}
						} else {
							persist.storage[i].splice(x_, 0, null);
							if (mergeCell.rowSpan > 1) {
								var nextRow = null;
								for (var k = 1; k < mergeCell.rowSpan; k++) {
									persist.storage[i + k].splice(x_, 0, null);
								}
								i += mergeCell.rowSpan - 1;
							}
							mergeCell.colSpan++;
						}
					} else {
						var xx_ = x;
						if (xx_ >= 0) {
							while (!persist.storage[i][xx_]) {
								xx_--;
								if (xx_ < 0)
									break;
							}
						}
						if (persist.storage[i][xx_]) {
							if (xx_ === p_x) {
								var nextRow = null;
								for (var o = 0; o < persist.storage[i][xx_].rowSpan; o++) {
									if (o === 0)
										nextRow = persist.storage[i][xx_].parentNode;
									else {
										if (nextRow)
											nextRow = utils.nextRow(nextRow);
									}
									var insertCell = document.createElement(persist.storage[i]

										[xx_].tagName.toLowerCase());
									utils.attachEvent(insertCell);
									if (o === 0) {
										if (utils.nextSibling(persist.storage[i + o][xx_]))
											nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + o][xx_]));
										else
											nextRow.appendChild(insertCell);
									} else {
										var preX = xx_;
										if (preX > 0) {
											while (!persist.storage[i + o][preX]) {
												preX--;
												if (preX < 0)
													break;
											}
										}
										if (persist.storage[i + o][preX]) {
											if (utils.nextSibling(persist.storage[i + o][preX]))
												nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + o][preX]));
											else
												nextRow.appendChild(insertCell);
										} else {
											if (utils.firstChild(nextRow))
												nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
											else
												nextRow.appendChild(insertCell);
										}
									}
									persist.storage[i + o].splice(xx_ + persist.storage[i]

										[xx_].colSpan, 0, insertCell);
								}
								i += persist.storage[i][xx_].rowSpan - 1;
							} else {
								persist.storage[i].splice(x_, 0, null);
								if (persist.storage[i][xx_].rowSpan > 1) {
									for (var k = 1; k < persist.storage[i][xx_].rowSpan; k++) {
										persist.storage[i + k].splice(x_, 0, null);
									}
								}
								persist.storage[i][xx_].colSpan++;
								i += persist.storage[i][xx_].rowSpan - 1;
							}
						}
					}
				}
			}
			persist.range.start = y + defaults.separator + (parseInt(arr[1]) + 1) + defaults.separator + getIndexByElement(cell.parentNode.parentNode);
			persist.selection = [persist.range.start];
		}

	};

	function addColLeft() {
		if (checkSelectionOne()) {
			var obj = utils.index2Obj(persist.range.start);
			addColLeftHandler(obj.y, obj.x, [obj.y, obj.x]);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function addColRightHandler(y, x, arr) {
		var cell = persist.storage[y][x];
		var x_ = null;
		for (var i = 0; i < persist.storage.length; i++) {
			var isColMerge = false;
			var mergeCell = persist.storage[i][x];
			if (x_ === null)
				x_ = x + cell.colSpan;
			if (mergeCell) {
				if (mergeCell.colSpan + x < x_) {
					for (var j = 0; j < persist.storage[i].length; j++) {
						if (persist.storage[i][j] && persist.storage[i][j].colSpan + j >= x_) {
							mergeCell = persist.storage[i][j];
							x = j;
							break;
						}
					}
					if (mergeCell.colSpan + x > x_)
						isColMerge = true;
					else
						isColMerge = false;
				} else if (mergeCell.colSpan + x > x_) {
					isColMerge = true;
				}
				if (isColMerge === false) {
					var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
					utils.attachEvent(insertCell);
					if (utils.nextSibling(mergeCell))
						mergeCell.parentNode.insertBefore(insertCell, utils.nextSibling(mergeCell));
					else
						mergeCell.parentNode.appendChild(insertCell);
					persist.storage[i].splice(x_, 0, insertCell);
					if (mergeCell.rowSpan > 1) {
						var nextRow = null;
						for (var k = 1; k < mergeCell.rowSpan; k++) {
							var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
							utils.attachEvent(insertCell);
							if (!nextRow)
								nextRow = utils.nextRow(mergeCell.parentNode);
							else
								nextRow = utils.nextRow(nextRow);
							var x_1 = x_ - 1;
							if (x_1 >= 0) {
								while (!persist.storage[i + k][x_1]) {
									x_1--;
									if (x_1 < 0)
										break;
								}
							}
							if (persist.storage[i + k][x_1]) {
								if (utils.nextSibling(persist.storage[i + k][x_1]))
									nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + k][x_1]));
								else
									nextRow.appendChild(insertCell);
							} else {
								if (utils.firstChild(nextRow))
									nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
								else
									nextRow.appendChild(insertCell);
							}
							persist.storage[i + k].splice(x_, 0, insertCell);
						}
						i += mergeCell.rowSpan - 1;
					}
				} else {
					persist.storage[i].splice(x_, 0, null);
					if (mergeCell.rowSpan > 1) {
						var nextRow = null;
						for (var k = 1; k < mergeCell.rowSpan; k++) {
							persist.storage[i + k].splice(x_, 0, null);
						}
						i += mergeCell.rowSpan - 1;
					}
					mergeCell.colSpan++;
				}
			} else {
				var xx_ = x;
				if (xx_ >= 0) {
					while (!persist.storage[i][xx_]) {
						xx_--;
						if (xx_ < 0)
							break;
					}
				}
				if (persist.storage[i][xx_]) {
					if (xx_ === parseInt(arr[1])) {
						var nextRow = null;
						for (var o = 0; o < persist.storage[i][xx_].rowSpan; o++) {
							if (o === 0)
								nextRow = persist.storage[i][xx_].parentNode;
							else {
								if (nextRow)
									nextRow = utils.nextRow(nextRow);
							}
							var insertCell = document.createElement(persist.storage[i]

								[xx_].tagName.toLowerCase());
							utils.attachEvent(insertCell);
							if (o === 0) {
								if (utils.nextSibling(persist.storage[i + o][xx_]))
									nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + o][xx_]));
								else
									nextRow.appendChild(insertCell);
							} else {
								var preX = xx_;
								if (preX > 0) {
									while (!persist.storage[i + o][preX]) {
										preX--;
										if (preX < 0)
											break;
									}
								}
								if (persist.storage[i + o][preX]) {
									if (utils.nextSibling(persist.storage[i + o][preX]))
										nextRow.insertBefore(insertCell, utils.nextSibling(persist.storage[i + o][preX]));
									else
										nextRow.appendChild(insertCell);
								} else {
									if (utils.firstChild(nextRow))
										nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
									else
										nextRow.appendChild(insertCell);
								}
							}
							persist.storage[i + o].splice(xx_ + persist.storage[i][xx_].colSpan, 0,

								insertCell);
						}
						i += persist.storage[i][xx_].rowSpan - 1;
					} else {
						persist.storage[i].splice(x_, 0, null);
						if (persist.storage[i][xx_].rowSpan > 1) {
							for (var k = 1; k < persist.storage[i][xx_].rowSpan; k++) {
								persist.storage[i + k].splice(x_, 0, null);
							}
						}
						persist.storage[i][xx_].colSpan++;
						i += persist.storage[i][xx_].rowSpan - 1;
					}
				}
			}
		}
	};

	function addColRight() {
		if (checkSelectionOne()) {
			var obj = utils.index2Obj(persist.range.start);
			addColRightHandler(obj.y, obj.x, [obj.y, obj.x]);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function checkSplitH() {
		var obj = utils.index2Obj(persist.range.start);
		var cell = persist.storage[obj.y][obj.x];
		var colSpan_ = cell.colSpan;
		if (checkSelectionOne() && colSpan_ > 1)
			return true;
		else
			return false;
	};

	function checkSplitV() {
		var obj = utils.index2Obj(persist.range.start);
		var cell = persist.storage[obj.y][obj.x];
		var rowSpan_ = cell.rowSpan;
		if (checkSelectionOne() && rowSpan_ > 1)
			return true;
		else
			return false;
	};

	// 清除数据保存
	function clear() {
		persist.storage = [];
		persist.place = [];
		persist.selection = [];
		persist.edition = {};
		persist.range = {};
		persist.mouse.status = -1;
	};

	function getRange() {
		if (persist.range.start && persist.range.end) {
			var startArray = persist.range.start.split(defaults.separator);
			var startCoords = {
				y: parseInt(startArray[0]),
				x: parseInt(startArray[1])
			};
			var endArray = persist.range.end.split(defaults.separator);
			var endCoords = {
				y: parseInt(endArray[0]),
				x: parseInt(endArray[1])
			};
			var minX;
			var maxX;
			var minY;
			var maxY;
			if (startCoords.x > endCoords.x) {
				maxX = startCoords.x + persist.storage[startCoords.y][startCoords.x].colSpan - 1;
				minX = endCoords.x;
			} else if (startCoords.x < endCoords.x) {
				maxX = endCoords.x + persist.storage[endCoords.y][endCoords.x].colSpan - 1;
				minX = startCoords.x;
			} else {
				if (startCoords.y > endCoords.y) {
					maxX = startCoords.x + persist.storage[startCoords.y][startCoords.x].colSpan - 1;
					minX = endCoords.x;
				} else if (startCoords.y < endCoords.y) {
					maxX = endCoords.x + persist.storage[endCoords.y][endCoords.x].colSpan - 1;
					minX = startCoords.x;
				} else
					minX = maxX = startCoords.x;
			}
			if (startCoords.y > endCoords.y) {
				maxY = startCoords.y + persist.storage[startCoords.y][startCoords.x].rowSpan - 1;
				minY = endCoords.y;
			} else if (startCoords.y < endCoords.y) {
				maxY = endCoords.y + persist.storage[endCoords.y][endCoords.x].rowSpan - 1;
				minY = startCoords.y;
			} else {
				if (startCoords.x > endCoords.x) {
					maxY = startCoords.y + persist.storage[startCoords.y][startCoords.x].rowSpan - 1;
					minY = endCoords.y;
				} else if (startCoords.x < endCoords.x) {
					maxY = endCoords.y + persist.storage[endCoords.y][endCoords.x].rowSpan - 1;
					minY = startCoords.y;
				} else
					minY = maxY = startCoords.y;
			}
			// TODO 条件判断不充分
			return {
				minX: minX,
				maxX: maxX,
				minY: minY,
				maxY: maxY
			};
		} else
			return {};
	};

	function checkRangeAviliable(range) {
		if (range.hasOwnProperty("minX") && range.hasOwnProperty("minY") && range.hasOwnProperty("maxX") &&

			range.hasOwnProperty("maxY"))
			return true;
		else
			return false;
	};

	function select() {
		var range = getRange();
		if (checkRangeAviliable(range)) {
			var minX = range.minX;
			var maxX = range.maxX;
			var minY = range.minY;
			var maxY = range.maxY;
			for (var i = minY; i <= maxY; i++) {
				for (var j = minX; j <= maxX; j++) {
					persist.selection.push(i + defaults.separator + j);
				}
			}
		}
	};



	function renderSelection() {
		var num = 0;
		var flag = false;
		if (checkSelection())
			flag = true;
		for (var i = 0; i < persist.selection.length; i++) {
			var arr = persist.selection[i].split(defaults.separator);
			var row = arr[0];
			var col = arr[1];
			if (persist.storage[row][col]) {
				if (persist.brush.selectedCss[persist.selection[i]] !== undefined) {
					continue;
				} else {
					// 单元格样式缓存
					if (!persist.css[persist.selection[i]])
						persist.css[persist.selection[i]] = persist.storage[row][col].style.cssText;
					num++;
					if (checkBrushFormatOpened() && checkBrushSelected()) {
						var sty = "";
						for (var m in persist.brush.selectedCss) {
							sty = persist.brush.selectedCss[m];
							break;
						}
						persist.storage[row][col].style.cssText = sty;
					} else {
						if (flag === true)
							persist.storage[row][col].style.backgroundColor = defaults.right;
						else
							persist.storage[row][col].style.backgroundColor = defaults.wrong;
					}
				}
			}
		}
		if (!checkBrushFormatOpened()) {
			if (num === 1) {
				var arr = persist.selection[0].split(defaults.separator);
				var row = arr[0];
				var col = arr[1];
				if (persist.storage[row][col]) {
					persist.storage[row][col].style.backgroundColor = defaults.normal;
				}
			}
		}
	};


	function clearSelection() {
		// 遍历选区
		for (var i = 0; i < persist.selection.length; i++) {
			var obj = utils.index2Obj(persist.selection[i]);
			var row = obj.y;
			var col = obj.x;
			// 单元格存在
			if (persist.storage[row][col]) {
				// 格式样式单元格不变化
				if (persist.brush.selectedCss[persist.selection[i]] !== undefined) {

				} else {
					if (persist.css[persist.selection[i]])
						persist.storage[row][col].style.cssText = persist.css[persist.selection[i]];
					else
						persist.storage[row][col].style.cssText = "";
				}
			}
		}
		persist.selection = [];
		persist.css = {};
	};

	function checkSelection() {
		var range = getRange();
		if (checkRangeAviliable(range)) {
			var minX = range.minX;
			var maxX = range.maxX;
			var minY = range.minY;
			var maxY = range.maxY;
			if (minY === maxY && minX === maxX)
				return true;
			var count = 0;
			var height = 0;
			for (var y = minY; y <= maxY; y++) {
				if (persist.storage[y]) {
					var width = 0;
					for (var x = minX; x <= maxX; x++) {

						if (persist.storage[y][x]) {
							var cell = persist.storage[y][x];
							var cols = cell.colSpan;
							var rows = cell.rowSpan;
							count += cols * rows;
							if (y === minY)
								width += cols;
							if (x === minX)
								height += rows;
						}
					}
					if (y === minY) {
						if (width !== maxX - minX + 1)
							return false;
					}
				}
			}
			if (height !== maxY - minY + 1)
				return false;
			if (count !== (maxY - minY + 1) * (maxX - minX + 1))
				return false;
			else {
				for (var x = minX; x <= maxX; x++) {
					var height = 0;
					for (var y = minY; y <= maxY; y++) {
						if (persist.storage[y]) {
							if (persist.storage[y][x])
								height += persist.storage[y][x].rowSpan;
						}
					}
					if (height > maxY - minY + 1)
						return false;
				}
			}
			return true;
		}
	};

	function checkSelectionOne() {
		var exist = false;
		var num = 0;
		for (var i = 0; i < persist.selection.length; i++) {
			if (persist.selection[i] === persist.range.start)
				exist = true;
			var arr = persist.selection[i].split(defaults.separator);
			var y = arr[0];
			var x = arr[1];
			if (persist.storage[y][x])
				num++;
		}
		return exist && num === 1;
	};

	function checkCellHaveEditableInput(index) {
		var flag = false;
		for (var i in persist.edition) {
			if (i === index && persist.edition[i]) {
				flag = true;
				break;
			}
		}
		return flag;
	};

	function contentEditable(ele, index) {
		if (checkCellHaveEditableInput(index))
			return;
		var input = document.createElement("input");
		input.className = "cell_input";
		var height_ = ele.clientHeight;
		var width_ = ele.clientWidth;
		input.style.height = (height_ - 1) + "px";
		input.style.width = (width_ - 1) + "px";
		input.value = ele.innerHTML;
		ele.innerHTML = "";
		ele.appendChild(input);
		// 重新设置尺寸
		// TODO IE8 发生单元格抖动 !
		if (input)
			setTimeout(function() {
				try {
					input.focus();
					// 清空可编辑文本框的缓存数组
					persist.edition = {};
					// 将当前显示的文本框添加到数组缓存中
					persist.edition[index] = input;
				} catch (e) {}
			}, 0);
		// 文本框失去焦点消失
		AttachEvent(input, "blur", function() {
			var cellTd = input.parentNode;
			var inputValue = input.value.Trim();
			if (cellTd) {
				// 将文本框中的值取出添加到单元格显示
				cellTd.removeChild(input);
				cellTd.innerHTML = inputValue;
			}
			// 清空可编辑文本框的缓存数组
			persist.edition = {};
		}, false);
	};

	function clearEditable() {
		for (var i in persist.edition) {
			var input = persist.edition[i];
			if (input && input.parentNode)
				input.parentNode.innerHTML = input.value.Trim();
		}
	};

	function init(id_, str, options) {
		id = id_;
		for (var i in options) {
			if (options.hasOwnProperty(i))
				defaults[i] = options[i];
		}
		if (str) {
			loadStr(str);
			load();
		}
	};

	// 表格子元素前缀
	var tableChildPrefix = {
		thead: "thead",
		tbody: "tbody",
		tfoot: "tfoot"
	};

	var tableChildren = {};

	function getIndexByElement(ele) {
		for (var i in tableChildren) {
			if (tableChildren[i] === ele) {
				return i;
			}
		}
	};

	// 加载表格
	function load() {
		var tableContainer = document.getElementById(id);
		var table = utils.firstChild(tableContainer);
		var theadCount = 0;
		var tbodyCount = 0;
		var tfootCount = 0;
		var thead_ = "thead";
		var tbody_ = "tbody";
		var tfoot_ = "tfoot";
		for (var i = 0; i < table.children.length; i++) {
			var r = table.children[i];
			var regionIndex = "";
			if (r.tagName.toLowerCase() === "thead") {
				regionIndex = thead_ + "_" + theadCount;
				theadCount++;
			} else if (r.tagName.toLowerCase() === "tbody") {
				regionIndex = tbody_ + "_" + tbodyCount;
				tbodyCount++;
			} else if (r.tagName.toLowerCase() === "tfoot") {
				regionIndex = tfoot_ + "_" + tfootCount;
				tfootCount++;
			}
			tableChildren[regionIndex] = r;
		}
		var rows = utils.fixedTableRows(table);
		for (var i = 0; i < rows.length; i++) {
			var index = 0;
			for (var j = 0; j < rows[i].cells.length; j++) {
				var oIndex = index;
				var cell = rows[i].cells[j];

				utils.attachEvent(cell);
				if (!persist.storage[i])
					persist.storage[i] = [];
				if (persist.storage[i][index] === null) {
					var wIndex = index;
					while (persist.storage[i][wIndex] === null)
						wIndex++;
					persist.storage[i][wIndex] = cell;
					var max = 0;
					for (var b = 0; b < persist.storage[i].length; b++) {
						if (persist.storage[i][b] !== null && persist.storage[i][b] !== undefined)
							max = b;
					}
					oIndex = index = max;
				} else {
					persist.storage[i][index] = cell;
				}
				if (cell.rowSpan > 1 || cell.colSpan > 1) {
					if (!persist.place[i])
						persist.place[i] = [];
					persist.place[i].push(cell);
				}

				if (cell.colSpan > 1) {
					for (var m = 1; m <= cell.colSpan - 1; m++) {
						persist.storage[i][index + m] = null;
					}
					index = index + cell.colSpan;
				} else
					index++;
				if (cell.rowSpan > 1) {
					for (var n = 1; n <= cell.rowSpan - 1; n++) {
						if (!persist.storage[i + n]) {
							persist.storage[i + n] = [];
						}
						for (var m = 0; m < cell.colSpan; m++) {
							persist.storage[i + n][oIndex + m] = null;
						}
					}
				}
			}
		}
	};

	function loadStr(str) {
		var tableContainer = document.getElementById(id);
		tableContainer.innerHTML = str;
	};

	function write(str) {
		clear();
		loadStr(str);
		load();
	};

	function onCellMouseOver(e) {
		if (checkBrushFormatOpened() && checkBrushSelected() === false)
			return;
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		var regionIdnex = getIndexByElement(ele.parentNode.parentNode);
		var tagNameV = ele.tagName.toLowerCase();
		if (tagNameV === "td" || tagNameV === "th") {
			if (persist.mouse.status === 0) {
				var rowIndex = utils.fixedRowIndex(ele.parentNode);
				var index;
				for (var i = 0; i < persist.storage[rowIndex].length; i++) {
					if (ele == persist.storage[rowIndex][i])
						index = rowIndex + defaults.separator + i;
				}
				index += defaults.separator + regionIdnex;
				if (regionIdnex === utils.index2Region(persist.range.start) || checkBrushSelected() && checkBrushFormatOpened()) {
					persist.range.end = index;
					clearSelection();
					select();
					renderSelection();
					clearEditable();
				}
			}
		}
	};

	function onCellMouseUp(e) {
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		// 设置鼠标弹起状态
		persist.mouse.status = -1;
		// 格式刷已经开启
		if (checkBrushFormatOpened() === true) {
			// 格式选区不存在
			if (checkBrushSelected() === false) {
				// 格式选区状态设置
				persist.brush.selected = 0;
			} else {
				persist.selection = [];
				persist.css = {};
				// 消除格式选区
				persist.brush.selected = -1;

				// 设置样式
				for (var i in persist.brush.selectedCss) {
					var sty = persist.brush.selectedCss[i];
					ele.style.cssText = sty;
					var obj = utils.index2Obj(i);
					persist.storage[obj.y][obj.x].style.cssText = sty;
					break;
				}
				persist.brush.selectedCss = {};
			}
		}
	};

	// 鼠标按下操作
	function onCellMouseDown(e) {
		// 清除选区
		clearSelection();
		e = e || window.event;
		// 获取单元格
		var ele = e.srcElement || e.currentTarget;
		var regionIdnex = getIndexByElement(ele.parentNode.parentNode);
		// td标签
		var tagName = ele.tagName.toLowerCase();
		if (tagName === "td" || tagName === "th") {
			// 单元格所在行号
			var rowIndex = utils.fixedRowIndex(ele.parentNode);
			// 单元格对应下标
			var index;
			// 遍历单元格
			for (var i = 0; i < persist.storage[rowIndex].length; i++) {
				// 查询出对应的单元格
				if (ele == persist.storage[rowIndex][i]) {
					// 获取对应的单元格下标
					index = rowIndex + defaults.separator + i;
					break;
				}
			}
			index += defaults.separator + regionIdnex;
			// 选区起始下标
			persist.range.start = index;
			// 选区结束下标
			persist.range.end = index;
			// 添加入选区缓存
			persist.selection.push(index);
			// 鼠标被按下
			persist.mouse.status = 0;
			// 选区缓存样式
			persist.css[index] = ele.style.cssText;
			// 判断是否开启格式刷
			if (checkBrushFormatOpened() === true) {
				// 格式单元格被选择
				if (checkBrushSelected() === true) {} else {
					// 如果格式刷单元格样式缓存不存在
					if (persist.brush.selectedCss[index] === undefined) {
						// 设置格式刷单元格样式缓存
						persist.brush.selectedCss[index] = ele.style.cssText;
					}
					// 格式刷正确边框样式
					ele.style.border = defaults.brushright;
				}
			} else {
				// 没开启格式刷时单元格被选中的样式
				ele.style.backgroundColor = defaults.normal;
				// 设置可编辑单元格
				contentEditable(ele, index);
			}
		}
	};

	// 设置被选中单元格的样式
	function setSelectionCss(css) {
		// 选区为空
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		if (css !== null && 　css !== undefined) {
			// 选区数组转换二维数组
			var selection2ArrayStack = selectionTrans2ArrayStack();
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					// 回去下标对象
					var obj = utils.index2Obj(selection2ArrayStack[i][j]);
					// 存在单元格
					if (persist.storage[obj.y][obj.x]) {
						// 设置样式
						persist.storage[obj.y][obj.x].style.cssText = css;
						// 格式刷单元格如果被选中时更改样式，则格式刷的样式缓存也应该更改
						for (var m in persist.brush.selectedCss) {
							if (m === selection2ArrayStack[i][j]) {
								persist.brush.selectedCss[m] = css;
								persist.storage[obj.y][obj.x].style.border = defaults.brushright;
								break;
							}
						}
					}
				}
			}
		}
		// 清空选区
		persist.selection = [];
		// 清空选区范围
		persist.range = {
			start: null,
			end: null
		};
	};

	// 读取
	function read() {

		// TODO 不使用清空当前选区的方法也能获取正确的表格字符串
		clearSelection();
		clearEditable();
		if (defaults.nullRowRomoved)
			removeNullRows();
		return document.getElementById(id).innerHTML;
	};

	// 获取被选中的单元格
	function getSelectionCells() {
		var selectionCells = [];
		var selection2ArrayStack = selectionTrans2ArrayStack();
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < selection2ArrayStack[i].length; j++) {
				var obj = utils.index2Obj(selection2ArrayStack[i][j]);
				if (persist.storage[obj.y][obj.x]) {
					var cell = persist.storage[obj.y][obj.x].cloneNode(true);
					if (persist.css[selection2ArrayStack[i][j]] !== undefined) {
						cell.style.cssText = persist.css[selection2ArrayStack[i][j]];
						selectionCells.push(cell);
					}
				}
			}
		}
		return selectionCells;
	};

	// 打开格式刷
	function openBrushFormat() {
		// 设置格式刷可用
		persist.brush.status = 0;
		// 清空选区
		clearSelection();
		// 清空可编辑文本
		clearEditable();
	};

	// 关闭格式刷
	function closeBrushFormat() {
		// 设置格式刷状态不可用
		persist.brush.status = -1;
		// 清空选区 TODO 好像用不到
		clearSelection();
		// 还原被选中的单元格的样式
		for (var i in persist.brush.selectedCss) {
			var sty = persist.brush.selectedCss[i];
			var obj = utils.index2Obj(i);
			// 样式设置
			persist.storage[obj.y][obj.x].style.cssText = sty;
			break;
		}
		// 清空格式刷样式缓存区
		persist.brush.selectedCss = {};
	};

	// 检查格式刷是否打开 
	function checkBrushFormatOpened() {
		if (persist.brush.status === 0)
			return true;
		else
			return false;
	};

	// 检查格式刷的样式单元格是否被选中
	function checkBrushSelected() {
		if (persist.brush.selected === -1)
			return false;
		else
			return true;
	};

	// 提供行号，检查此行是否是空行
	function checkNullRow(y) {
		if (persist.storage[y]) {
			var i = 0;
			while (!persist.storage[y][i]) {
				i++;
				if (i === persist.storage[y].length)
					break;
			}
			if (i === persist.storage[y].length)
				return true;
			else
				return false;
		} else {
			alert(defaults.noRowExist);
			return undefined;
		}
	};

	// 获取行
	function getRow(y) {
		var tableContainer = document.getElementById(id);
		var table = utils.firstChild(tableContainer);
		return utils.fixedTableRows(table)[y];
	};

	// 移除空行
	function removeNullRows() {
		for (var i = 0; i < persist.storage.length; i++) {
			if (checkNullRow(i)) {
				deleteRowHandler(i, 0, true);
				removeNullRows();
				break;
			}
		}
	};


	// 公开方法
	// TODO 为每一个方法添加回调函数
	return {
		// 合并单元格
		merge: merge,
		// 竖拆
		splitH: splitH,
		// 横拆
		splitV: splitV,
		// 删除列
		deleteCol: deleteCol,
		// 删除行
		deleteRow: deleteRow,
		// 上部添加行
		addRowTop: addRowTop,
		// 底部添加行
		addRowBottom: addRowBottom,
		// 左侧添加列
		addColLeft: addColLeft,
		// 右侧添加列
		addColRight: addColRight,
		// 书写单元格 ， 传入字符串
		write: write,
		// 初始化
		init: init,
		// 完全拆分单元格
		clearMerge: clearMerge,
		// 设置被选中的单元格的样式
		setSelectionCss: setSelectionCss,
		// 读取表格字符串
		read: read,
		// 获取被选中的单元格
		getSelectionCells: getSelectionCells,
		// 打开格式刷
		openBrushFormat: openBrushFormat,
		// 关闭格式刷
		closeBrushFormat: closeBrushFormat,
		// 检查格式刷是否打开
		checkBrushFormatOpened: checkBrushFormatOpened
	};
})();