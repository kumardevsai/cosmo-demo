/**
	TODO 
	1.代码优化
	2.有bug，未复现
	3.单元格尺寸的计算（添加行、添加列）
	4.点击单元格其中有时会显示textaera标签 (input尺寸计算问题，单元格会出现1-2个像素的留白，当点击留白处的时候，就会发生这种情况)
	5.关于单元格被选中时的自定义样式（不仅是背景色，包括虚线边框，透明度等）
	6.实现绝对的正方形选区（而不是提示选区不正确显示红色）
**/
"use strict";

var MergeTable = window.MergeTable = (function() {
	var id;

	var utils = {
		// 获取右侧相邻的节点
		nextSibling: function(ele) {
			return ele.nextElementSibling || ele.nextSibling;
		},
		attachEvent: function(cell) {
			AttachEvent(cell, "mousedown", onCellMouseDown, false);
			AttachEvent(cell, "mouseup", onCellMouseUp, false);
			AttachEvent(cell, "mouseover", onCellMouseOver, false);
		},
		index2Obj: function(index) {
			var arr = index.split(defaults.separator);
			return {
				y: parseInt(arr[0]),
				x: parseInt(arr[1])
			};
		},
		firstChild: function(ele) {
			return ele.firstElementChild || ele.firstChild
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
		// 采用格式刷时单元格的样式(选区错误)
		brushwrong: '2px dashed red',
		// 应用格式刷单元格样式
		brushused: '2px dashed blue'
	};

	var persist = {
		storage: [],
		place: [],
		selection: [],
		edition: [],
		range: {
			start: null,
			end: null
		},
		mouse: {
			status: -1
		},
		css: {},
		brush: {
			status: -1,
			selected: -1,
			targetSelected: -1,
			templates: []
		}
	};

	function getPreviousSiblingStorageElementNotNull(y, x) {
		var x_ = x - 1;
		if (x_ >= 0) {
			while (!persist.storage[y][x_]) {
				x_--;
				if (x_ < 0)
					break;
			}
		}
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
		var selection2ArrayStack = [];
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
			var totalColSpan = 0;
			var totalRowSpan = 0;
			var text = "";
			for (var i = 0; i < selection2ArrayStack[0].length; i++) {
				var arr = selection2ArrayStack[0][i].split(defaults.separator);
				var y = arr[0];
				var x = arr[1];
				if (persist.storage[y][x])
					totalColSpan += persist.storage[y][x].colSpan;
			}
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					if (persist.storage[y][x]) {
						if (defaults.retainMergeText)
							text += persist.storage[y][x].innerHTML.Trim();
						if (j === 0) {
							totalRowSpan += persist.storage[y][x].rowSpan;
							if (selection2ArrayStack[i][0].rowSpan > 1)
							;
							i = i + persist.storage[y][x].rowSpan - 1;
						}
					}
				}
			}
			persist.selection = [];
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					if (persist.storage[y][x]) {
						if (i === 0 && j === 0) {
							persist.selection.push(selection2ArrayStack[i][j]);
							persist.storage[y][x].rowSpan = totalRowSpan;
							persist.storage[y][x].colSpan = totalColSpan;
							if (defaults.retainMergeText)
								persist.storage[y][x].innerHTML = text.Trim();
							persist.storage[y][x].style.backgroundColor = defaults.normal;
							// TODO style.width and style.height
							persist.range.start = selection2ArrayStack[i][j];
							persist.range.end = selection2ArrayStack[i][j];
						} else {
							persist.storage[y][x].parentNode.removeChild(persist.storage[y][x]);
							persist.storage[y][x] = null;
						}
					}
				}
			}
		} else {
			alert(defaults.mergeMsg);
			return;
		}
	};

	// 清除单元格的格式，完全拆分
	function clearMerge() {
		if (checkSelectionOne()) {
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			clearMergeHandler(y, x);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function clearMergeHandler(y, x) {
		var nextRow = null;
		var cell = persist.storage[y][x];
		for (var i = 0; i < cell.rowSpan; i++) {
			if (i === 0)
				nextRow = cell.parentNode;
			else
				nextRow = utils.nextSibling(nextRow);
			for (var j = 0; j < cell.colSpan; j++) {
				if (j === 0 && i === 0)
					continue;
				else {
					var insertCell = document.createElement(cell.tagName.toLowerCase());
					var previousElement = getPreviousSiblingStorageElementNotNull(y + i, x + j);
					if (previousElement) {
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
					persist.storage[y + i][x + j] = insertCell;
					utils.attachEvent(insertCell);
				}
			}
		}
		cell.rowSpan = 1;
		cell.colSpan = 1;
	};

	function checkMerge() {
		if (checkSelection() && persist.selection.length > 1)
			return true;
		else
			return false;
	};

	function splitVHandler(y, x) {
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
				utils.nextSibling(cell.parentNode).insertBefore(insertCell, utils.firstChild(utils.nextSibling(cell.parentNode)));
			}
		} else if (i === -1) {
			var nextTr;
			var rowSpan1_ = rowSpan1;
			while (rowSpan1_ >= 1) {
				if (!nextTr)
					nextTr = utils.nextSibling(cell.parentNode);
				else
					nextTr = utils.nextSibling(nextTr);
				rowSpan1_--;
			}
			nextTr.insertBefore(insertCell, utils.firstChild(nextTr));
		}
		utils.attachEvent(insertCell);
		persist.storage[nextRowIndex][x] = insertCell;
	};

	function splitV() {
		if (checkSplitV()) {
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			splitVHandler(y, x);
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
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			splitHHandler(y, x);
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
		persist.range.start = y + 1 + defaults.separator + x;
		persist.selection = [persist.range.start];
	};

	function addRowTop() {
		if (checkSelectionOne()) {
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			addRowTopHandler(y, x);
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
		if (!utils.nextSibling(cell.parentNode))
			cell.parentNode.parentNode.appendChild(insertRow);
		else {
			var index_ = y + cell.rowSpan;
			var nextSiblingTr;
			while (index_ !== y) {
				if (!nextSiblingTr)
					nextSiblingTr = utils.nextSibling(cell.parentNode);
				else
					nextSiblingTr = utils.nextSibling(nextSiblingTr);
				index_--;
			}
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
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			addRowBottomHandler(y, x);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function deleteRowHandler(y, x) {
		var cell = persist.storage[y][x];
		for (var m = 0; m < persist.storage[y].length; m++) {
			var mergeCell = persist.storage[y][m];
			if (mergeCell) {
				if (mergeCell.rowSpan > 1) {
					var nextRow = null;
					for (var i = 1; i < mergeCell.rowSpan; i++) {
						if (!nextRow)
							nextRow = utils.nextSibling(mergeCell.parentNode);
						else
							nextRow = utils.nextSibling(nextRow);
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
							nextRow = utils.nextSibling(mergeCell.parentNode);
						else
							nextRow = utils.nextSibling(nextRow);
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
										m += persist.storage[preRowIndex_][m - 1].colSpan - 2;
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
								nextRow = utils.nextSibling(mergeCell.parentNode);
							else
								nextRow = utils.nextSibling(nextRow);
							for (var j = 0; j < mergeCell.colSpan - 1; j++) {
								var x_ = x;
								if (x_ >= 0) {
									while (!persist.storage[i + n][x_ - 1]) {
										x_--;
										if (x_ - 1 < 0)
											break;
									}
								}
								var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
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
									persist.storage[i + n][x + mergeCell.colSpan - j - 1] = insertCell;
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
					nextRow = utils.nextSibling(nextRow);
				var insertCell = document.createElement(cell.tagName.toLowerCase());
				if (utils.firstChild(nextRow))
					nextRow.insertBefore(insertCell, utils.firstChild(nextRow));
				else
					nextRow.appendChild(insertCell);
				persist.storage[i].splice(0, 0, insertCell);
				utils.attachEvent(insertCell);
			}
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
										nextRow = utils.nextSibling(mergeCell.parentNode);
									else
										nextRow = utils.nextSibling(nextRow);
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
											nextRow = utils.nextSibling(nextRow);
									}
									var insertCell = document.createElement(persist.storage[i][xx_].tagName.toLowerCase());
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
									persist.storage[i + o].splice(xx_ + persist.storage[i][xx_].colSpan, 0, insertCell);
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
			persist.range.start = y + defaults.separator + (parseInt(arr[1]) + 1);
			persist.selection = [persist.range.start];
		}

	};

	function addColLeft() {
		if (checkSelectionOne()) {
			var arr = persist.range.start.split(defaults.separator);
			var y = parseInt(arr[0]);
			var x = parseInt(arr[1]);
			addColLeftHandler(y, x, arr);
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
								nextRow = utils.nextSibling(mergeCell.parentNode);
							else
								nextRow = utils.nextSibling(nextRow);
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
									nextRow = utils.nextSibling(nextRow);
							}
							var insertCell = document.createElement(persist.storage[i][xx_].tagName.toLowerCase());
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
							persist.storage[i + o].splice(xx_ + persist.storage[i][xx_].colSpan, 0, insertCell);
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
			var arr = persist.range.start.split(defaults.separator);
			var x = parseInt(arr[1]);
			var y = parseInt(arr[0]);
			addColRightHandler(y, x, arr);
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function checkSplitH() {
		var arr = persist.range.start.split(defaults.separator);
		var y = arr[0];
		var x = arr[1];
		var cell = persist.storage[y][x];
		var colSpan_ = cell.colSpan;
		if (checkSelectionOne() && colSpan_ > 1)
			return true;
		else
			return false;
	};

	function checkSplitV() {
		var arr = persist.range.start.split(defaults.separator);
		var y = arr[0];
		var x = arr[1];
		var cell = persist.storage[y][x];
		var rowSpan_ = cell.rowSpan;
		if (checkSelectionOne() && rowSpan_ > 1)
			return true;
		else
			return false;
	};

	function clear() {
		persist.storage = [];
		persist.place = [];
		persist.selection = [];
		persist.edition = [];
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
		if (range.hasOwnProperty("minX") && range.hasOwnProperty("minY") && range.hasOwnProperty("maxX") && range.hasOwnProperty("maxY"))
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
				// 单元格样式缓存
				if (!persist.css[persist.selection[i]])
					persist.css[persist.selection[i]] = persist.storage[row][col].style.cssText;
				num++;
				if (flag === true)
					persist.storage[row][col].style.backgroundColor = defaults.right;
				else
					persist.storage[row][col].style.backgroundColor = defaults.wrong;
			}
		}
		if (num === 1) {
			var arr = persist.selection[0].split(defaults.separator);
			var row = arr[0];
			var col = arr[1];
			if (persist.storage[row][col]) {
				persist.storage[row][col].style.backgroundColor = defaults.normal;
			}
		}
	};

	function renderBrush() {
		var num = 0;
		var flag = false;
		if (checkSelection())
			flag = true;
		for (var i = 0; i < persist.selection.length; i++) {
			var arr = persist.selection[i].split(defaults.separator);
			var row = arr[0];
			var col = arr[1];
			if (persist.storage[row][col]) {
				// 单元格样式缓存
				if (!persist.css[persist.selection[i]])
					persist.css[persist.selection[i]] = persist.storage[row][col].style.cssText;
				num++;
				if (flag === true) {
					if (checkBrushSelected() === true)
						persist.storage[row][col].style.border = defaults.brushused;
					else
						persist.storage[row][col].style.border = defaults.brushright;
				} else
					persist.storage[row][col].style.border = defaults.brushwrong;
			}
		}
	};

	function clearSelection() {
		for (var i = 0; i < persist.selection.length; i++) {
			var arr = persist.selection[i].split(defaults.separator);
			var row = arr[0];
			var col = arr[1];
			if (persist.storage[row][col]) {
				if (persist.css[persist.selection[i]])
					persist.storage[row][col].style.cssText = persist.css[persist.selection[i]];
				else
					persist.storage[row][col].style.cssText = "";
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
		for (var i = 0; i < persist.edition.length; i++) {
			if (persist.edition[i][0] === index && persist.edition[i][1]) {
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
		input.style.height = (ele.clientHeight - 4) + "px";
		input.style.width = (ele.clientWidth - 1) + "px";
		input.value = ele.innerHTML;
		input.focused = true;
		ele.innerHTML = "";
		ele.appendChild(input);
		if (input)
			input.focus();
		// 文本框失去焦点消失
		AttachEvent(input, "blur", function() {
			// 将文本框中的值取出添加到单元格显示
			input.parentNode.innerHTML = input.value.Trim();
			// 清空可编辑文本框的缓存数组
			persist.edition = [];
		}, false);
		// 事件冒泡给父元素
		AttachEvent(input, "click", function(e) {}, true);
		// 清空可编辑文本框的缓存数组
		persist.edition = [];
		// 将当前显示的文本框添加到数组缓存中
		persist.edition.push([index, input]);
	};

	function clearEditable() {
		for (var i = 0; i < persist.edition.length; i++) {
			var input = persist.edition[i][1];
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

	function load() {
		var tableContainer = document.getElementById(id);
		var table = utils.firstChild(tableContainer);
		var rows = table.rows;
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
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		var tagNameV = ele.tagName.toLowerCase();
		if (tagNameV === "td" || tagNameV === "th") {
			if (persist.mouse.status === 0) {
				var rowIndex = ele.parentNode.rowIndex;
				var index;
				for (var i = 0; i < persist.storage[rowIndex].length; i++) {
					if (ele == persist.storage[rowIndex][i])
						index = rowIndex + defaults.separator + i;
				}
				persist.range.end = index;
				if (!(checkBrushFormatOpened() === true && checkBrushSelected() === true))
					clearSelection();
				select();
				if (checkBrushFormatOpened() === true) {
					renderBrush();
				} else {
					renderSelection();

					clearEditable();
				}
			}
		}
	};

	function onCellMouseUp(e) {
		e = e || window.event;
		persist.mouse.status = -1;
		if (checkBrushFormatOpened() === true) {
			persist.brush.selected = true;
			if (checkBrushSelected() === true && checkBrushTargetSelected() === false) {
				persist.brush.templates = persist.selection.slice( 0);
			}
		}
	};

	function onCellMouseDown(e) {
		if (!(checkBrushFormatOpened() && checkBrushSelected()))
			clearSelection();
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		var tagName = ele.tagName.toLowerCase();
		if (tagName === "td" || tagName === "th") {
			var rowIndex = ele.parentNode.rowIndex;
			var index;
			for (var i = 0; i < persist.storage[rowIndex].length; i++) {
				if (ele == persist.storage[rowIndex][i])
					index = rowIndex + defaults.separator + i;
			}
			persist.range.start = index;
			persist.range.end = index;
			persist.selection.push(index);
			persist.mouse.status = 0;
			persist.css[index] = ele.style.cssText;
			if (checkBrushFormatOpened() === true) {
				if (checkBrushSelected() === true)
					ele.style.border = defaults.brushused;
				else
					ele.style.border = defaults.brushright;
			} else {
				ele.style.backgroundColor = defaults.normal;
				contentEditable(ele, index);
			}
		}
	};

	// 设置被选中单元格的样式
	function setSelectionCss(css) {
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		if (css !== null && 　css !== undefined) {
			var selection2ArrayStack = selectionTrans2ArrayStack();
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var obj = utils.index2Obj(selection2ArrayStack[i][j]);
					if (persist.storage[obj.y][obj.x]) {
						persist.storage[obj.y][obj.x].style.cssText = css;
					}
				}
			}
		}
		persist.selection = [];
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

		return document.getElementById(id).innerHTML;
	};

	function getSelectionCells() {
		var selectionCells = [];
		var selection2ArrayStack = selectionTrans2ArrayStack();
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < selection2ArrayStack[i].length; j++) {
				var obj = utils.index2Obj(selection2ArrayStack[i][j]);
				if (persist.storage[obj.y][obj.x]) {
					var cell = persist.storage[obj.y][obj.x].cloneNode(true);
					if (persist.css[selection2ArrayStack[i][j]]) {
						cell.style.cssText = persist.css[selection2ArrayStack[i][j]];
						selectionCells.push(cell);
					}
				}
			}
		}
		return selectionCells;
	};

	function openBrushFormat() {
		persist.brush.status = 0;
	};

	function closeBrushFormat() {
		persist.brush.status = -1;
	};

	function checkBrushFormatOpened() {
		if (persist.brush.status === 0)
			return true;
		else
			return false;
	};

	function checkBrushSelected() {
		if (persist.brush.selected === -1)
			return false;
		else
			return true;
	};

	function checkBrushTargetSelected() {
		if (persist.brush.targetSelected === -1)

			return false;
		else
			return true;
	};

	// 公开方法
	return {
		merge: merge,
		splitH: splitH,
		splitV: splitV,
		deleteCol: deleteCol,
		deleteRow: deleteRow,
		addRowTop: addRowTop,
		addRowBottom: addRowBottom,
		addColLeft: addColLeft,
		addColRight: addColRight,
		write: write,
		init: init,
		clearMerge: clearMerge,
		setSelectionCss: setSelectionCss,
		read: read,
		getSelectionCells: getSelectionCells,
		openBrushFormat: openBrushFormat,
		closeBrushFormat: closeBrushFormat,
		checkBrushFormatOpened: checkBrushFormatOpened
	};
})();