var target = "div_temp";
var opts = {
	correctBg: "green",
	cursor: "default",
	isNew: false
}
var MergeTable;
window.onload = function() {
	MergeTable = (
		function(table, target, opts) {
			var tableObj = null;
			var targetObj = null;
			var Validation = {
				i_str_name: "错误",
				i_str_msg: "表格错误",
				validStringToTable: function(string) {
					if (string) {
						var reg = /^(\s*)|(\s*)$/g;
						var str = string.replace(reg, "").toLowerCase();
						if (str.indexOf("<table") !== -1 && str.indexOf("</table>") !== -1) return true;
						else {
							throw {
								name: this.i_str_name,
								message: this.i_str_msg
							};
						}
					} else {
						throw {
							name: this.i_str_name,
							message: this.i_str_msg
						};
					}
				}
			};
			var Caculation = {

			}
			var Convert = {
				ConvertStringToTable: function(string) {
					if (Validation.validStringToTable(string)) {
						var temp_div = document.createElement("div");
						temp_div.innerHTML = string;
						return temp_div.getElementsByTagName("table")[0];
					} else return null;
				}
			};
			if (typeof table == "undefined") return;
			else if (typeof table == "object") {
				if (table.tagName && table.tagName.toLowerCase() == "table") tableObj = table;
			} else if (typeof table == "string") {
				try {
					tableObj = Convert.ConvertStringToTable(table);
				} catch (e) {
					alert(e.name + ":" + e.message);
				}
			}
			if (tableObj == null) return;
			if (typeof target == "string") {
				var temp_elem = document.getElementById(target);
				if (temp_elem !== null) targetObj = temp_elem;
				if (temp_elem == null) {
					var temp_elems = document.getElementsByName(target);
					if (temp_elems != null && temp_elems.length > 0)
						temp_elem = temp_elems[0];
				}
				if (temp_elem == null) alert("ÎÞ·¨¸ù¾Ýid»òname»ñÈ¡ÔªËØ!");
			} else if (typeof target == "object") targetObj = target;
			if (targetObj == null) return;
			targetObj.appendChild(tableObj);

			function Cell(cell, x, y) {
				this.cell = cell ? cell : null;
				this.x = x > -1 ? x : -1;
				this.y = y > -1 ? y : -1;
			}
			var DriveCellCollection = {
				identify: false,
				cells: [],
				originCell: new Cell(),
				targetCell: new Cell(),
				clear: function() {
					this.cells = [];
					this.originCell = new Cell();
					this.targetCell = new Cell();
					this.identify = false;
					this.cols = 0;
					this.rows = 0;
					this.minX = -1;
					this.minY = -1;
					this.maxX = -1;
					this.maxY = -1;
				},
				cols: 0,
				rows: 0,
				isOutLine: false,
				minX: -1,
				minY: -1,
				maxX: -1,
				maxY: -1
			};

			function KV(k, v) {
				this.K = k;
				this.V = v;
			}
			var Demissions2CellCollection = {
				y_axis: 0,
				x_axis: 0,
				d2Cells: []
			};
			var trs = tableObj.rows ? tableObj.rows : tableObj.getElementsByTagName("tr");
			for (var i = 0, len = trs.length; i < len; i++) {
				Demissions2CellCollection.d2Cells[i] = [];
				var tds = trs[i].cells ? trs[i].cells : trs[i].getElementsByTagName("td"); {
					for (var j = 0, l = tds.length; j < l; j++) {
						if (window.attachEvent) {
							tds[j].attachEvent("onmousedown", selectDriveCell);
							tds[j].attachEvent("onmouseover", selectStepCell);
							tds[j].attachEvent("onmouseup", selectCancelCell);
						} else {
							tds[j].addEventListener("mousedown", selectDriveCell, false);
							tds[j].addEventListener("mouseover", selectStepCell, false);
							tds[j].addEventListener("mouseup", selectCancelCell, false);
						}
						if (opts.isNew == true) {
							tds[j].setAttribute("altX", j);
							tds[j].setAttribute("altY", i);
							tds[j].innerHTML = "{" + i + "," + j + "}";
						}
						Demissions2CellCollection.d2Cells[i][j] = tds[j];
					}
				}
			}
			Demissions2CellCollection.y_axis = trs.length;
			for (var i = 0, len = trs.length; i < len; i++) {
				var tds = trs[i].cells ? trs[i].cells : trs[i].getElementsByTagName("td");
				var y_axis = 0;
				var sum = 0;
				var td_len = tds.length;
				if (i == 0) {
					for (var m = 0; m < td_len; m++) {
						sum += tds[m].colSpan;
					}
					Demissions2CellCollection.x_axis = sum;
				}
			}

			var Behavior = {
				correctBg: "#3478E5",
				cursor: "default",
				userSelect: "none",
				wrongBg: "red"
			};
			if (tableObj.attachEvent) tableObj.onselectstart = function() {
				event.returnValue = false;
			}
			if (tableObj.addEventListener) tableObj.addEventListener("selectstart", function(e) {
				e.preventDefault();
			})
			tableObj.style.MozUserSelect = Behavior.userSelect;
			var targetObj = null;
			if (opts) {
				for (var i in opts) {
					for (var j in Behavior) {
						if (i == j) {
							Behavior[j] = opts[i];
							break;
						}
					}
				}
			}

			function selectDriveCell(e) {
				var e = e || window.event;
				var srcElem = e.target || e.srcElement;
				DriveCellCollection.identify = true;
				DriveCellCollection.originCell = new Cell(srcElem, parseInt(srcElem.getAttribute("altX")), parseInt(srcElem.getAttribute("altY")));
			}

			function anchorCell(y, x) {
				var y_row = tableObj.rows ? tableObj.rows[y] : tableObj.getElementsByTagName("tr")[y];
				if (y_row) {
					var y_row_cell = y_row.cells ? y_row.cells[x] : y_row.getElementsByTagName("td")[x];
					if (y_row_cell)
						return y_row_cell;
					else
						return null;
				}
				return null;
			}

			function removeCell(cell) {
				if (cell) {
					if (cell.cell) {
						cell.cell.parentNode.removeChild(cell.cell);
						if (Demissions2CellCollection.d2Cells[cell.y]) {
							if (Demissions2CellCollection.d2Cells[cell.y][cell.x]) {
								Demissions2CellCollection.d2Cells[cell.y][cell.x] = null;
							}
						}
					}
				}
			}

			function checkCellsOutLine(minX, minY, maxX, maxY) {
				minX = minX ? parseInt(minX) : DriveCellCollection.minX;
				minY = minY ? parseInt(minY) : DriveCellCollection.minY;
				maxX = maxX ? parseInt(maxX) : DriveCellCollection.maxX;
				maxY = maxY ? parseInt(maxY) : DriveCellCollection.maxY;
				var count = 0;
				var height = 0;
				for (var y = minY; y <= maxY; y++) {
					if (Demissions2CellCollection.d2Cells[y]) {
						var width = 0;
						for (var x = minX; x <= maxX; x++) {

							if (Demissions2CellCollection.d2Cells[y][x]) {
								var cell = Demissions2CellCollection.d2Cells[y][x];
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
							if (Demissions2CellCollection.d2Cells[y]) {
								if (Demissions2CellCollection.d2Cells[y][x])
									height += Demissions2CellCollection.d2Cells[y][x].rowSpan;
							}
						}
						if (height > maxY - minY + 1)
							return false;
					}
				}
				return true;
			}

			function renderCell(minX, minY, maxX, maxY) {
				document.getElementById("mark").innerHTML = "minX:" + minX + ",minY:" + minY + ",maxX:" + maxX + ",maxY:" + maxY;
				var isCorrect = checkCellsOutLine(minX, minY, maxX, maxY);
				for (var i = minX; i <= maxX; i++) {
					for (var j = minY; j <= maxY; j++) {
						if (Demissions2CellCollection.d2Cells[j] && Demissions2CellCollection.d2Cells[j][i]) {
							var render_cell = Demissions2CellCollection.d2Cells[j][i];
							if (isCorrect)
								render_cell.style.backgroundColor = Behavior.correctBg;
							else
								render_cell.style.backgroundColor = Behavior.wrongBg;
							DriveCellCollection.cells.push(new Cell(render_cell, i, j));
						}
					}
				}
			}

			function selectStepCell(e) {
				var e = e || window.event;
				var srcElem = e.target || e.srcElement;
				srcElem.style.cursor = Behavior.cursor;
				if (DriveCellCollection.identify == true) {
					for (var a_i in Demissions2CellCollection.d2Cells) {
						for (var a_j in Demissions2CellCollection.d2Cells[a_i]) {
							if (Demissions2CellCollection.d2Cells[a_i][a_j])
								Demissions2CellCollection.d2Cells[a_i][a_j].style.backgroundColor = "";
						}
					}
					var t_cell = new Cell(srcElem, parseInt(srcElem.getAttribute("altX")), parseInt(srcElem.getAttribute("altY")));
					if (t_cell)
						DriveCellCollection.targetCell = t_cell;
					var o_cell = DriveCellCollection.originCell;
					DriveCellCollection.cells = [];
					if (t_cell.y >= o_cell.y) {
						if (t_cell.x >= o_cell.x) {
							var maxX = t_cell.x;
							var maxY = t_cell.y;
							if (t_cell.cell.colSpan > 1)
								maxX = maxX + t_cell.cell.colSpan - 1;
							if (t_cell.cell.rowSpan > 1)
								maxY = maxY + t_cell.cell.rowSpan - 1;
							DriveCellCollection.cols = maxX - o_cell.x + 1;
							DriveCellCollection.rows = maxY - o_cell.y + 1;
							DriveCellCollection.minX = o_cell.x;
							DriveCellCollection.minY = o_cell.y;
							DriveCellCollection.maxX = maxX;
							DriveCellCollection.maxY = maxY;
							renderCell(o_cell.x, o_cell.y, maxX, maxY);
						} else {
							var maxX = o_cell.x;
							var maxY = t_cell.y;
							if (t_cell.cell.rowSpan > 1)
								maxY = maxY + t_cell.cell.rowSpan - 1;
							if (o_cell.cell.colSpan > 1)
								maxX = maxX + o_cell.cell.colSpan - 1;
							DriveCellCollection.cols = maxX - t_cell.x + 1;
							DriveCellCollection.rows = maxY - o_cell.y + 1;
							DriveCellCollection.minX = t_cell.x;
							DriveCellCollection.minY = o_cell.y;
							DriveCellCollection.maxX = maxX;
							DriveCellCollection.maxY = maxY;
							renderCell(t_cell.x, o_cell.y, maxX, maxY);
						}
					} else {
						if (t_cell.x >= o_cell.x) {
							var maxX = t_cell.x;
							var maxY = o_cell.y;
							if (t_cell.cell.colSpan > 1)
								maxX = maxX + t_cell.cell.colSpan - 1;
							if (o_cell.cell.rowSpan > 1)
								maxY = maxY + o_cell.cell.rowSpan - 1;
							DriveCellCollection.cols = maxX - o_cell.x + 1;
							DriveCellCollection.rows = maxY - t_cell.y + 1;
							DriveCellCollection.minX = o_cell.x;
							DriveCellCollection.minY = t_cell.y;
							DriveCellCollection.maxX = maxX;
							DriveCellCollection.maxY = maxY;
							renderCell(o_cell.x, t_cell.y, maxX, maxY);
						} else {
							var maxX = o_cell.x;
							var maxY = o_cell.y;
							if (o_cell.cell.colSpan > 1)
								maxX = maxX + o_cell.cell.colSpan - 1;
							if (o_cell.cell.rowSpan > 1)
								maxY = maxY + o_cell.cell.rowSpan - 1;
							DriveCellCollection.cols = maxX - t_cell.x + 1;
							DriveCellCollection.rows = maxY - t_cell.y + 1;
							DriveCellCollection.minX = t_cell.x;
							DriveCellCollection.minY = t_cell.y;
							DriveCellCollection.maxX = maxX;
							DriveCellCollection.maxY = maxY;
							renderCell(t_cell.x, t_cell.y, maxX, maxY);
						}
					}
				}
			}

			function selectCancelCell(e) {
				DriveCellCollection.identify = false;
			}

			var Instance = function() {};
			Instance.prototype.mergeCell = function() {
				if (!checkCellsOutLine()) {
					alert("无法合并!");
					clearCellField();
					return false;
				}
				var beginCell = Demissions2CellCollection.d2Cells[DriveCellCollection.minY][DriveCellCollection.minX];
				if (beginCell) {
					beginCell.colSpan = DriveCellCollection.cols;
					beginCell.rowSpan = DriveCellCollection.rows;
					for (var i = 0, len = DriveCellCollection.cells.length; i < len; i++) {
						if (DriveCellCollection.cells[i].cell !== beginCell) {
							removeCell(DriveCellCollection.cells[i]);
						}
					}
					DriveCellCollection.clear();
					beginCell.style.backgroundColor = "";
					return true;
				}
			};

			function clearCellField() {
				for (var i = 0, len = DriveCellCollection.cells.length; i < len; i++) {
					DriveCellCollection.cells[i].cell.style.backgroundColor = "";
				}
				DriveCellCollection.clear();
			}
			Instance.prototype.clearCellField = clearCellField;
			Instance.prototype.mergeExport = function(pattern) {
				var temp_div = document.createElement("div");
				temp_div.innerHTML = tableObj.outerHTML;
				var temp_table = temp_div.firstChild;
				if (pattern == "text") {
					document.getElementById("table_txt").innerHTML = temp_table.outerHTML;
					return temp_table.outerHTML;
				} else
					return temp_table;
			}
			return Instance.prototype;
		}
	)(table, target, opts);
}