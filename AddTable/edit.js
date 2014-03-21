function new_line() {
	//debugger;debugger;
	var tb = document.getElementById('table0').getElementsByTagName('table')[0];
	var objRow = document.createElement("tr");
	objRow.setAttribute("isNew", true);　
	tb.tBodies[0].appendChild(objRow);　
	var len = tb.rows[0].cells.length;
	for (var j = 0; j < len; j++)　 {　
		var objCell = document.createElement("td");　
		objRow.appendChild(objCell);　
		objCell.innerHTML = tb.rows[1].cells[j].innerHTML;　
		objCell.style.cssText = tb.rows[1].cells[j].style.cssText;　
		if (objCell.children[0]) {
			objCell.children[0].removeAttribute("onblur");
			objCell.children[0].removeAttribute("onchange");
		}
		attr(objCell, 'OldValue', '');　
		attr(objCell, 'Field', attr(tb.rows[1].cells[j], 'Field'));　
		if (objCell.childNodes.length > 0)　 {　
			var type = objCell.childNodes[0].nodeName.toLowerCase();　
			switch (type) {
				case "input":
					objCell.childNodes[0].value = "";
					if (objCell.childNodes[0].type == 'checkbox') {
						objCell.innerHTML = "<input type=button value='添加' onclick='btn_add(this)'>" + "<input type=button value='取消' onclick='btn_cancel(this)'>";
					}
					break;
			}　　
		}　
	}　
	return objRow;
};

function btn_add(obj) {
	//alert('未做');
	//return;
	var row = obj.parentNode.parentNode;
	//debugger;debugger;
	var sqlfield = '';
	var sqlvalue = '';
	for (var i = 0; i < row.cells.length; i++) {
		if (typeof(row.cells[i].NewValue) != "undefined") {
			var cell = row.cells[i];
			sqlfield += attr(cell, 'Field') + ',';
			sqlvalue += "'" + row.cells[i].NewValue + "',";
		}
	}
	sqlfield = sqlfield.substring(0, sqlfield.length - 1);
	sqlvalue = sqlvalue.substring(0, sqlvalue.length - 1);

	var sql = "insert into " + unescape(document.getElementById('table0').DataSource) + "(" + sqlfield + ")" + " values(" + sqlvalue + ")";
	alert(sql);

	commandtype = "execute";
	var url = "Server/DataAccess.aspx" + Request.ToString() + "&command=" + commandtype + "&DataSource=" + document.getElementById('table0').DataSource + "&temp=" + Math.random();

	xml = SendInfoToSever(url, sql);
	if (xml.indexOf("错误:") != -1) {
		alert(xml + '\n' + sql);
		return;
	}
	obj.parentNode.innerHTML = '-';

	row.removeAttribute("isNew");
}

function btn_cancel(obj) {
	//debugger;debugger;
	var index = obj.parentNode.parentNode.rowIndex;
	obj.parentNode.parentNode.parentNode.parentNode.deleteRow(index);
}

AttachEvent(window, "load", initEvents, false);

function initEvents() {
	var inter = setInterval(function() {
		if (document.getElementById('div1')) {
			// 将事件添加到表格上
			AttachEvent(document.getElementById('div1'), "keydown", InputKeyDown, false);
			clearInterval(inter);
		}
	}, 10);
};

// input鼠标按下事件
var InputKeyDown = function(evt) {
	var e = window.event || evt;
	// keycode
	var key = e.keyCode;
	var evtSrc;
	if (document.all)
		evtSrc = e.srcElement;
	else
		evtSrc = e.target;
	if (evtSrc.tagName.toLowerCase() !== "input")
		return;
	// copy.
	if (e.ctrlKey && (key == 67 || key == 99)) {}
	// paste.
	if (e.ctrlKey && (key == 86 || key == 118)) {
		e.keyCode = 0;
		// 根据粘贴板数据添加行
		AffixSingleColumn(evtSrc);
		// 阻止默认事件
		if (e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
	}
};

// 根据粘贴板数据添加行
function AffixSingleColumn(evt) {
	// 获取粘贴板内容
	var content = getClipboard();
	// 转换数组
	var valArray = content.split("\n");
	// 长度
	var valArrayLen = valArray.length;
	// 获取cell
	if (evt.parentElement == null)
		return;
	// 列号
	var cellindex = evt.parentElement.cellIndex;
	// 行号
	var rowindex = evt.parentElement.parentElement.rowIndex;
	// 遍历数组
	for (var j = 0; j < valArrayLen; j++) {
		if (valArray[j] == "") continue;
		// 行数据拆分
		var arry = valArray[j].split("\t");
		var k = 0;
		// 单元行
		var row = evt.parentElement.parentElement.parentElement.parentElement.rows[rowindex + j];
		// 单元行不存在则添加行
		if (row == null || row === undefined) {
			row = new_line();
		}
		// 下标
		var idx = cellindex + 1;
		for (var i = idx; i < row.cells.length && k < arry.length; i++, k++) {
			// 单元格
			var cell = row.cells[i];
			// input
			var inps = row.cells[i].getElementsByTagName('input');
			if (inps.length > 0) {
				// input赋值
				cell.children[0].value = arry[k];
			} else {
				// select赋值
				if (cell.children[0].tagName.toLowerCase() === "select") {
					// check.value
					var options = cell.children[0].options;
					for (var m = 0; m < options.length; m++) {
						if (options[m].value === arry[k].trim()) {
							// 选中
							options[m].selected = true;
						}
					}
				} else {
					// 设置显示text
					cell.innerHTML = arry[k].trim();
				}
			}
			// 获取select被选中的值
			// 粘贴的值可能不存在与select的options中 
			if (cell.children[0].tagName.toLowerCase() === "select") {
				attr(cell, cell.children[0].options[cell.children[0].options.selectedIndex].value);
				attr(cell, "NewValue", cell.children[0].options[cell.children[0].options.selectedIndex].value);
			} else {
				// 新值
				attr(cell, "NewValue", arry[k].trim());
			}
		}
	}
};

// 获取粘贴板数据
function getClipboard() {
	if (window.clipboardData) {
		return (window.clipboardData.getData('Text'));
	}
}

// 兼容浏览器: 加入事件
function AttachEvent(target, eventName, handler, argsObject) {
	var eventHandler = handler;
	if (argsObject) {
		eventHander = function(e) {
			handler.call(argsObject, e);
		}
	}
	eventName = eventName.replace('on', '');
	if (window.attachEvent) //IE   
		target.attachEvent("on" + eventName, eventHandler);
	else //FF   
		target.addEventListener(eventName, eventHandler, false);
}

// 批量添加
function batch_add() {
	// 获取表格
	var table = document.getElementById('table0').getElementsByTagName('table')[0];
	// 多个sql语句开始标签
	var sqls = "<sqls>";
	// 需要插入的字段
	var sqlfield = '';
	// 插入字段是否已经获取
	var flag = false;
	// 需要更新的行
	var updateRows = [];
	// 遍历表格
	for (var i = 1; i < table.rows.length; i++) {
		var row = table.rows[i];
		// 查找新添加的行
		if (!row.getAttribute("isNew"))
			continue;
		// 插入值
		var sqlvalue = '';
		// 行数据是否存在
		var exsitData = false;
		// 遍历单元格
		for (var j = 0; j < row.cells.length; j++) {
			var cell = row.cells[j];
			// 是否是新添加的字段值
			if (typeof(cell.NewValue) != "undefined") {
				// 未获取到插入的字段
				if (flag === false) {
					// 字段拼接
					sqlfield += attr(cell, 'Field') + ',';
				}
				// 插入值
				sqlvalue += "'" + cell.NewValue + "',";
				exsitData = true;
			}
		}
		if (exsitData === false)
			continue;
		// 未查找到插入的字段
		if (flag === false) {
			// 去掉结尾的逗号
			if (sqlfield.lastIndexOf(",") !== -1)
				sqlfield = sqlfield.substring(0, sqlfield.lastIndexOf(","));
		}
		// 插入字段已经查找到
		flag = true;
		// 插入值
		sqlvalue = sqlvalue.substring(0, sqlvalue.length - 1);
		// 插入语句
		sqls += "<sql>insert into " + unescape(document.getElementById('table0').DataSource) + "(" + sqlfield + ") values (" + sqlvalue + ")</sql>";
		// 删除属性
		row.removeAttribute("isNew");
		// 添加数组
		updateRows.push(row);
	}
	// 结尾标记
	sqls += "</sqls>";
	// 没有更新的数据行
	if (updateRows.length <= 0) {
		return;
	}
	// command
	var commandtype = "exec_sqls";
	// 接口地址
	var url = "Server/DataAccess.aspx" + Request.ToString() + "&command=" + commandtype + "&temp=" + Math.random();
	// 更新操作
	xml = SendInfoToSever(url, sqls);
	// 错误判断
	if (xml.indexOf("错误:") != -1) {
		alert(xml + '\n' + sqls);
		// 设置更新成功后的页面显示
		for (var i = 0; i < updateRows.length; i++) {
			updateRows[i].setAttribute("isNew", true);
		}
		return;
	} else {
		// 设置更新成功后的页面显示
		ViewInits();
	}
};