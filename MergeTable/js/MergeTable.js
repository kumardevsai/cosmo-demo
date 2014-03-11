"use strict";

var MergeTable = window.MergeTable = function() {};

MergeTable.restrict = {
	style: {
		bg: {
			wrong: "red",
			right: "green"
		}
	},
	options: {
		maxRows: 11,
		mxwCols: 21,
		separator: "_"
	},
	persist: {
		storage: [],
		place: [],
		selection: [],
		range: {
			start　: null,
			end: null
		},
		position: {
			start: {
				x: null,
				y: null
			},
			end: {
				x: null,
				y: null
			}
		},
		mouse: {
			status: -1
		},
		select: function() {
			if (MergeTable.restrict.persist.range.start && MergeTable.restrict.persist.range.end) {
				var startArray = MergeTable.restrict.persist.range.start.split(MergeTable.restrict.options.separator);
				var startCoords = {
					y: startArray[0],
					x: startArray[1]
				};
				var endArray = MergeTable.restrict.persist.range.end.split(MergeTable.restrict.options.separator);
				var endCoords = {
					y: endArray[0],
					x: endArray[1]
				};
				var minX;
				var maxX;
				var minY;
				var maxY;
				if (startCoords.x > endCoords.x) {
					maxX = startCoords.x;
					minX = endCoords.x;
				} else if (startCoords.x < endCoords.x) {
					maxX = endCoords.x;
					minX = startCoords.x;
				} else {
					minX = maxX = startCoords.x;
				}
				if (startCoords.y > endCoords.y) {
					maxY = startCoords.y;
					minY = endCoords.y;
				} else if (startCoords.y < endCoords.y) {
					maxY = endCoords.y;
					minY = startCoords.y;
				} else {
					minY = maxY = startCoords.y;
				}
				for (var i = minY; i <= maxY; i++) {
					for (var j = minX; j <= maxX; j++) {
						MergeTable.restrict.persist.selection.push(i + MergeTable.restrict.options.separator + j);
					}
				}
			}
		},
		renderSelection: function() {
			for (var i = 0; i < MergeTable.restrict.persist.selection.length; i++) {
				var arr = MergeTable.restrict.persist.selection[i].split(MergeTable.restrict.options.separator);
				var row = arr[0];
				var col = arr[1];
				if (MergeTable.restrict.persist.storage[row][col])
					MergeTable.restrict.persist.storage[row][col].style.backgroundColor = MergeTable.restrict.style.bg.right;
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
		checkSeleection: function() {}
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
			MergeTable.restrict.persist.position.end = {
				x: e.pageX,
				y: e.pageY
			};
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
		MergeTable.restrict.persist.mouse.status = 0;
		MergeTable.restrict.persist.position.start = {
			x: e.pageX,
			y: e.pageY
		};
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