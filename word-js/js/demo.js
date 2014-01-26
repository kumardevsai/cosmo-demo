/**
	实例：插入文字和表格
**/
var WordApp = new ActiveXObject("Word.Application");
var wdCharacter = 1
var wdOrientLandscape = 1
/**
	文档界面是否可见
	WordApp.Application.visible = true // 可见
**/
WordApp.Application.Visible = false;
var myDoc = WordApp.Documents.Add();
/**
	打开文档
	var myDoc = WordApp.Documents.Add('http://localhost/work-demo/word-js/files/基于SAML单点登录.doc', true);
**/

WordApp.ActiveDocument.PageSetup.Orientation = wdOrientLandscape

WordApp.Selection.ParagraphFormat.Alignment = 1 //1居中对齐,0为居右   
WordApp.Selection.Font.Bold = true
WordApp.Selection.Font.Size = 20

WordApp.Selection.TypeText("我的标题");
WordApp.Selection.MoveRight(wdCharacter);　　　　 //光标右移字符   
WordApp.Selection.TypeParagraph()　　　　　　　　　 //插入段落 相当于br   
WordApp.Selection.Font.Size = 12
WordApp.Selection.TypeText("副标题"); //分行插入日期    
WordApp.Selection.TypeParagraph()　　　　　　　　　 //插入段落   

// 表格未设置边框
var myTable = myDoc.Tables.Add(WordApp.Selection.Range, 8, 7) //8行7列的表格   
var aa = "我的列标题"

for (i = 0; i < 7; i++) {
	with(myTable.Cell(1, i + 1).Range) {
		font.Size = 12;
		InsertAfter(aa);
		ColumnWidth = 4;
		ParagraphFormat.Alignment = 1; //设置对齐方式 水平对齐    
	}
}

for (i = 0; i < 7; i++) {
	for (n = 0; n < 7; n++) {

		with(myTable.Cell(i + 2, n + 1).Range) {
			font.Size = 12;
			InsertAfter("bbbb");
			ParagraphFormat.Alignment = 1; //设置对齐方式 水平对齐   

		}
	}
}

function save() {
	var filename = document.getElementById('filename').value;
	var name = filename ? filename : '插入文字-word';
	myDoc.SaveAs("d:\\" + name + ".doc"); //保存word
	/**
		文档界面可见时，关闭文档
		myDoc.close();
	**/
	WordApp.Application.Quit();
};