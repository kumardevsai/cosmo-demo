/**
	常用方法：
	http://www.cnblogs.com/askyes/archive/2011/08/16/2141490.html
**/
var xlCenter = -4108;
var xlbottom = -4107;
var xlRight = -4152;
var sheetOne;
var ExcelApp;
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
var xlBook = ExcelApp.Workbooks.Add;
sheetOne = xlBook.Worksheets(1);
sheetOne.name = '张颖';
// 设置第一行好高度
sheetOne.Rows('1:1').RowHeight = 25;
/**
// 设置列宽度
sheetOne.Columns('A:A').ColumnWidth = 8;
**/
// 选择单元格
sheetOne.Range(sheetOne.cells(1, 1), sheetOne.Cells(1, 4)).Select;
// 获取标题单元格
var titleCell = sheetOne.cells(1, 1);
ExcelApp.Selection.Font.Size = 11;
ExcelApp.Selection.Font.bold = true;
// 设置蓝色
ExcelApp.Selection.Font.ColorIndex = 5;
ExcelApp.Selection.Font.Name = '宋体';
// 合并单元格
ExcelApp.Selection.Merge();
// 水平居中
ExcelApp.Selection.HorizontalAlignment = xlCenter;
// 垂直底部对齐
ExcelApp.Selection.VerticalAlignment = xlbottom;
// 单元格文本可以换行
ExcelApp.Selection.WrapText = true;
// 标题文本
titleCell.Formula = '员工卡片';

sheetOne.Range(sheetOne.cells(2, 1), sheetOne.Cells(6, 4)).Select;
ExcelApp.Selection.Font.Size = 9;
// 设置单元格宽度
ExcelApp.Selection.Cells.ColumnWidth = 11;
/**
	ColorIndex:
	http://msdn.microsoft.com/en-us/library/office/aa199411(v=office.10).aspx
**/
// 黑色
ExcelApp.Selection.Borders.ColorIndex = 1;
/**
	虚线：
	ExcelApp.Selection.Borders.Weight = 1;
**/
ExcelApp.Selection.Borders.Weight = 2;
// 背景设置淡蓝色
sheetOne.cells(2, 1).Interior.ColorIndex = 33;
sheetOne.cells(2, 1).Formula = '雇员ID：';

sheetOne.cells(3, 1).Interior.ColorIndex = 33;
sheetOne.cells(3, 1).Formula = '职务：';

sheetOne.cells(4, 1).Interior.ColorIndex = 33;
sheetOne.cells(4, 1).Formula = '分机：';

sheetOne.cells(5, 1).Interior.ColorIndex = 33;
sheetOne.cells(5, 1).Formula = '地址：';

sheetOne.cells(6, 1).Interior.ColorIndex = 33;
sheetOne.cells(6, 1).Formula = '邮编：';

sheetOne.cells(2, 3).Interior.ColorIndex = 33;
sheetOne.cells(2, 3).Formula = '姓名：';

sheetOne.cells(3, 3).Interior.ColorIndex = 33;
sheetOne.cells(3, 3).Formula = '性别：';

sheetOne.cells(4, 3).Interior.ColorIndex = 33;
sheetOne.cells(4, 3).Formula = '雇用日期：';

sheetOne.cells(5, 3).Interior.ColorIndex = 33;
sheetOne.cells(5, 3).Formula = '家庭电话：';

sheetOne.cells(6, 3).Interior.ColorIndex = 33;
sheetOne.cells(6, 3).Formula = '出生日期：';


sheetOne.cells(2, 2).Interior.ColorIndex = 2;
sheetOne.cells(2, 2).Formula = '1';

sheetOne.cells(3, 2).Interior.ColorIndex = 2;
sheetOne.cells(3, 2).Formula = '销售代表';

sheetOne.cells(4, 2).Interior.ColorIndex = 2;
sheetOne.cells(4, 2).Formula = '5467';

sheetOne.cells(5, 2).Interior.ColorIndex = 2;
sheetOne.cells(5, 2).Formula = '复兴门 245 号';

sheetOne.cells(6, 2).Interior.ColorIndex = 2;
sheetOne.cells(6, 2).Formula = '100098';

sheetOne.cells(2, 4).Interior.ColorIndex = 2;
sheetOne.cells(2, 4).Formula = '张颖';

sheetOne.cells(3, 4).Interior.ColorIndex = 2;
sheetOne.cells(3, 4).Formula = '女';

sheetOne.cells(4, 4).Interior.ColorIndex = 2;
sheetOne.cells(4, 4).Formula = '1992-5-1';

sheetOne.cells(5, 4).Interior.ColorIndex = 2;
sheetOne.cells(5, 4).Formula = '(010) 65559857';

sheetOne.cells(6, 4).Interior.ColorIndex = 2;
sheetOne.cells(6, 4).Formula = '1968-12-8';


/**
	方法定义:
	BorderAround(LineStyle , Weight , ColorIndex , [Color , ThemeColor])

	LineStyle参考资料：
	http://msdn.microsoft.com/en-us/library/office/microsoft.office.interop.excel.border.linestyle.aspx
**/
// 设置区域的边框样式
ExcelApp.Selection.BorderAround(7, 3, 1);

function save() {
	var filename = document.getElementById('filename').value;
	var name = filename ? filename : '插入表格-excel';
	sheetOne.SaveAs("d:\\" + name + ".xls"); //保存
	/**
		文档界面可见时，关闭文档
		xlBook.close();
	**/
	ExcelApp.Application.Quit();

	alert('保存成功!');
};