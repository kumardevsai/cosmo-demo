/**
	��֪�����bug�������ڶ��thead/tbody/tfootʱ��rowIndex��׼ȷ
**/
/**
	TODO 
	1.�����Ż�
	2.��bug��δ����
	3.��Ԫ��ߴ�ļ��㣨����С�����У�(�ƻ��Ƴ�)
	4.���ڵ�Ԫ��ѡ��ʱ���Զ�����ʽ�������Ǳ���ɫ���������߱߿�͸���ȵȣ�
	5.ʵ�־��Ե�������ѡ������������ʾѡ������ȷ��ʾ��ɫ��
**/
"use strict";

var MergeTable = window.MergeTable = (function() {
	var id;

	var _toString = Object.prototype.toString;

	var utils = {
		// ����¼�
		attachEvent: function(cell) {
			AttachEvent(cell, "mousedown", onCellMouseDownProxy(cell), false);
			AttachEvent(cell, "mouseup", onCellMouseUp, false);
			AttachEvent(cell, "mouseover", onCellMouseOver, false);
		}
	};

	var defaults = {
		// ����  
		wrong: "red",
		// ��ȷ
		right: "green",
		// �����Ԫ����ʾ����ɫ
		normal: "#e4e4e4",
		// �ָ���
		separator: "_",
		// �ϲ���Ԫ����ʾ��Ϣ
		mergeMsg: "��ѡ����Ч�ĵ�Ԫ����кϲ�!",
		// �ϲ���Ԫ��ʱ�Ƿ񱣴汻���ٵĵ�Ԫ�������
		retainMergeText: true,
		// ��Ԫ��ֱ�����ʾ��Ϣ
		splitVMsg: "��ǰ��Ԫ���޷����к�����!",
		// ��Ԫ��ˮƽ�����ʾ��Ϣ
		splitHMsg: "��ǰ��Ԫ���޷�����������!",
		// ֻ��ѡ��һ����Ԫ����ʾ��Ϣ
		oneSelectedMsg: "ֻ��ѡ��һ����Ԫ��!",
		// ɾ������ʾ
		deleteRowMsg: "��ѡ����Ч�н���ɾ��!",
		// ɾ������ʾ
		deleteColMsg: "��ѡ����Ч�н���ɾ��!",
		// û��ѡ���κε�Ԫ��
		selectionNullMsg: "��ѡ��Ԫ��!",
		// ���ø�ʽˢʱ��Ԫ�����ʽ(ѡ����ȷ)
		brushright: '2px dashed green',
		// �����Ƿ��Ƴ�
		nullRowRomoved: true,
		// �в�������ʾ
		noRowExist: "�Բ����в�����!",
		// ��ʾ��Ԫ��excel�±��inputԪ��
		indexInput: null,
		// ��ʾ��Ԫ��ʽ��inputԪ��
		formulaInput: null,
		// ��ʽ����
		fmla: "formula"
	};

	// ���ݴ洢
	var persist = {
		// ��Ԫ���ά����
		storage: [],
		// ����ʼ����colSpan �� rowSpan����1�ĵ�Ԫ�������ռλ
		place: [],
		// ��ǰ��ѡ��ĵ�Ԫ���±�����
		selection: [],
		// ��ǰ���ڱ༭״̬�ĵ�Ԫ���±�
		edition: {},
		// ��ѡ��ĵ�Ԫ��ķ�Χ
		range: {
			// ��ʼ��Ԫ����갴��ʱ�ĵ�Ԫ���±�
			start: null,
			// ������Ԫ�����̧��ʱ�ĵ�Ԫ���±�
			end: null
		},
		// ���
		mouse: {
			// ���״̬ -1��ʾ���̧�� �� 0 ��ʾ��갴��
			status: -1
		},
		// ��ѡ��ĵ�Ԫ������ʽ����
		// TODO ������
		backupAttrs: {},
		// ��ʽˢ
		brush: {
			// ��ʽˢ������-1 �� ʹ����0
			status: -1,
			// ��ʽ��Ԫ��δѡ��-1 �� �Ѿ�ѡ��0
			selected: -1,
			// ��ʽ��Ԫ����ʽ
			selectedAttrs: {}
		},
		originStr: null

	};

	function PersistAttr(css, tdType, cls) {
		this.css = css !== null && css !== undefined ? css : null;
		this.tdType = tdType ? tdType : null;
		this.cls = cls !== null && cls !== undefined ? cls : null;
	};

	// ��ȡͬ��ǰ�ò�Ϊ�յĵ�Ԫ��
	function getPreviousSiblingStorageElementNotNull(y, x) {
		var x_ = x - 1;
		if (x_ >= 0) {
			while (!persist.storage[y][x_]) {
				x_--;
				if (x_ < 0)
					break;
			}
		}
		// ���صĽ������Ϊnull �� �����ڵ��ú�����Ҫ�����ж�
		return persist.storage[y][x_];
	};

	// ת����ά����
	function selectionTrans2ArrayStack(selection) {
		selection = selection ? selection : persist.selection;
		var selection2Array = [];
		// ������ѡ��ĵ�Ԫ����±�����
		for (var i = 0; i < selection.length; i++) {
			// ��ֵ�Ԫ���±�
			var y = selection[i].split(defaults.separator)[0];
			// ��������
			if (!selection2Array[y])
				selection2Array[y] = [];
			// ���뵥Ԫ���±�ֵ
			selection2Array[y].push(selection[i]);
		}
		// ��Ԫ������
		var selection2ArrayStack = [];
		// ��ʼ����Ϊ0
		var index = 0;
		for (var i in selection2Array) {
			selection2ArrayStack[index] = selection2Array[i];
			index++;
		}
		return selection2ArrayStack;
	};

	// �ϲ���Ԫ��
	function merge() {
		// ��Ԫ���Ƿ���Ժϲ�
		if (checkMerge()) {
			var selection2ArrayStack = selectionTrans2ArrayStack();
			// �ܹ�������
			var totalColSpan = 0;
			// �ܹ�������
			var totalRowSpan = 0;
			// �ı�
			var text = "";
			// ������Ԫ��
			for (var i = 0; i < selection2ArrayStack[0].length; i++) {
				// ����±��ȡ��Ԫ��
				var arr = selection2ArrayStack[0][i].split(defaults.separator);
				var y = arr[0];
				var x = arr[1];
				// �����Ԫ�����
				if (persist.storage[y][x])
				// ��������
					totalColSpan += persist.storage[y][x].colSpan;
			}
			// ������Ԫ��
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					if (persist.storage[y][x]) {
						// �����Ҫ�����ı�
						if (defaults.retainMergeText)
						// �ı�����
							text += persist.storage[y][x].innerHTML.Trim();
						// ����ǵ�һ��
						if (j === 0) {
							// ����������
							totalRowSpan += persist.storage[y][x].rowSpan;
							// �����Ԫ�����������1
							if (selection2ArrayStack[i][0].rowSpan > 1)
							// �����м���
								i = i + persist.storage[y][x].rowSpan - 1;
						}
					}
				}
			}
			// ѡ���ÿ�
			persist.selection = [];
			// ����
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					var arr = selection2ArrayStack[i][j].split(defaults.separator);
					var y = arr[0];
					var x = arr[1];
					// �����Ԫ�����
					if (persist.storage[y][x]) {
						// ѡ�������Ͻǵ�Ԫ��
						if (i === 0 && j === 0) {
							// ��ӵ�ѡ������
							persist.selection.push(selection2ArrayStack[i][j]);
							persist.storage[y][x].rowSpan = totalRowSpan;
							persist.storage[y][x].colSpan = totalColSpan;
							// ��������ı�
							if (defaults.retainMergeText)
								persist.storage[y][x].innerHTML = text.Trim();
							// ��ԭ����ɫ
							persist.storage[y][x].style.backgroundColor = defaults.normal;
							// TODO style.width and style.height
							// ����ѡ����ʼ
							persist.range.start = selection2ArrayStack[i][j];
							// ����ѡ������
							persist.range.end = selection2ArrayStack[i][j];
						} else {
							// �Ƴ���Ԫ��
							persist.storage[y][x].parentNode.removeChild(persist.storage[y][x]);
							// ���ö�Ӧ�±�ĵ�Ԫ��Ϊ��
							persist.storage[y][x] = null;
						}
					}
				}
			}
			setFormulas();
			setFormulaStorage();
			var result_arr = ExcelFormula.caculate(TableUtils.index2Tag(persist.selection[0]));
			useResult(result_arr);
		} else {
			// ��ʾ������Ϣ
			alert(defaults.mergeMsg);
			return;
		}
	};

	// �����Ԫ��ĸ�ʽ����ȫ���
	function clearMerge() {
		// ��ǰ�Ƿ�ֻѡ����һ����Ԫ��
		if (checkSelectionOne()) {
			var obj = TableUtils.index2Obj(persist.range.start);
			// ��ȫ��ֵ�Ԫ�����
			clearMergeHandler(obj.y, obj.x);

			refreshForlumaAndStorage();
		} else {
			// ��ʾ������Ϣ
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	// ��ȫ��ֵ�Ԫ��Ĳ���
	function clearMergeHandler(y, x) {
		// ��һ��
		var nextRow = null;
		// ��Ԫ��
		var cell = persist.storage[y][x];
		// ��������
		for (var i = 0; i < cell.rowSpan; i++) {
			if (i === 0)
				nextRow = cell.parentNode;
			else
				nextRow = TableUtils.nextRow(nextRow);
			// ���б���
			for (var j = 0; j < cell.colSpan; j++) {
				if (j === 0 && i === 0)
					continue;
				else {
					// ������Ԫ�񲢲���
					var insertCell = document.createElement(cell.tagName.toLowerCase());
					// ��ȡǰ�õ�Ԫ��
					var previousElement = getPreviousSiblingStorageElementNotNull(y + i, x + j);
					// �������
					if (previousElement) {
						// ��ȡ���õ�Ԫ��
						if (TableUtils.nextSibling(previousElement))
							nextRow.insertBefore(insertCell, TableUtils.nextSibling(previousElement));
						else
							nextRow.appendChild(insertCell);
					} else {
						if (TableUtils.firstChild(nextRow))
							nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow))
						else
							nextRow.appendChild(insertCell);
					}
					// ����
					persist.storage[y + i][x + j] = insertCell;
					// ����¼�
					utils.attachEvent(insertCell);
				}
			}
		}
		cell.rowSpan = 1;
		cell.colSpan = 1;
	};

	// ��鵥Ԫ���Ƿ���Ա���ȫ���
	function checkMerge() {
		if (checkSelection() && persist.selection.length > 1)
			return true;
		else
			return false;
	};

	// ������
	function splitVHandler(y, x) {
		// ��ȡ��Ԫ��
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
				if (TableUtils.nextSibling(beforeCell))
					beforeCell.parentNode.insertBefore(insertCell, TableUtils.nextSibling(beforeCell));
				else
					beforeCell.parentNode.appendChild(insertCell);
			} else {
				TableUtils.nextRow(cell.parentNode).insertBefore(insertCell, TableUtils.firstChild(TableUtils.nextRow(cell.parentNode)));
			}
		} else if (i === -1) {
			var nextTr;
			var rowSpan1_ = rowSpan1;
			while (rowSpan1_ >= 1) {
				if (!nextTr)
					nextTr = TableUtils.nextRow(cell.parentNode);
				else
					nextTr = TableUtils.nextRow(nextTr);
				rowSpan1_--;
			}
			nextTr.insertBefore(insertCell, TableUtils.firstChild(nextTr));
		}
		utils.attachEvent(insertCell);
		persist.storage[nextRowIndex][x] = insertCell;
	};

	function splitV() {
		if (checkSplitV()) {
			var obj = TableUtils.index2Obj(persist.range.start);
			splitVHandler(obj.y, obj.x);
			refreshForlumaAndStorage();
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
		cell.parentNode.insertBefore(insertCell, TableUtils.nextSibling(cell));
		utils.attachEvent(insertCell);
		persist.storage[y][x + colSpan1] = insertCell;
	};

	function splitH() {
		if (checkSplitH()) {
			var obj = TableUtils.index2Obj(persist.range.start);
			splitHHandler(obj.y, obj.x);
			refreshForlumaAndStorage();
		} else {
			alert(defaults.splitHMsg);
			return;
		}
	};

	function addRowTopHandler(y, x) {
		var cell = persist.storage[y][x];
		var len = persist.storage[y].length;
		// TODO ��Ӷ���
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
		// �˴��޸���ǰ��Ԫ��ʧ��ʽ������
		var regionIndex_ = getIndexByElement(cell.parentNode.parentNode);
		var oldIndex = y + defaults.separator + x + defaults.separator + regionIndex_;
		persist.range.start = y + 1 + defaults.separator + x + defaults.separator + regionIndex_;
		persist.backupAttrs[persist.range.start] = persist.backupAttrs[oldIndex];
		delete persist.backupAttrs[oldIndex];
		persist.selection = [persist.range.start];
	};

	function addRowTop() {
		if (checkSelectionOne()) {
			var obj = TableUtils.index2Obj(persist.range.start);
			addRowTopHandler(obj.y, obj.x);
			refreshForlumaAndStorage();
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function addRowBottomHandler(y, x) {
		var cell = persist.storage[y][x];
		var rowNum = persist.storage.length;
		var len = persist.storage[y].length;
		// TODO ��Ӷ���
		var insertStorage = [];
		insertStorage[0] = [];
		var insertRow = document.createElement(cell.parentNode.tagName.toLowerCase());
		if (!TableUtils.nextRow(cell.parentNode))
			cell.parentNode.parentNode.appendChild(insertRow);
		else {
			var index_ = y + cell.rowSpan;
			var nextSiblingTr;
			while (index_ !== y) {
				if (!nextSiblingTr)
					nextSiblingTr = TableUtils.nextRow(cell.parentNode);
				else
					nextSiblingTr = TableUtils.nextRow(nextSiblingTr);
				index_--;
			}
			if (nextSiblingTr.parentNode !== cell.parentNode.parentNode)
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
			var obj = TableUtils.index2Obj(persist.range.start);
			addRowBottomHandler(obj.y, obj.x);
			refreshForlumaAndStorage();
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
							nextRow = TableUtils.nextRow(mergeCell.parentNode);
						else
							nextRow = TableUtils.nextRow(nextRow);
						var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
						if (m === 0) {
							nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
						} else {
							var l = 0;
							var preCell = persist.storage[y + i][m - 1];
							while (!preCell) {
								l++;
								if (m - 1 - l < 0) {
									preCell = TableUtils.firstChild(nextRow);
								} else
									preCell = persist.storage[y + i][m - 1 - l];
							}
							nextRow.insertBefore(insertCell, TableUtils.nextSibling(preCell));
						}
						utils.attachEvent(insertCell);
						persist.storage[y + i][m] = insertCell;
					}
				}
				if (mergeCell.colSpan > 1) {
					var nextRow = null;
					for (var i = 1; i < mergeCell.rowSpan; i++) {
						if (!nextRow)
							nextRow = TableUtils.nextRow(mergeCell.parentNode);
						else
							nextRow = TableUtils.nextRow(nextRow);
						for (var j = 0; j < mergeCell.colSpan - 1; j++) {
							var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
							nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[y + i][m + j]));
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
									// ��Ҫ���ǵ���ֵ֮�������������
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
				} else { // ��Ҫ���ǵ���ֵ֮�������������
					m += persist.storage[y][m - 1].colSpan - 1 - 1;
				}
			}
		}
		persist.storage.splice(y, 1);
		persist.start = null;
		persist.selection = [];
		// ���Ҫɾ����
		if (removeRow === true) {
			// ��ȡ��
			var row = getRow(y);
			// ɾ��
			row.parentNode.removeChild(row);
		} else
		// ɾ����Ԫ��
			cell.parentNode.parentNode.removeChild(cell.parentNode);
	};

	function deleteRow() {
		if (checkSelection()) {
			var selection2ArrayStack = selectionTrans2ArrayStack();
			var y;
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				var obj = TableUtils.index2Obj(selection2ArrayStack[i][0]);
				if (i === 0)
					y = obj.y;
				deleteRowHandler(y, obj.x);
			}
			refreshForlumaAndStorage();
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
							currentCell = TableUtils.nextSibling(mergeCell);
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
								nextRow = TableUtils.nextRow(mergeCell.parentNode);
							else
								nextRow = TableUtils.nextRow(nextRow);
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
									if (TableUtils.nextSibling(persist.storage[i + n][x_ - 1])) {
										nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + n][x_ - 1]));
										persist.storage[i + n][x + mergeCell.colSpan - 1 - j] = insertCell;
									} else {
										nextRow.appendChild(insertCell);
										persist.storage[i + n][x + mergeCell.colSpan - 1] = insertCell;
									}
								} else {
									if (TableUtils.firstChild(nextRow))
										nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
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
				var obj = TableUtils.index2Obj(selection2ArrayStack[0][i]);
				if (i === 0) {
					y = obj.y;
					x = obj.x;
				}
				deleteColHandler(y, x);
			}
			refreshForlumaAndStorage();
		} else {
			alert(defaults.deleteColMsg);
			return;
		}
	};

	function addColLeftHandler(y, x, arr) {
		var cell = persist.storage[y][x];
		var regionIndex = getIndexByElement(cell.parentNode.parentNode);
		if (x === 0) {
			var nextRow = null;
			for (var i = 0; i < persist.storage.length; i++) {
				if (i === 0)
					nextRow = persist.storage[i][0].parentNode;
				else
					nextRow = TableUtils.nextRow(nextRow);
				var insertCell = document.createElement(cell.tagName.toLowerCase());
				if (TableUtils.firstChild(nextRow))
					nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
				else
					nextRow.appendChild(insertCell);
				persist.storage[i].splice(0, 0, insertCell);
				utils.attachEvent(insertCell);
			}
			var newIndex = y + defaults.separator + (x + 1) + defaults.separator + regionIndex;
			persist.range.start = newIndex;
			persist.selection = [newIndex];
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
							if (TableUtils.nextSibling(mergeCell))
								mergeCell.parentNode.insertBefore(insertCell, TableUtils.nextSibling(mergeCell));
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
										nextRow = TableUtils.nextRow(mergeCell.parentNode);
									else
										nextRow = TableUtils.nextRow(nextRow);
									var x_1 = x_ - 1;
									if (x_1 >= 0) {
										while (!persist.storage[i + k][x_1]) {
											x_1--;
											if (x_1 < 0)
												break;
										}
									}
									if (persist.storage[i + k][x_1]) {
										if (TableUtils.nextSibling(persist.storage[i + k][x_1]))
											nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + k][x_1]));
										else
											nextRow.appendChild(insertCell);
									} else {
										if (TableUtils.firstChild(nextRow))
											nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
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
											nextRow = TableUtils.nextRow(nextRow);
									}
									var insertCell = document.createElement(persist.storage[i]

										[xx_].tagName.toLowerCase());
									utils.attachEvent(insertCell);
									if (o === 0) {
										if (TableUtils.nextSibling(persist.storage[i + o][xx_]))
											nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + o][xx_]));
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
											if (TableUtils.nextSibling(persist.storage[i + o][preX]))
												nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + o][preX]));
											else
												nextRow.appendChild(insertCell);
										} else {
											if (TableUtils.firstChild(nextRow))
												nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
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
		var oldIndex = y + defaults.separator + arr[1] + defaults.separator + regionIndex;
		if (persist.backupAttrs.hasOwnProperty(oldIndex)) {
			persist.backupAttrs[persist.range.start] = persist.backupAttrs[oldIndex];
			delete persist.backupAttrs[oldIndex];
		}
	};

	function addColLeft() {
		if (checkSelectionOne()) {
			var obj = TableUtils.index2Obj(persist.range.start);
			addColLeftHandler(obj.y, obj.x, [obj.y, obj.x]);
			refreshForlumaAndStorage();
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
					if (TableUtils.nextSibling(mergeCell))
						mergeCell.parentNode.insertBefore(insertCell, TableUtils.nextSibling(mergeCell));
					else
						mergeCell.parentNode.appendChild(insertCell);
					persist.storage[i].splice(x_, 0, insertCell);
					if (mergeCell.rowSpan > 1) {
						var nextRow = null;
						for (var k = 1; k < mergeCell.rowSpan; k++) {
							var insertCell = document.createElement(mergeCell.tagName.toLowerCase());
							utils.attachEvent(insertCell);
							if (!nextRow)
								nextRow = TableUtils.nextRow(mergeCell.parentNode);
							else
								nextRow = TableUtils.nextRow(nextRow);
							var x_1 = x_ - 1;
							if (x_1 >= 0) {
								while (!persist.storage[i + k][x_1]) {
									x_1--;
									if (x_1 < 0)
										break;
								}
							}
							if (persist.storage[i + k][x_1]) {
								if (TableUtils.nextSibling(persist.storage[i + k][x_1]))
									nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + k][x_1]));
								else
									nextRow.appendChild(insertCell);
							} else {
								if (TableUtils.firstChild(nextRow))
									nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
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
									nextRow = TableUtils.nextRow(nextRow);
							}
							var insertCell = document.createElement(persist.storage[i]

								[xx_].tagName.toLowerCase());
							utils.attachEvent(insertCell);
							if (o === 0) {
								if (TableUtils.nextSibling(persist.storage[i + o][xx_]))
									nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + o][xx_]));
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
									if (TableUtils.nextSibling(persist.storage[i + o][preX]))
										nextRow.insertBefore(insertCell, TableUtils.nextSibling(persist.storage[i + o][preX]));
									else
										nextRow.appendChild(insertCell);
								} else {
									if (TableUtils.firstChild(nextRow))
										nextRow.insertBefore(insertCell, TableUtils.firstChild(nextRow));
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
			var obj = TableUtils.index2Obj(persist.range.start);
			addColRightHandler(obj.y, obj.x, [obj.y, obj.x]);
			refreshForlumaAndStorage();
		} else {
			alert(defaults.oneSelectedMsg);
			return;
		}
	};

	function checkSplitH() {
		var obj = TableUtils.index2Obj(persist.range.start);
		var cell = persist.storage[obj.y][obj.x];
		var colSpan_ = cell.colSpan;
		if (checkSelectionOne() && colSpan_ > 1)
			return true;
		else
			return false;
	};

	function checkSplitV() {
		var obj = TableUtils.index2Obj(persist.range.start);
		var cell = persist.storage[obj.y][obj.x];
		var rowSpan_ = cell.rowSpan;
		if (checkSelectionOne() && rowSpan_ > 1)
			return true;
		else
			return false;
	};

	// ������ݱ���
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
			// TODO �����жϲ����
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
				if (persist.brush.selectedAttrs[persist.selection[i]] !== undefined) {
					continue;
				} else {
					// ��Ԫ����ʽ����
					if (!persist.backupAttrs[persist.selection[i]]) {
						persist.backupAttrs[persist.selection[i]] = new PersistAttr(persist.storage[row][col].style.cssText, persist.storage[row][col].getAttribute("td_type"), persist.storage[row][col].className);
					}
					num++;
					if (checkBrushFormatOpened() && checkBrushSelected()) {
						var sty = "";
						var td_type = null;
						var cls = null;
						for (var m in persist.brush.selectedAttrs) {
							sty = persist.brush.selectedAttrs[m].css;
							td_type = persist.brush.selectedAttrs[m].tdType;
							cls = persist.brush.selectedAttrs[m].cls;
							break;
						}
						persist.storage[row][col].style.cssText = sty;
						if (td_type !== null)
							persist.storage[row][col].setAttribute("td_type", td_type);
						else
							persist.storage[row][col].removeAttribute("td_type");
						if (cls !== null)
							persist.storage[row][col].className = cls;
						else
							persist.storage[row][col].className = "";
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
		// ����ѡ��
		for (var i = 0; i < persist.selection.length; i++) {
			var obj = TableUtils.index2Obj(persist.selection[i]);
			var row = obj.y;
			var col = obj.x;
			// ��Ԫ�����
			if (persist.storage[row][col]) {
				// ��ʽ��ʽ��Ԫ�񲻱仯
				if (persist.brush.selectedAttrs[persist.selection[i]] !== undefined) {

				} else {
					if (persist.backupAttrs[persist.selection[i]]) {
						persist.storage[row][col].style.cssText = persist.backupAttrs[persist.selection[i]].css;
						if (persist.backupAttrs[persist.selection[i]].tdType !== null)
							persist.storage[row][col].setAttribute("td_type", persist.backupAttrs[persist.selection[i]].tdType);
						else
							persist.storage[row][col].removeAttribute("td_type");
						if (persist.backupAttrs[persist.selection[i]].cls !== null)
							persist.storage[row][col].className = persist.backupAttrs[persist.selection[i]].cls;
						else
							persist.storage[row][col].className = "";
					} else {
						persist.storage[row][col].style.cssText = "";
					}
				}
			}
		}
		persist.selection = [];
		persist.backupAttrs = {};
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

	function checkCellHaveEditableInput(index, ele) {
		var flag = false;
		for (var i in persist.edition) {
			if (i === index && persist.edition[i]) {
				flag = true;
				break;
			}
		}
		if (ele.innerHTML.toLowerCase().indexOf("<input") !== -1)
			flag = true;
		return flag;
	};

	function contentEditable(ele, index) {
		if (checkCellHaveEditableInput(index, ele))
			return;
		var input = document.createElement("input");
		input.type = "text";
		input.style.cssText = "width:100%;height:100%";
		input.className = "cell_input";
		var height_ = ele.offsetHeight;
		var width_ = ele.offsetWidth;
		input.style.height = (height_ - 5) + "px";
		input.style.width = (width_ - 3) + "px";
		input.value = ele.getAttribute("realvalue") !== null || ele.getAttribute("showformat") !== null ? (ele.getAttribute("realvalue") !== null? ele.getAttribute("realvalue"): "") : ele.innerHTML;
		ele.innerHTML = "";
		ele.appendChild(input);
		AttachEvent(input, "click", function(e) {
			document.getElementById(id).onselectstart = function() {};
			TableUtils.preventEvent(e);
		}, false);
		AttachEvent(input, "focus", function(e) {
			document.getElementById(id).onselectstart = function() {};
			TableUtils.preventEvent(e);
		}, false);
		AttachEvent(input, "mousedown", function(e) {
			document.getElementById(id).onselectstart = function() {};
			TableUtils.preventEvent(e);
		}, false);
		// TODO IE8 ������Ԫ�񶶶� !
		if (input)
			setTimeout(function() {
				try {
					input.focus();
					// ��տɱ༭�ı���Ļ�������
					persist.edition = {};
					// ����ǰ��ʾ���ı�����ӵ����黺����
					persist.edition[index] = input;
					document.getElementById(id).onselectstart = function() {};
				} catch (e) {}
			}, 0);
		// �ı���ʧȥ������ʧ
		AttachEvent(input, "blur", function() {
			setTimeout(function() {
				var cellTd = input.parentNode;
				var inputValue = input.value.Trim();
				if (cellTd) {
					// ���ı����е�ֵȡ����ӵ���Ԫ����ʾ
					cellTd.removeChild(input);
					if (cellTd.getAttribute("realvalue") !== null || cellTd.getAttribute("showformat")) {
						cellTd.setAttribute("realvalue", inputValue);
						if (cellTd.getAttribute("showformat") !== null) {
							showFormatterValue(cellTd);
						}
					} else
						cellTd.innerHTML = inputValue;
				}
				// ��տɱ༭�ı���Ļ�������
				persist.edition = {};

				ExcelFormula.updateOneStorage({
					key: TableUtils.index2Tag(index),
					val: inputValue
				});

				var result_arr = ExcelFormula.caculate(TableUtils.index2Tag(index));
				useResult(result_arr);

			}, 0);
		}, false);

		AttachEvent(input, "keydown", InputKeyDown, false);
	};

	var InputKeyDown = function(evt) {
		var e = window.event || evt;
		var key = e.keyCode;
		var evtSrc;
		if (document.all)
			evtSrc = e.srcElement;
		else
			evtSrc = e.currentTarget;
		// copy.
		if (e.ctrlKey && (key == 67 || key == 99)) {}
		// paste.
		if (e.ctrlKey && (key == 86 || key == 118)) {
			e.keyCode = 0;
			AffixSingleColumn(evtSrc);
			// ʧȥ�������Դ�����ʽ�ļ���
			evtSrc.blur();
			refreshForlumaAndStorage();
			// ��ֹĬ���¼�
			TableUtils.preventEvent(e);
		}
	};

	// ��ȡճ�������ݣ���֧��IE
	function getClipboard() {
		if (window.clipboardData) {
			return (window.clipboardData.getData('Text'));
		}
	};

	// ճ������
	function AffixSingleColumn(evt) {
		var content = getClipboard();
		if (content === undefined)
			return;
		var valArray = content.split("\n");
		var valArrayLen = valArray.length;
		if (evt.parentElement == null) return;
		var index = getCellIndex(evt.parentNode);
		var indexObj = TableUtils.index2Obj(index)
		var rowindex = indexObj.y;
		var cellindex = indexObj.x;

		for (var j = 0; j < valArrayLen; j++) {
			if (valArray[j] == "") continue;
			var arry = valArray[j].split("\t");
			for (var i = 0; i < arry.length; i++) {
				if (persist.storage[rowindex + j]) {
					var cell = persist.storage[rowindex + j][cellindex + i];
					if (cell) {
						var inps = cell.getElementsByTagName('input');
						if (inps.length > 0) {
							cell.children[0].value = arry[i].trim();
						} else {
							if (cell.getAttribute("realvalue") !== null || cell.getAttribute("showformat")) {
								cell.setAttribute("realvalue", arry[i].trim());
								if (cell.getAttribute("showformat"))
									showFormatterValue(cell);
							}
							cell.innerHTML = arry[i].trim();
						}
					}
				}
			}
		}
	};

	// ������Ŀɱ༭״̬
	function clearEditable() {
		for (var i in persist.edition) {
			var input = persist.edition[i];
			if (input && input.parentNode) {
				var val = input.value.Trim();
				var cell = input.parentNode;
				if (cell.getAttribute("realvalue") || cell.getAttribute("showformat")) {
					cell.setAttribute("realvalue", val);
					if (cell.getAttribute("showformat"))
						showFormatterValue(cell);
				} else
					cell.innerHTML = val;
			}
		}
	};

	// ����ʼ��
	function init(id_, str, options) {
		id = id_;
		for (var i in options) {
			if (options.hasOwnProperty(i))
				defaults[i] = options[i];
		}
		if (str) {
			persist.originStr = str;
			create(str, false);
		}
		// ���¼������ӵ�body��
		AttachEvent(document.body, "keydown", clearSelectionInnerHTML, false);
		if (defaults.formulaInput)
			AttachEvent(defaults.formulaInput, "blur", doFormulaProxy(), false);
	};

	// delete��ݼ�ɾ����Ԫ������
	function clearSelectionInnerHTML(e) {
		e = e || window.event;
		switch (e.keyCode) {
			case 46:
				// ������ɱ༭
				clearEditable();
				var selection2ArrayStack = selectionTrans2ArrayStack();
				for (var i = 0; i < selection2ArrayStack.length; i++) {
					for (var j = 0; j < selection2ArrayStack[i].length; j++) {
						// �±����
						var obj = TableUtils.index2Obj(selection2ArrayStack[i][j]);
						// ���ڵ�Ԫ��
						if (persist.storage[obj.y][obj.x]) {
							// �������
							persist.storage[obj.y][obj.x].innerHTML = "";
							if (persist.storage[obj.y][obj.x].getAttribute("realvalue"))
								persist.storage[obj.y][obj.x].setAttribute("realvalue", "");
						}
					}
				}
				// ������ѡ��
				clearSelection();
				// ����
				refreshForlumaAndStorage();
			default:
				break;
		}
	};

	// �����Ԫ��ǰ׺
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

	// ���ر��
	function load() {
		tableChildren = {};
		var tableContainer = document.getElementById(id);
		var table = TableUtils.firstChild(tableContainer);
		if (!table)
			return;
		var theadCount = 0;
		var tbodyCount = 0;
		var tfootCount = 0;
		var thead_ = "thead";
		var tbody_ = "tbody";
		var tfoot_ = "tfoot";
		if (!table.children)
			return;
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
		var rows = TableUtils.fixedTableRows(table);
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
				showFormatterValue(cell);
			}
		}
	};

	function loadStr(str) {
		var tableContainer = document.getElementById(id);
		tableContainer.innerHTML = str;
	};

	// ���д��
	function write(str, flag) {
		if (flag === true)
			persist.originStr = str;
		create(str, true);
	};

	// �����ַ����������flag��ʾ�Ƿ���յ�ǰ�ı�񻺴�����
	function create(str, flag) {
		if (flag === true)
			clear();
		loadStr(str);
		load();
		refreshForlumaAndStorage();
	};

	function onCellMouseOver(e) {
		if (checkBrushFormatOpened() && checkBrushSelected() === false)
			return;
		document.getElementById(id).onselectstart = function() {
			return false;
		};
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		var regionIdnex = getIndexByElement(ele.parentNode.parentNode);
		var tagNameV = ele.tagName.toLowerCase();
		if (tagNameV !== "td" && tagNameV !== "th")
			return;
		if (persist.mouse.status === 0) {
			var rowIndex = TableUtils.fixedRowIndex(ele.parentNode);
			var index;
			for (var i = 0; i < persist.storage[rowIndex].length; i++) {
				if (ele == persist.storage[rowIndex][i])
					index = rowIndex + defaults.separator + i;
			}
			index += defaults.separator + regionIdnex;
			if (regionIdnex === TableUtils.index2Region(persist.range.start) || checkBrushSelected() && checkBrushFormatOpened()) {
				persist.range.end = index;
				if (persist.range.start == persist.range.end)
					setCellIndexInput(persist.range.start);
				else
					setCellRangeInput(persist.range.start, persist.range.end);
				clearSelection();
				select();
				renderSelection();
				clearEditable();
			}
		}
	};

	// ��Ԫ�񴥷�mouseup�¼�
	function onCellMouseUp(e) {
		e = e || window.event;
		var ele = e.srcElement || e.currentTarget;
		TableUtils.preventEvent(e);
		onCellMouseUpHandler(ele);
	};

	// �Ե�Ԫ������mouseup
	function onCellMouseUpHandler(ele) {
		document.getElementById(id).onselectstart = function() {};
		// ������굯��״̬
		persist.mouse.status = -1;
		// ��ձ༭����
		persist.edition = {};
		// ��ʽˢ�Ѿ�����
		if (checkBrushFormatOpened() === true) {
			// ��ʽѡ��������
			if (checkBrushSelected() === false) {
				// ��ʽѡ��״̬����
				persist.brush.selected = 0;
			} else {
				persist.selection = [];
				persist.backupAttrs = {};
				// ������ʽѡ��
				persist.brush.selected = -1;

				// ������ʽ
				for (var i in persist.brush.selectedAttrs) {
					var sty = persist.brush.selectedAttrs[i].css;
					var cls = persist.brush.selectedAttrs[i].cls;
					var td_type = persist.brush.selectedAttrs[i].tdType;
					ele.style.cssText = sty;
					var obj = TableUtils.index2Obj(i);
					persist.storage[obj.y][obj.x].style.cssText = sty;

					if (td_type !== null) {
						persist.storage[obj.y][obj.x].setAttribute("td_type", td_type);
						ele.setAttribute("td_type", td_type);
					} else {
						persist.storage[obj.y][obj.x].removeAttribute("td_type");
						ele.removeAttribute("td_type");
					}
					if (cls !== null) {
						persist.storage[obj.y][obj.x].className = cls;
						ele.className = cls;
					} else {
						persist.storage[obj.y][obj.x].className = "";
						ele.className = "";
					}

					break;
				}
				persist.brush.selectedAttrs = {};
			}
		}

		setCellIndexInput(persist.range.start);
	};

	var onCellMouseDownProxy = function(ele) {
		return function() {
			setTimeout(function() {
				onCellMouseDown(ele);
			}, 0);
		};
	};

	// ��Ԫ���Ӧ�±�����
	function getCellIndex(ele) {
		// ��Ԫ�������к�
		var rowIndex = TableUtils.fixedRowIndex(ele.parentNode);
		// ��Ԫ���Ӧ�±�
		var index = null;
		// ������Ԫ��
		for (var i = 0; i < persist.storage[rowIndex].length; i++) {
			// ��ѯ����Ӧ�ĵ�Ԫ��
			if (ele == persist.storage[rowIndex][i]) {
				// ��ȡ��Ӧ�ĵ�Ԫ���±�
				index = rowIndex + defaults.separator + i;
				break;
			}
		}
		return index;
	};

	// ��ʾcellindex��ҳ��
	function setCellIndexInput(index) {
		var str = "";
		if (index) {
			if (defaults.indexInput) {
				defaults.indexInput.value = TableUtils.index2Tag(index);
			}
		}
	};

	function setCellRangeInput(start, end) {
		var str = "";
		if (start && end) {
			if (defaults.indexInput) {
				var obj1 = TableUtils.index2Obj(start);
				var obj2 = TableUtils.index2Obj(end);
				defaults.indexInput.value = (Math.abs(obj1.y - obj2.y) + 1 + "R") + " x " + (Math.abs(obj1.x - obj2.x) + 1 + "C");
			}
		}
	};

	// ����Ԫ���Ӧ�Ĺ�ʽ��ʾ��ҳ��
	function setFmlaInput(ele) {
		if (ele) {
			if (defaults.formulaInput) {
				defaults.formulaInput.value = ele.getAttribute(defaults.fmla) ? unescape(ele.getAttribute(defaults.fmla)) : "";
			}
		}
	};

	// ��갴�²���
	function onCellMouseDown(ele) {
		// ���ѡ��
		clearSelection();
		var regionIdnex = getIndexByElement(ele.parentNode.parentNode);
		// td��ǩ
		var tagName = ele.tagName.toLowerCase();
		if (tagName !== "td" && tagName !== "th")
			return;
		// ��Ԫ���Ӧ�±�
		var index = getCellIndex(ele);

		setCellIndexInput(index);
		setFmlaInput(ele);
		index += defaults.separator + regionIdnex;
		// ѡ����ʼ�±�
		persist.range.start = index;
		// ѡ�������±�
		persist.range.end = index;
		// �����ѡ������
		persist.selection.push(index);
		// ��걻����
		persist.mouse.status = 0;
		// ѡ��������ʽ
		persist.backupAttrs[index] = new PersistAttr(ele.style.cssText, ele.getAttribute("td_type"), ele.className);
		// �ж��Ƿ�����ʽˢ
		if (checkBrushFormatOpened() === true) {
			// ��ʽ��Ԫ��ѡ��
			if (checkBrushSelected() === true) {} else {
				// �����ʽˢ��Ԫ����ʽ���治����
				if (persist.brush.selectedAttrs[index] === undefined) {
					// ���ø�ʽˢ��Ԫ����ʽ����
					persist.brush.selectedAttrs[index] = new PersistAttr(ele.style.cssText, ele.getAttribute("td_type"), ele.className);
				}
				// ��ʽˢ��ȷ�߿���ʽ
				ele.style.border = defaults.brushright;
			}
		} else {
			// û������ʽˢʱ��Ԫ��ѡ�е���ʽ
			ele.style.backgroundColor = defaults.normal;
			// ��鵥Ԫ���Ƿ�ɱ༭
			if (checkCellEditable(ele)) {
				// ���ÿɱ༭��Ԫ��
				contentEditable(ele, index);
			}
		}
	};

	// ��鵥Ԫ���Ƿ�ɱ༭
	// TODO û����
	function checkCellEditable(cell) {
		return true;
	};

	// ���ñ�ѡ�е�Ԫ�����ʽ
	function setSelectionCss(css) {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		if (css !== null && ��css !== undefined) {
			// ѡ������ת����ά����
			var selection2ArrayStack = selectionTrans2ArrayStack();
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					// ��ȥ�±����
					var obj = TableUtils.index2Obj(selection2ArrayStack[i][j]);
					// ���ڵ�Ԫ��
					if (persist.storage[obj.y][obj.x]) {
						// ������ʽ
						persist.storage[obj.y][obj.x].style.cssText = css;
						// ��ʽˢ��Ԫ�������ѡ��ʱ������ʽ�����ʽˢ����ʽ����ҲӦ�ø���
						for (var m in persist.brush.selectedAttrs) {
							if (m === selection2ArrayStack[i][j]) {
								persist.brush.selectedAttrs[m] = new PersistAttr(css, persist.storage[obj.y][obj.x].getAttribute("td_type"), persist.storage[obj.y][obj.x].className);
								persist.storage[obj.y][obj.x].style.border = defaults.brushright;
								break;
							}
						}
					}
				}
			}
		}
		// ���ѡ��
		persist.selection = [];
		// ���ѡ����Χ
		persist.range = {
			start: null,
			end: null
		};
	};

	// ����ѡ����Ԫ�����ʽ��
	function setSelectionCssClass(cls) {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		if (cls !== null && ��cls !== undefined) {
			// ѡ������ת����ά����
			var selection2ArrayStack = selectionTrans2ArrayStack();
			for (var i = 0; i < selection2ArrayStack.length; i++) {
				for (var j = 0; j < selection2ArrayStack[i].length; j++) {
					// ��ȥ�±����
					var obj = TableUtils.index2Obj(selection2ArrayStack[i][j]);
					// ���ڵ�Ԫ��
					if (persist.storage[obj.y][obj.x]) {
						// �Ȼ�ԭ��ʽ
						persist.storage[obj.y][obj.x].style.cssText = persist.backupAttrs[selection2ArrayStack[i][j]].css;
						// ������ʽ��
						persist.storage[obj.y][obj.x].className = cls;
						// ��ʽˢ��Ԫ�������ѡ��ʱ������ʽ�����ʽˢ����ʽ����ҲӦ�ø���
						for (var m in persist.brush.selectedAttrs) {
							if (m === selection2ArrayStack[i][j]) {
								persist.brush.selectedAttrs[m] = new PersistAttr(persist.brush.selectedAttrs[m].css, persist.storage[obj.y][obj.x].getAttribute("td_type"), persist.storage[obj.y][obj.x].className);
								persist.storage[obj.y][obj.x].style.border = defaults.brushright;
								break;
							}
						}
					}
				}
			}
		}
		// ���ѡ��
		persist.selection = [];
		// ���ѡ����Χ
		persist.range = {
			start: null,
			end: null
		};
	};

	// ��ȡ
	function read() {

		// TODO ��ʹ����յ�ǰѡ���ķ���Ҳ�ܻ�ȡ��ȷ�ı���ַ���
		clearSelection();
		clearEditable();
		if (defaults.nullRowRomoved)
			removeNullRows();
		return document.getElementById(id).innerHTML;
	};

	// ��ȡ��ѡ�еĵ�Ԫ��
	function getSelectionCells() {
		var selectionCells = [];
		var selection2ArrayStack = selectionTrans2ArrayStack();
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < selection2ArrayStack[i].length; j++) {
				var obj = TableUtils.index2Obj(selection2ArrayStack[i][j]);
				if (persist.storage[obj.y][obj.x]) {
					var cell = persist.storage[obj.y][obj.x].cloneNode(true);
					if (persist.backupAttrs[selection2ArrayStack[i][j]] !== undefined) {
						cell.style.cssText = persist.backupAttrs[selection2ArrayStack[i][j]].css;
						if (persist.backupAttrs[selection2ArrayStack[i][j]].tdType !== null)
							cell.setAttribute("td_type", persist.backupAttrs[selection2ArrayStack[i][j]].tdType);
						else
							cell.removeAttribute("td_type");
						if (persist.backupAttrs[selection2ArrayStack[i][j]].cls !== null)
							cell.className = persist.backupAttrs[selection2ArrayStack[i][j]].cls;
						else
							cell.className = "";
						selectionCells.push(cell);
					}
				}
			}
		}
		return selectionCells;
	};

	// �򿪸�ʽˢ
	function openBrushFormat() {
		// ���ø�ʽˢ����
		persist.brush.status = 0;
		// ���ѡ��
		clearSelection();
		// ��տɱ༭�ı�
		clearEditable();
	};

	// �رո�ʽˢ
	function closeBrushFormat() {
		// ���ø�ʽˢ״̬������
		persist.brush.status = -1;
		// ���ѡ�� TODO �����ò���
		clearSelection();
		// ��ԭ��ѡ�еĵ�Ԫ�����ʽ
		for (var i in persist.brush.selectedAttrs) {
			var sty = persist.brush.selectedAttrs[i].css;
			var cls = persist.brush.selectedAttrs[i].cls;
			var td_type = persist.brush.selectedAttrs[i].tdType;
			var obj = TableUtils.index2Obj(i);
			// ��ʽ����
			persist.storage[obj.y][obj.x].style.cssText = sty;
			if (cls !== null)
				persist.storage[obj.y][obj.x].className = cls;
			else
				persist.storage[obj.y][obj.x].className = "";
			if (td_type !== null)
				persist.storage[obj.y][obj.x].setAttribute("td_type", td_type);
			else
				persist.storage[obj.y][obj.x].removeAttribute("td_type");
			break;
		}
		persist.brush.selected = -1;
		// ��ո�ʽˢ��ʽ������
		persist.brush.selectedAttrs = {};
	};

	// ����ʽˢ�Ƿ�� 
	function checkBrushFormatOpened() {
		if (persist.brush.status === 0)
			return true;
		else
			return false;
	};

	// ����ʽˢ����ʽ��Ԫ���Ƿ�ѡ��
	function checkBrushSelected() {
		if (persist.brush.selected === -1)
			return false;
		else
			return true;
	};

	// �ṩ�кţ��������Ƿ��ǿ���
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

	// ��ȡ��
	function getRow(y) {
		var tableContainer = document.getElementById(id);
		var table = TableUtils.firstChild(tableContainer);
		return TableUtils.fixedTableRows(table)[y];
	};

	// �Ƴ�����
	function removeNullRows() {
		for (var i = 0; i < persist.storage.length; i++) {
			if (checkNullRow(i)) {
				deleteRowHandler(i, 0, true);
				removeNullRows();
				break;
			}
		}
	};

	// ��ԭ������ı��
	function restore() {
		if (persist.originStr)
			create(persist.originStr, true);
	};

	// ����ѡ����ȡ��Ԫ��
	function findRowsBySelection(selection) {
		var selection2ArrayStack = selectionTrans2ArrayStack(selection);
		var rows = [];
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			var row = getRow(TableUtils.index2Obj(selection2ArrayStack[i][0]).y);
			if (row)
				rows.push(row);
		}
		return rows;
	};

	// ��ȡ���һ��thead
	function getLastThead() {
		var thead = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.thead) === 0)
				thead = tableChildren[i];
			else
				break;
		}
		return thead;
	};

	// ��ȡ��һ��thead
	// not used
	function getFirstThead() {
		var thead = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.thead) === 0) {
				thead = tableChildren[i];
				break;
			}
		}
		return thead;
	};

	// ��ȡ��һ��tbody
	function getFirstTbody() {
		var tbody = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.tbody) === 0) {
				tbody = tableChildren[i];
				break;
			}
		}
		return tbody;
	};

	function getLastTbody() {
		var tbody = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.tbody) === 0) {
				tbody = tableChildren[i];
			} else
				break;
		}
		return tbody;
	};

	// ��ȡ��һ��tfoot
	function getFirstTfoot() {
		var tfoot = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.tfoot) === 0) {
				tfoot = tableChildren[i];
				break;
			}
		}
		return tfoot;
	};

	function getLastTfoot() {
		var tfoot = null;
		for (var i in tableChildren) {
			if (i.indexOf(tableChildPrefix.tfoot) === 0) {
				tfoot = tableChildren[i];
			}
		}
		return tfoot;
	};

	// תΪthead
	function trans2Head() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		clearSelection();
		clearEditable();
		removeNullRows();
		var rows = findRowsBySelection(selection);
		var thead = getLastThead();
		if (!thead) {
			thead = document.createElement("thead");
			var table = TableUtils.firstChild(document.getElementById(id));
			var tbody = getFirstTbody();
			if (tbody)
				table.insertBefore(thead, tbody);
			else {
				var tfoot = getFirstTfoot();
				if (tfoot)
					table.insertBefore(thead, tfoot);
				else
					table.appendChild(thead);
			}
		}
		for (var i = 0; i < rows.length; i++) {
			if (rows[i].parentNode.tagName.toLowerCase() === "thead")
				return;
			rows[i].parentNode.removeChild(rows[i]);
			thead.appendChild(rows[i]);
		}
		create(document.getElementById(id).innerHTML, true);
	};

	function trans2Body() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		clearSelection();
		clearEditable();
		removeNullRows();
		var rows = findRowsBySelection(selection);
		if (rows[0].parentNode.tagName.toLowerCase() === "thead") {
			var tbody = getFirstTbody();
			var last = null
			if (tbody.children.length > 0) {
				last = tbody.children[0];
			}
			for (var i = rows.length - 1; i >= 0; i--) {
				rows[i].parentNode.removeChild(rows[i]);
				if (!last)
					tbody.appendChild(rows[i]);
				else
					tbody.insertBefore(rows[i], last);
				last = rows[i];
			}
		} else if (rows[0].parentNode.tagName.toLowerCase() === "tfoot") {
			var tbody = getLastTbody();
			for (var i = 0; i < rows.length; i++) {
				rows[i].parentNode.removeChild(rows[i]);
				tbody.appendChild(rows[i]);
			}
		}
		create(document.getElementById(id).innerHTML, true);
	};

	function trans2Foot() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		clearSelection();
		clearEditable();
		removeNullRows();
		var rows = findRowsBySelection(selection);
		var tfoot = getLastTfoot();
		if (!tfoot) {
			tfoot = document.createElement("tfoot");
			var table = TableUtils.firstChild(document.getElementById(id));
			table.appendChild(tfoot);
		}
		var first = null;
		if (tfoot.children.length > 0)
			first = tfoot.children[0];
		for (var i = rows.length - 1; i >= 0; i--) {
			if (rows[i].parentNode.tagName.toLowerCase() === "tfoot")
				return;
			rows[i].parentNode.removeChild(rows[i]);
			if (!first)
				tfoot.appendChild(rows[i]);
			else
				tfoot.insertBefore(rows[i], first);
			first = rows[i];
		}
		create(document.getElementById(id).innerHTML, true);
	};

	// tdתth
	// ת����ԭ���Լ���ʽ����ʧ
	function trans2Th() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		clearSelection();
		clearEditable();
		removeNullRows();
		var selection2ArrayStack = selectionTrans2ArrayStack(selection);
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < persist.storage[i].length; j++) {
				var ocell = persist.storage[TableUtils.index2Obj(selection2ArrayStack[i][0]).y][j];
				if (ocell) {
					var value = ocell.innerHTML;
					var cell = document.createElement("th");
					cell.innerHTML = value;
					if (ocell.getAttribute("realvalue"))
						cell.setAttribute("realvalue", ocell.getAttribute("realvalue"));
					if (ocell.getAttribute("showformat"))
						cell.setAttribute("showformat", ocell.getAttribute("showformat"));
					cell.colSpan = ocell.colSpan;
					cell.rowSpan = ocell.rowSpan;
					ocell.parentNode.insertBefore(cell, ocell);
					ocell.parentNode.removeChild(ocell);
					persist.storage[TableUtils.index2Obj(selection2ArrayStack[i][0]).y][j] = cell;
					utils.attachEvent(cell);
				}
			}
		}
	};

	// ���ⵥԪ��ת��Ϊ��ͨ��Ԫ��
	// TODO ��trans2Th�����ϲ�����������
	function trans2Td() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		clearSelection();
		clearEditable();
		removeNullRows();
		var selection2ArrayStack = selectionTrans2ArrayStack(selection);
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < persist.storage[i].length; j++) {
				var ocell = persist.storage[TableUtils.index2Obj(selection2ArrayStack[i][0]).y][j];
				if (ocell) {
					var value = ocell.innerHTML;
					// TODO �����ﲻһ��
					var cell = document.createElement("td");
					cell.innerHTML = value;
					if (ocell.getAttribute("realvalue"))
						cell.setAttribute("realvalue", ocell.getAttribute("realvalue"));
					if (ocell.getAttribute("showformat"))
						cell.setAttribute("showformat", ocell.getAttribute("showformat"));
					cell.colSpan = ocell.colSpan;
					cell.rowSpan = ocell.rowSpan;
					ocell.parentNode.insertBefore(cell, ocell);
					ocell.parentNode.removeChild(ocell);
					persist.storage[TableUtils.index2Obj(selection2ArrayStack[i][0]).y][j] = cell;
					utils.attachEvent(cell);
				}
			}
		}
	};

	// ���tbody
	function separateTbody(tbody, start, length) {
		var arr = [];
		if (start === 0)
			arr.push(null);
		else {
			var t_f = document.createElement("tbody");
			for (var i = 0; i < start; i++)
				t_f.appendChild(tbody.children[i].cloneNode(true));
			arr.push(t_f);
		}

		var t_m = document.createElement("tbody");
		for (var i = start; i < start + length; i++)
			t_m.appendChild(tbody.children[i].cloneNode(true));
		arr.push(t_m);

		if (start + length < tbody.children.length) {
			var t_l = document.createElement("tbody");
			for (var i = start + length; i < tbody.children.length; i++)
				t_l.appendChild(tbody.children[i].cloneNode(true));
			arr.push(t_l);
		} else
			arr.push(null);
		return arr;
	};

	function setTbodyType(type) {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection = Array.prototype.slice.call(persist.selection);
		var rows = findRowsBySelection(selection);
		var tbody = rows[0].parentNode;
		if (tbody.tagName.toLowerCase() == "thead" || tbody.tagName.toLowerCase() == "tfoot")
			return;
		var type_ = tbody.getAttribute("tb_type");
		// ������ͬ�����
		if (type_ == type)
			return;
		clearSelection();
		clearEditable();
		removeNullRows();
		var selection2ArrayStack = selectionTrans2ArrayStack(selection);
		var start = TableUtils.index2Obj(selection2ArrayStack[0][0]).y;
		var end = TableUtils.index2Obj(selection2ArrayStack[selection2ArrayStack.length - 1][0]).y;
		var offsetY = TableUtils.fixedRowIndex(tbody.children[0]);
		var tbodies = separateTbody(tbody, start - offsetY, end - start + 1);
		var last = null;
		for (var i = tbodies.length - 1; i >= 0; i--) {
			if (tbodies[i]) {
				if (last)
					last.parentNode.insertBefore(tbodies[i], last);
				else
					tbody.parentNode.insertBefore(tbodies[i], tbody);

				if (i === 1)
					setType(tbodies[i], type);
				else {
					if (type_)
						setType(tbodies[i], type_);
				}
				last = tbodies[i];
			}
		}
		tbody.parentNode.removeChild(tbody);
		create(document.getElementById(id).innerHTML, true);
	};


	function setType(tbody, type) {
		tbody.setAttribute("tb_type", type);
		if (type === "tblist")
			tbody.className = "tb_list";
		else if (type === "tbpivot")
			tbody.className = "tb_pivot"
	};

	// ������Ԫ��
	function lockCells() {
		// ѡ��Ϊ��
		if (persist.selection.length <= 0) {
			alert(defaults.selectionNullMsg);
			return;
		}
		var selection2ArrayStack = selectionTrans2ArrayStack();
		for (var i = 0; i < selection2ArrayStack.length; i++) {
			for (var j = 0; j < selection2ArrayStack[i].length; j++) {
				var index = selection2ArrayStack[i][j];
				var obj = TableUtils.index2Obj(index);
				var cell = persist.storage[obj.y][obj.x];
				if (cell) {
					cell.className = "td_lock";
					cell.setAttribute("td_type", "lock");
					persist.backupAttrs[index] = new PersistAttr(persist.backupAttrs[index].css, cell.getAttribute("td_type"), cell.className);
				}
			}
		}
		clearSelection();
		clearEditable();
		persist.edition = {};
		// ���ѡ����Χ
		persist.range = {
			start: null,
			end: null
		};
	};

	// �ⲿ����mouseup
	function triggerOnCellMouseUp() {
		var obj = TableUtils.index2Obj(persist.range.end);
		if (obj) {
			if (persist.storage[obj.y]) {
				var cell = persist.storage[obj.y][obj.x];
				if (cell)
					onCellMouseUpHandler(cell);
			}
		}
	};

	var doFormulaProxy = function() {
		return function() {
			defaults.formulaInput.value = defaults.formulaInput.value.replace(/\s*/g, "");
			var index = persist.selection[0];
			var obj = TableUtils.index2Obj(index);
			if (defaults.formulaInput.value) {
				if (ExcelFormula.checkExcute(TableUtils.index2Tag(index), defaults.formulaInput.value)) {
					persist.storage[obj.y][obj.x].setAttribute(defaults.fmla, escape(defaults.formulaInput.value));
					setFormulas();
					var result_arr = ExcelFormula.caculate(TableUtils.index2Tag(index));
					useResult(result_arr);
				}
			} else {
				setFormulas();
				if (obj)
					persist.storage[obj.y][obj.x].removeAttribute(defaults.fmla);
			}
		};
	};

	function setFormulaStorage() {
		var arr = {};
		for (var i = 0; i < persist.storage.length; i++) {
			for (var j = 0; j < persist.storage[i].length; j++) {
				if (persist.storage[i][j]) {
					var a = TableUtils.num2Char(j + 1);
					arr[a + (i + 1)] = persist.storage[i][j].getAttribute("realvalue") !== null ? persist.storage[i][j].getAttribute("realvalue") : persist.storage[i][j].innerHTML;
				}
			}
		}
		ExcelFormula.updateStorage(arr);
	};

	function setFormulas() {
		var arr = [];
		for (var i = 0; i < persist.storage.length; i++) {
			for (var j = 0; j < persist.storage[i].length; j++) {
				var td = persist.storage[i][j];
				if (td) {
					if (td.getAttribute(defaults.fmla)) {
						arr.push({
							key: TableUtils.num2Char(j + 1) + (i + 1),
							formula: unescape(td.getAttribute(defaults.fmla))
						});
					}
				}
			}
		}
		ExcelFormula.clearFormulas();
		ExcelFormula.updateFormulas(arr);
	};

	function useResult(result_arr) {
		for (var i = 0; i < result_arr.length; i++) {
			var key = result_arr[i].key;
			var result = result_arr[i].result;
			var obj = TableUtils.getTagObj(key);
			var x_ = TableUtils.char2Num(obj.col);
			var index = (obj.row - 1) + defaults.separator + (x_ - 1);
			if (persist.storage[obj.row - 1]) {
				var cell = persist.storage[obj.row - 1][x_ - 1];
				if (cell) {
					if (result !== null && result !== undefined) {
						if (cell.getAttribute("realvalue") || cell.getAttribute("showformat")) {
							cell.setAttribute("realvalue", result);
							if (cell.getAttribute("showformat"))
								showFormatterValue(cell);
						} else
							cell.innerHTML = result;
						/**
						    if (persist.selection[0] && persist.selection[0].indexOf(index) != -1)
							contentEditable(cell, index);
						**/
					}
				}
			}
		}
	};

	// ��ʼ�����¹�ʽ�����ݲ�����
	function refreshForlumaAndStorage() {
		// ����
		setFormulaStorage();
		setFormulas();
		var result_arr = ExcelFormula.caculateAll();
		useResult(result_arr);

		showFormatterValues();
	};

	function showFormatterValue(cell) {
		if (cell) {
			var realvalue = cell.getAttribute("realvalue");
			if (realvalue !== undefined) {
				var formattion = cell.getAttribute("showformat");
				if (formattion) {
					formattion = unescape(formattion);
					formattion = formattion.replace(/\\/, "");

					var result = MSONumberFormatter.format(realvalue, formattion);
					if (result.flag === true)
						cell.innerHTML = result.val;
				}
			}
		}
	};

	function showFormatterValues() {
		for (var i = 0; i < persist.storage.length; i++) {
			for (var j = 0; j < persist.storage[i].length; j++) {
				showFormatterValue(persist.storage[i][j]);
			}
		}
	}

	// ��������
	// TODO Ϊÿһ��������ӻص�����
	return {
		// �ϲ���Ԫ��
		merge: merge,
		// ����
		splitH: splitH,
		// ���
		splitV: splitV,
		// ɾ����
		deleteCol: deleteCol,
		// ɾ����
		deleteRow: deleteRow,
		// �ϲ������
		addRowTop: addRowTop,
		// �ײ������
		addRowBottom: addRowBottom,
		// ��������
		addColLeft: addColLeft,
		// �Ҳ������
		addColRight: addColRight,
		// ��д��Ԫ�� �� �����ַ���
		write: write,
		// ��ʼ��
		init: init,
		// ��ȫ��ֵ�Ԫ��
		clearMerge: clearMerge,
		// ���ñ�ѡ�еĵ�Ԫ�����ʽ
		setSelectionCss: setSelectionCss,
		// ��ȡ����ַ���
		read: read,
		// ��ȡ��ѡ�еĵ�Ԫ��
		getSelectionCells: getSelectionCells,
		// �򿪸�ʽˢ
		openBrushFormat: openBrushFormat,
		// �رո�ʽˢ
		closeBrushFormat: closeBrushFormat,
		// ����ʽˢ�Ƿ��
		checkBrushFormatOpened: checkBrushFormatOpened,
		// ��ԭ
		restore: restore,
		// ��Ϊҳü
		trans2Head: trans2Head,
		// ��Ϊ����
		trans2Body: trans2Body,
		// ��Ϊҳ��
		trans2Foot: trans2Foot,
		// ��Ϊ��ͷ
		trans2Th: trans2Th,
		// ��Ϊ��ͨ��Ԫ��
		trans2Td: trans2Td,
		// ����tbody���� 
		setTbodyType: setTbodyType,
		// ������Ԫ��
		lockCells: lockCells,
		// �ⲿ����ѡ��ѡ��
		triggerOnCellMouseUp: triggerOnCellMouseUp,
		// ������ʽ��
		setSelectionCssClass: setSelectionCssClass
	};
})();