/**
	VBA资料
	http://social.msdn.microsoft.com/search/en-US?query=word%20vba#refinementChanges=108,117&pageNumber=1&showMore=false
**/
/**
	参考文档：
	http://support.microsoft.com/kb/212682
	将文本插入到 Word 2000 中的文档的 VBA 宏示例
**/
/**
	var WordApp = new ActiveXObject("wps.Application");
**/
var WordApp = new ActiveXObject("Word.Application");
WordApp.Application.Visible = true;

var myDoc = WordApp.Documents.Add();

// 插入文字
WordApp.Selection.TypeText('文字1');

// 追加文字到最后 ， 注意查看文档中的顺序
WordApp.Selection.Range.Text = "追加文字1";

// 默认的批注字符选择为2个字符
WordApp.Selection.Comments.Add(WordApp.Selection.Range, '批注文字1');

// 插入文字
WordApp.Selection.TypeText('文字2');

// 追加文字到最后 ， 注意查看文档中的顺序
WordApp.Selection.Range.Text = "追加文字2";

// 追加文字到最后 ， 注意查看文档中的顺序
WordApp.Selection.Range.Text = "追加文字3";

// 设置选择字符开始位置
WordApp.Selection.start = 0;
// 设置选择字符结束位置
WordApp.Selection.end = 3;
// 批注字符的范围被设置为0~3
WordApp.Selection.Comments.Add(WordApp.Selection.Range, '批注文字2');

WordApp.Selection.end = 3;
// 根据WordApp.Selection.end位置进行插入
WordApp.Selection.Range.InsertAfter('InsertAfter');

WordApp.Selection.start = 0;
// 根据WordApp.Selection.start位置进行插入
WordApp.Selection.Range.InsertBefore('InsertBefore');

/**
	// 在当前插入点位置插入一个域 
	// 不知道如何实现
	// wdFieldQuote常量值参见 docs/WdFieldType.txt   
	// 此常量未在js中定义（没找到）
	WordApp.Selection.fields.add(WordApp.Selection.Range, wdFieldQuote, '');
**/
// 选择位移到最后
WordApp.Selection.start = WordApp.Selection.storyLength;
// 插入公式字段。结果设置为以美元符号
// 插入到最后，否则会插入到最前
// wps 不支持
// WordApp.Selection.InsertFormula('=100,000.0-45,000.0', '$#,##0.0');

// 添加页眉页脚
for (var i = 1; i <= WordApp.ActiveDocument.Sections.count; i++) {
	var section = WordApp.ActiveDocument.Sections.Item(i);
	// 一般文档页眉页脚只有一个 , 可以遍历
	var header = section.Headers(1);
	header.Range.style.ParagraphFormat.Alignment = 1;
	header.Range.Font.size = 10;
	header.Range.Text = '页眉';
	var footer = section.Footers(1);
	/**
		style.ParagraphFormat.Alignment
		0 左对齐 1 居中对齐 2 右对齐
	**/
	footer.Range.style.ParagraphFormat.Alignment = 1;
	footer.Range.Font.size = 12;
	footer.Range.Text = '页脚';
}
// 插入段落
WordApp.Selection.TypeParagraph();
// 插入日期
WordApp.Selection.InsertDateTime('MMMM dd, yyyy HH mm ss', false);

function save() {
	myDoc.SaveAs("d:\\插入文字.doc"); //保存word
	myDoc.close();
	WordApp.Application.Quit();
};