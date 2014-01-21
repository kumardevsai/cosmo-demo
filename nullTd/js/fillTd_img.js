// 遍历单元格
function eachForTable(tableId) {
	var tb_div = document.getElementById(tableId);
	var editType = tb_div.getAttribute('editType');
	var table = tb_div.getElementsByTagName('table')[0];
	var tbody = table.tBodies[0];
	var mergeCols = attr(tbody, 'MergeCols').split(',');
	var max_row = parseInt(mergeCols.pop());
	for (var i = 0; i < tbody.children.length; i++) {
		for (var j = 0; j <= tbody.children[i].cells.length; j++) {
			var cell = tbody.children[i].cells[j];
			if (cell) {
				if (attr(cell, 'row') !== null && attr(cell, 'row') > max_row) {
					// 修改显示样式
					checkNull(cell);
					// 如果单元格可编辑，则添加事件监听
					if (editType)
						addEvent(cell);
				}
			}
		}
	}
};

// 根据事件获取单元格
function checkNullEvent(e) {
	e = window.event || e;
	if (!e)
		return;
	var td;
	if (document.all)
		td = e.srcElement;
	else
		td = e.currentTarget;
	if (!td)
		return;
	checkNull(td);
};

// 添加背景图片样式
function fill(td) {
	if (!/nullTd/.test(td.className))
		td.className += ' nullTd';
};

// 事件监听
function addEvent(td) {
	if (window.attachEvent)
		td.attachEvent('onpropertychange', checkNullEvent);
	else if (window.addEventListener)
		td.addEventListener('input', checkNullEvent, false);
};

// 删除背景图片样式
function unFill(td) {
	if (/nullTd/.test(td.className))
		td.className = td.className.replace('nullTd', '').replace(/(^\s*)|(\s*$)/g, "");
};

// 检查单元格值是否为空
function checkNull(td) {
	var html_ = td.innerHTML;
	if (/<input/.test(html_)) {
		var input_ = td.firstElementChild;
		if (!checkStringAviliable(input_.value))
			fill(td)
		else
			unFill(td);
	} else {
		if (!checkStringAviliable(html_)) {
			fill(td);
		} else
			unFill(td);
	}
};

// 有效值验证
function checkStringAviliable(html_) {
	if (html_.replace(/(^\s*)|(\s*$)/g, "").replace(/&nbsp;/ig, '') === '')
		return false;
	else
		return true;
};