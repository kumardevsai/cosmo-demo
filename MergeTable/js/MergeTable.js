"use strict";

var MergeTable = window.MergeTable = function() {};

MergeTable.restrict = {
	style: {
		bg: {
			wrong: "red",
			right: "green",
			normal: "yellow"
		}
	},
	options: {
		separator: "_",
		mergeMsg: "请选择有效的单元格进行合并!",
		retainMergeText: true,
		splitVMsg: "当前单元格无法进行垂直拆分!",
		splitHMsg: "当前单元格无法进行水平拆分!",
		oneSelectedMsg: "只能选择一个单元格!"
	},
	operation: {
		merge: function() {
			if (MergeTable.restrict.operation.checkMerge()) {
				var selection2Array = [];
				for (var i = 0; i < MergeTable.restrict.persist.selection.length; i++) {
					var y = MergeTable.restrict.persist.selection[i].split(MergeTable.restrict.options.separator)[0];
					if (!selection2Array[y])
						selection2Array[y] = [];
					selection2Array[y].push(MergeTable.restrict.persist.selection[i]);
				}
				var selection2ArrayStack = [];
				var index = 0;
				for (var i in selection2Array) {
					selection2ArrayStack[index] = selection2Array[i];
					index++;
				}
				var totalColSpan = 0;
				var totalRowSpan = 0;
				var text = "";
				for (var i = 0; i < selection2ArrayStack[0].length; i++) {
					var arr = selection2ArrayStack[0][i].split(MergeTable.restrict.options.separator);
					var y = arr[0];
					var x = arr[1];
					if (MergeTable.restrict.persist.storage[y][x])
						totalColSpan += MergeTable.restrict.persist.storage[y][x].colSpan;
				}
				for (var i = 0; i < selection2ArrayStack.length; i++) {
					for (var j = 0; j < selection2ArrayStack[i].length; j++) {
						var arr = selection2ArrayStack[i][j].split(MergeTable.restrict.options.separator);
						var y = arr[0];
						var x = arr[1];
						if (MergeTable.restrict.persist.storage[y][x]) {
							if (MergeTable.restrict.options.retainMergeText)
								text += MergeTable.restrict.persist.storage[y][x].innerHTML;
							if (j === 0) {
								totalRowSpan += MergeTable.restrict.persist.storage[y][x].rowSpan;
								if (selection2ArrayStack[i][0].rowSpan > 1)
									i = i + MergeTable.restrict.persist.storage[y][x].rowSpan - 1;
							}
						}
					}
				}
				MergeTable.restrict.persist.selection = [];
				for (var i = 0; i < selection2ArrayStack.length; i++) {
					for (var j = 0; j < selection2ArrayStack[i].length; j++) {
						var arr = selection2ArrayStack[i][j].split(MergeTable.restrict.options.separator);
						var y = arr[0];
						var x = arr[1];
						if (MergeTable.restrict.persist.storage[y][x]) {
							if (i === 0 && j === 0) {
								MergeTable.restrict.persist.selection.push(selection2ArrayStack[i][j]);
								MergeTable.restrict.persist.storage[y][x].rowSpan = totalRowSpan;
								MergeTable.restrict.persist.storage[y][x].colSpan = totalColSpan;
								if (MergeTable.restrict.options.retainMergeText)
									MergeTable.restrict.persist.storage[y][x].innerHTML = text;
								MergeTable.restrict.persist.storage[y][x].style.backgroundColor = MergeTable.restrict.style.bg.normal;
								// TODO style.width and style.height
								MergeTable.restrict.persist.range.start = selection2ArrayStack[i][j];
								MergeTable.restrict.persist.range.end = null;
							} else {
								MergeTable.restrict.persist.storage[y][x].parentNode.removeChild(MergeTable.restrict.persist.storage[y][x]);
								MergeTable.restrict.persist.storage[y][x] = null;
							}
						}
					}
				}
			} else {
				alert(MergeTable.restrict.options.mergeMsg);
				return;
			}
		},
		checkMerge: function() {
			if (MergeTable.restrict.persist.checkSelection() && MergeTable.restrict.persist.selection.length > 1)
				return true;
			else
				return false;
		},
		splitV: function() {
			if (MergeTable.restrict.operation.checkSplitV()) {
				var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var y = parseInt(arr[0]);
				var x = parseInt(arr[1]);
				var cell = MergeTable.restrict.persist.storage[y][x];
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
				while (MergeTable.restrict.persist.storage[nextRowIndex][i] === null)
					i--;
				if (i >= 0) {
					var beforeCell = MergeTable.restrict.persist.storage[nextRowIndex][i];
					if (beforeCell) {
						if (beforeCell.nextSibling)
							beforeCell.parentNode.insertBefore(insertCell, beforeCell.nextSibling);
						else
							beforeCell.parentNode.appendChild(insertCell);
					} else {
						cell.parentNode.nextSibling.insertBefore(insertCell, cell.parentNode.nextSibling.firstChild);
					}
				} else if (i === -1) {
					var nextTr;
					var rowSpan1_ = rowSpan1;
					while (rowSpan1_ >= 1) {
						if (!nextTr)
							nextTr = cell.parentNode.nextSibling;
						else
							nextTr = nextTr.nextSibling;
						rowSpan1_--;
					}
					nextTr.insertBefore(insertCell, nextTr.firstChild);
				}
				AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
				AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
				AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
				MergeTable.restrict.persist.storage[nextRowIndex][x] = insertCell;
			} else {
				alert(MergeTable.restrict.options.splitVMsg);
				return;
			}
		},
		splitH: function() {
			if (MergeTable.restrict.operation.checkSplitH()) {
				var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var y = parseInt(arr[0]);
				var x = parseInt(arr[1]);
				var cell = MergeTable.restrict.persist.storage[y][x];
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
				cell.parentNode.insertBefore(insertCell, cell.nextSibling);
				AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
				AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
				AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
				MergeTable.restrict.persist.storage[y][x + colSpan1] = insertCell;
			} else {
				alert(MergeTable.restrict.options.splitHMsg);
				return;
			}
		},
		addRowTop: function() {
			if (MergeTable.restrict.persist.checkSelectionOne()) {
				var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var y = parseInt(arr[0]);
				var x = parseInt(arr[1]);
				var cell = MergeTable.restrict.persist.storage[y][x];
				var len = MergeTable.restrict.persist.storage[y].length;
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
						AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
						AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
						AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
					}
					MergeTable.restrict.persist.storage = insertStorage.concat(MergeTable.restrict.persist.storage);
				} else {
					var preRowIndex = y - 1;
					for (var i = 0; i < MergeTable.restrict.persist.storage[preRowIndex].length; i++) {
						if (MergeTable.restrict.persist.storage[preRowIndex][i]) {
							if (MergeTable.restrict.persist.storage[preRowIndex][i].rowSpan > 1) {
								insertStorage[0][i] = null;
								MergeTable.restrict.persist.storage[preRowIndex][i].rowSpan++;
								if (MergeTable.restrict.persist.storage[preRowIndex][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex][i].colSpan; k++) {
										insertStorage[0][i + k] = null;
									}
									i += MergeTable.restrict.persist.storage[preRowIndex][i].colSpan - 1;
								}
							} else {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i] = insertCell;
								AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
								AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
								AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
								if (MergeTable.restrict.persist.storage[preRowIndex][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex][i].colSpan; k++) {
										var insertCell = document.createElement(cell.tagName.toLowerCase());
										insertRow.appendChild(insertCell);
										insertStorage[0][i + k] = insertCell;
										AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
										AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
										AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
									}
									i += MergeTable.restrict.persist.storage[preRowIndex][i].colSpan - 1;
								}
							}
						} else {
							insertStorage[0][i] = null;
							var preRowIndex_ = preRowIndex;
							while (!MergeTable.restrict.persist.storage[preRowIndex_][i])
								preRowIndex_--;
							MergeTable.restrict.persist.storage[preRowIndex_][i].rowSpan++;
							if (MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan > 1) {
								for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan; k++) {
									insertStorage[0][i + k] = null;
								}
								i += MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan - 1;
							}
						}
					}
					MergeTable.restrict.persist.storage.splice(y, 0, insertStorage[0]);
				}
				MergeTable.restrict.persist.range.start = y + 1 + MergeTable.restrict.options.separator + x;
				MergeTable.restrict.persist.selection = [MergeTable.restrict.persist.range.start];
			} else {
				alert(MergeTable.restrict.options.oneSelectedMsg);
				return;
			}
		},
		addRowBottom: function() {
			if (MergeTable.restrict.persist.checkSelectionOne()) {
				var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var y = parseInt(arr[0]);
				var x = parseInt(arr[1]);
				var cell = MergeTable.restrict.persist.storage[y][x];
				var rowNum = MergeTable.restrict.persist.storage.length;
				var len = MergeTable.restrict.persist.storage[y].length;
				// TODO 添加多行
				var insertStorage = [];
				insertStorage[0] = [];
				var insertRow = document.createElement(cell.parentNode.tagName.toLowerCase());
				if (!cell.parentNode.nextSibling)
					cell.parentNode.parentNode.appendChild(insertRow);
				else {
					var index_ = y + cell.rowSpan;
					var nextSiblingTr;
					while (index_ !== y) {
						if (!nextSiblingTr)
							nextSiblingTr = cell.parentNode.nextSibling;
						else
							nextSiblingTr = nextSiblingTr.nextSibling;
						index_--;
					}
					cell.parentNode.parentNode.insertBefore(insertRow, nextSiblingTr);
				}
				if (y === rowNum - 1) {
					for (var i = 0; i < len; i++) {
						var insertCell = document.createElement(cell.tagName.toLowerCase());
						insertRow.appendChild(insertCell);
						insertStorage[0][i] = insertCell;
						AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
						AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
						AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
					}
					MergeTable.restrict.persist.storage = MergeTable.restrict.persist.storage.concat(insertStorage);
				} else {
					var preRowIndex = y + cell.rowSpan - 1;
					for (var i = 0; i < MergeTable.restrict.persist.storage[preRowIndex].length; i++) {
						if (MergeTable.restrict.persist.storage[preRowIndex][i]) {
							if (MergeTable.restrict.persist.storage[preRowIndex][i].rowSpan > 1) {
								insertStorage[0][i] = null;
								MergeTable.restrict.persist.storage[preRowIndex][i].rowSpan++;
								if (MergeTable.restrict.persist.storage[preRowIndex][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex][i].colSpan; k++) {
										insertStorage[0][i + k] = null;
									}
									i += MergeTable.restrict.persist.storage[preRowIndex][i].colSpan - 1;
								}
							} else {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i] = insertCell;
								AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
								AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
								AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
								if (MergeTable.restrict.persist.storage[preRowIndex][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex][i].colSpan; k++) {
										var insertCell = document.createElement(cell.tagName.toLowerCase());
										insertRow.appendChild(insertCell);
										insertStorage[0][i + k] = insertCell;
										AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
										AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
										AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
									}
									i += MergeTable.restrict.persist.storage[preRowIndex][i].colSpan - 1;
								}
							}
						} else {
							insertStorage[0][i] = null;
							var preRowIndex_ = preRowIndex;
							while (!MergeTable.restrict.persist.storage[preRowIndex_][i])
								preRowIndex_--;
							if (MergeTable.restrict.persist.storage[preRowIndex_][i].rowSpan + preRowIndex_ - 1 === preRowIndex) {
								var insertCell = document.createElement(cell.tagName.toLowerCase());
								insertRow.appendChild(insertCell);
								insertStorage[0][i] = insertCell;
								AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
								AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
								AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
								if (MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan; k++) {
										var insertCell = document.createElement(cell.tagName.toLowerCase());
										insertRow.appendChild(insertCell);
										insertStorage[0][i + k] = insertCell;
										AttachEvent(insertCell, "mousedown", onCellMouseDown, false);
										AttachEvent(insertCell, "mouseup", onCellMouseUp, false);
										AttachEvent(insertCell, "mouseover", onCellMouseOver, false);
									}
									i += MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan - 1;
								}
							} else {
								MergeTable.restrict.persist.storage[preRowIndex_][i].rowSpan++;
								if (MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan > 1) {
									for (var k = 1; k < MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan; k++) {
										insertStorage[0][i + k] = null;
									}
									i += MergeTable.restrict.persist.storage[preRowIndex_][i].colSpan - 1;
								}
							}
						}
					}
					MergeTable.restrict.persist.storage.splice(preRowIndex + 1, 0, insertStorage[0]);
				}
			} else {
				alert(MergeTable.restrict.options.oneSelectedMsg);
				return;
			}
		},
		deleteRow: function() {},
		deleteCol: function() {},
		addColLeft: function() {},
		addColRight: function() {},
		// TODO 删除此方法
		checkSplitH: function() {
			var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
			var y = arr[0];
			var x = arr[1];
			var cell = MergeTable.restrict.persist.storage[y][x];
			var colSpan_ = cell.colSpan;
			if (MergeTable.restrict.persist.checkSelectionOne() && colSpan_ > 1)
				return true;
			else
				return false;
		},
		// TODO 删除此方法
		checkSplitV: function() {
			var arr = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
			var y = arr[0];
			var x = arr[1];
			var cell = MergeTable.restrict.persist.storage[y][x];
			var rowSpan_ = cell.rowSpan;
			if (MergeTable.restrict.persist.checkSelectionOne() && rowSpan_ > 1)
				return true;
			else
				return false;
		}
	},
	persist: {
		storage: [],
		place: [],
		selection: [],
		range: {
			start: null,
			end: null
		},
		mouse: {
			status: -1
		},
		getRange: function() {
			if (MergeTable.restrict.persist.range.start && MergeTable.restrict.persist.range.end) {
				var startArray = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var startCoords = {
					y: parseInt(startArray[0]),
					x: parseInt(startArray[1])
				};
				var endArray = MergeTable.restrict.persist.range.end.split(MergeTable.restrict.options.separator);
				var endCoords = {
					y: parseInt(endArray[0]),
					x: parseInt(endArray[1])
				};
				var minX;
				var maxX;
				var minY;
				var maxY;
				if (startCoords.x > endCoords.x) {
					maxX = startCoords.x + MergeTable.restrict.persist.storage[startCoords.y][startCoords.x].colSpan - 1;
					minX = endCoords.x;
				} else if (startCoords.x < endCoords.x) {
					maxX = endCoords.x + MergeTable.restrict.persist.storage[endCoords.y][endCoords.x].colSpan - 1;
					minX = startCoords.x;
				} else {
					if (startCoords.y > endCoords.y) {
						maxX = startCoords.x + MergeTable.restrict.persist.storage[startCoords.y][startCoords.x].colSpan - 1;
						minX = endCoords.x;
					} else if (startCoords.y < endCoords.y) {
						maxX = endCoords.x + MergeTable.restrict.persist.storage[endCoords.y][endCoords.x].colSpan - 1;
						minX = startCoords.x;
					} else
						minX = maxX = startCoords.x;
				}
				if (startCoords.y > endCoords.y) {
					maxY = startCoords.y + MergeTable.restrict.persist.storage[startCoords.y][startCoords.x].rowSpan - 1;
					minY = endCoords.y;
				} else if (startCoords.y < endCoords.y) {
					maxY = endCoords.y + MergeTable.restrict.persist.storage[endCoords.y][endCoords.x].rowSpan - 1;
					minY = startCoords.y;
				} else {
					if (startCoords.x > endCoords.x) {
						maxY = startCoords.y + MergeTable.restrict.persist.storage[startCoords.y][startCoords.x].rowSpan - 1;
						minY = endCoords.y;
					} else if (startCoords.x < endCoords.x) {
						maxY = endCoords.y + MergeTable.restrict.persist.storage[endCoords.y][endCoords.x].rowSpan - 1;
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
		},
		checkRangeAviliable: function(range) {
			if (range.hasOwnProperty("minX") && range.hasOwnProperty("minY") && range.hasOwnProperty("maxX") && range.hasOwnProperty("maxY"))
				return true;
			else
				return false;
		},
		select: function() {
			var range = MergeTable.restrict.persist.getRange();
			if (MergeTable.restrict.persist.checkRangeAviliable(range)) {
				var minX = range.minX;
				var maxX = range.maxX;
				var minY = range.minY;
				var maxY = range.maxY;
				for (var i = minY; i <= maxY; i++) {
					for (var j = minX; j <= maxX; j++) {
						MergeTable.restrict.persist.selection.push(i + MergeTable.restrict.options.separator + j);
					}
				}
			}
		},
		renderSelection: function() {
			var num = 0;
			var flag = false;
			if (MergeTable.restrict.persist.checkSelection())
				flag = true;
			for (var i = 0; i < MergeTable.restrict.persist.selection.length; i++) {
				var arr = MergeTable.restrict.persist.selection[i].split(MergeTable.restrict.options.separator);
				var row = arr[0];
				var col = arr[1];
				if (MergeTable.restrict.persist.storage[row][col]) {
					num++;
					if (flag === true)
						MergeTable.restrict.persist.storage[row][col].style.backgroundColor = MergeTable.restrict.style.bg.right;
					else
						MergeTable.restrict.persist.storage[row][col].style.backgroundColor = MergeTable.restrict.style.bg.wrong;
				}
			}
			if (num === 1) {
				var arr = MergeTable.restrict.persist.selection[0].split(MergeTable.restrict.options.separator);
				var row = arr[0];
				var col = arr[1];
				if (MergeTable.restrict.persist.storage[row][col]) {
					MergeTable.restrict.persist.storage[row][col].style.backgroundColor = MergeTable.restrict.style.bg.normal;
				}
			}
		},
		clearSelection: function() {
			for (var i = 0; i < MergeTable.restrict.persist.selection.length; i++) {
				var arr = MergeTable.restrict.persist.selection[i].split(MergeTable.restrict.options.separator);
				var row = arr[0];
				var col = arr[1];
				if (MergeTable.restrict.persist.storage[row][col])
					MergeTable.restrict.persist.storage[row][col].style.backgroundColor = "";
			}
			MergeTable.restrict.persist.selection = [];
		},
		checkSelection: function() {
			var range = MergeTable.restrict.persist.getRange();
			if (MergeTable.restrict.persist.checkRangeAviliable(range)) {
				var minX = range.minX;
				var maxX = range.maxX;
				var minY = range.minY;
				var maxY = range.maxY;
				var count = 0;
				var height = 0;
				for (var y = minY; y <= maxY; y++) {
					if (MergeTable.restrict.persist.storage[y]) {
						var width = 0;
						for (var x = minX; x <= maxX; x++) {

							if (MergeTable.restrict.persist.storage[y][x]) {
								var cell = MergeTable.restrict.persist.storage[y][x];
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
							if (MergeTable.restrict.persist.storage[y]) {
								if (MergeTable.restrict.persist.storage[y][x])
									height += MergeTable.restrict.persist.storage[y][x].rowSpan;
							}
						}
						if (height > maxY - minY + 1)
							return false;
					}
				}
				return true;
			}
		},
		checkSelectionOne: function() {
			var exist = false;
			var num = 0;
			for (var i = 0; i < MergeTable.restrict.persist.selection.length; i++) {
				if (MergeTable.restrict.persist.selection[i] === MergeTable.restrict.persist.range.start)
					exist = true;
				var arr = MergeTable.restrict.persist.selection[i].split(MergeTable.restrict.options.separator);
				var y = arr[0];
				var x = arr[1];
				if (MergeTable.restrict.persist.storage[y][x])
					num++;
			}
			return exist && num === 1;
		}
	}
};


function onCellMouseOver(e) {
	e = e || window.event;
	var ele = e.srcElement || e.currentTarget;
	var tagNameV = ele.tagName.toLowerCase();
	if (tagNameV === "td" || tagNameV === "th") {
		if (MergeTable.restrict.persist.mouse.status === 0) {
			var rowIndex = ele.parentNode.rowIndex;
			var index;
			for (var i = 0; i < MergeTable.restrict.persist.storage[rowIndex].length; i++) {
				if (ele == MergeTable.restrict.persist.storage[rowIndex][i])
					index = rowIndex + MergeTable.restrict.options.separator + i;
			}
			MergeTable.restrict.persist.range.end = index;
			MergeTable.restrict.persist.clearSelection();
			MergeTable.restrict.persist.select();
			MergeTable.restrict.persist.renderSelection();
		}
	}
};

function onCellMouseUp(e) {
	e = e || window.event;
	MergeTable.restrict.persist.mouse.status = -1;
};

function onCellMouseDown(e) {
	MergeTable.restrict.persist.clearSelection();
	e = e || window.event;
	var ele = e.srcElement || e.currentTarget;
	var tagName = ele.tagName.toLowerCase();
	if (tagName === "td" || tagName === "th") {
		var rowIndex = ele.parentNode.rowIndex;
		var index;
		for (var i = 0; i < MergeTable.restrict.persist.storage[rowIndex].length; i++) {
			if (ele == MergeTable.restrict.persist.storage[rowIndex][i])
				index = rowIndex + MergeTable.restrict.options.separator + i;
		}
		MergeTable.restrict.persist.range.start = index;
		MergeTable.restrict.persist.selection.push(index);
		MergeTable.restrict.persist.mouse.status = 0;
		ele.style.backgroundColor = MergeTable.restrict.style.bg.normal;
	}
};

AttachEvent(window, "load", Init, false);

function Init() {
	var table = document.getElementById("etable");
	var rows = table.rows;
	for (var i = 0; i < rows.length; i++) {
		var index = 0;
		for (var j = 0; j < rows[i].cells.length; j++) {
			var oIndex = index;
			var cell = rows[i].cells[j];

			// TODO 重复事件添加剥离为方法
			AttachEvent(cell, "mousedown", onCellMouseDown, false);
			AttachEvent(cell, "mouseup", onCellMouseUp, false);
			AttachEvent(cell, "mouseover", onCellMouseOver, false);

			if (!MergeTable.restrict.persist.storage[i])
				MergeTable.restrict.persist.storage[i] = [];
			if (MergeTable.restrict.persist.storage[i][index] === null) {
				var wIndex = index;
				while (MergeTable.restrict.persist.storage[i][wIndex] === null)
					wIndex++;
				MergeTable.restrict.persist.storage[i][wIndex] = cell;
				var max = 0;
				for (var b = 0; b < MergeTable.restrict.persist.storage[i].length; b++) {
					if (MergeTable.restrict.persist.storage[i][b] !== null && MergeTable.restrict.persist.storage[i][b] !== undefined)
						max = b;
				}
				oIndex = index = max;
			} else {
				MergeTable.restrict.persist.storage[i][index] = cell;
			}
			if (cell.rowSpan > 1 || cell.colSpan > 1) {
				if (!MergeTable.restrict.persist.place[i])
					MergeTable.restrict.persist.place[i] = [];
				MergeTable.restrict.persist.place[i].push(cell);
			}

			if (cell.colSpan > 1) {
				for (var m = 1; m <= cell.colSpan - 1; m++) {
					MergeTable.restrict.persist.storage[i][index + m] = null;
				}
				index = index + cell.colSpan;
			} else
				index++;
			if (cell.rowSpan > 1) {
				for (var n = 1; n <= cell.rowSpan - 1; n++) {
					if (!MergeTable.restrict.persist.storage[i + n]) {
						MergeTable.restrict.persist.storage[i + n] = [];
					}
					for (var m = 0; m < cell.colSpan; m++) {
						MergeTable.restrict.persist.storage[i + n][oIndex + m] = null;
					}
				}
			}
		}
	}
};