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

	var row_0 = 2;
	var row_1 = 6;
	var col_0 = 1;
	var col_1 = 4;

	for (var i = row_0; i <= row_1; i++) {
		for (var j = col_0; j <= col_1; j++) {
			excelData(sheetOne.cells(i, j).value, sheetOne.cells(i, ++j).value);
		}
	}
	/**
		文档界面可见时，关闭文档
		xlBook.close();
	**/
	ExcelApp.Application.Quit();
};

function excelData(label, text) {
	var p = document.createElement('p');
	p.innerHTML = '<label><strong>' + label + ':</strong></label><em>' + text + '</em>';
	document.getElementById('content').appendChild(p);
};