var sheetOne;
var ExcelApp;

function read() {
	var file = document.getElementById('excel_').value;
	document.getElementById('content').innerHTML = '';
	if (file)
		loadFile(file);
};

function loadFile(filepath) {
	/**
	wps:
	ExcelApp = new ActiveXObject('et.Application');
	**/
	ExcelApp = new ActiveXObject('Excel.Application');
	/**
	文档界面是否可见
	ExcelApp.visible = true // 可见
	**/
	ExcelApp.visible = false;
	/**
		Open(Filename, [UpdateLinks, ReadOnly, Format, Password, WriteResPassword, IgnoreReadOnlyRecommended, Origin, Delimiter, Editable, Notify, Converter, AddToMru, Local, CorruptLoad])
	**/
	var xlBook = ExcelApp.Workbooks.open(filepath);
	sheetOne = xlBook.Worksheets(1);

	var range_ = getRange();

	/**
	// 选择单元格
	sheetOne.Range(sheetOne.cells(range_.row_0, range_.col_0), sheetOne.Cells(range_.row_1, range_.col_1)).Select;
	var cells = ExcelApp.Selection.cells;
	**/

	var table = document.createElement('table');
	table.cellpadding = 0;
	table.cellspacing = 0;
	var tbody = document.createElement('tbody');
	/**
		TODO 合并单元格
	**/
	for (var i = range_.row_0; i <= range_.row_1; i++) {
		var tr = document.createElement('tr');
		for (var j = range_.col_0; j <= range_.col_1; j++) {
			var td = document.createElement('td');
			td.innerHTML = sheetOne.cells(i, j).value ? sheetOne.cells(i, j).value : '';
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	document.getElementById('content').appendChild(table);
	/**
		文档界面可见时，关闭文档
		xlBook.close();
	**/
	ExcelApp.Application.Quit();
};

function getRange() {
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	return {
		row_0: parseInt(start.split(',')[0]),
		row_1: parseInt(end.split(',')[0]),
		col_0: parseInt(start.split(',')[1]),
		col_1: parseInt(end.split(',')[1])
	};
};