/**
	var obj = {
		styleArray: getLinkStyles(),
		styles: getStyles(),
		rootPath: "",
		header: "我是页眉",
		footer: "我是页脚",
		html: document.getElementById("table0").children[1].innerHTML,
		root: 'div1',
		pageSetup: Boolean(flag)
	};

	传入打印模式窗口的参数：
	styleArray：当前页面样式链接地址
	styles：页面自定义样式
	header:页眉
	footer:页脚
	html:需要打印的内容
	root:需要将传入的html显示到的根节点，默认为div1
	pageSetup:是否需要设置页眉页脚，默认为false
**/

function letprint() {
	window.print();
};

function letprint_table_y() {
	letprint_table(true);
};

function letprint_table_n() {
	letprint_table(false);
};

function letprint_table(flag) {
	var url = "../../fileaccess.aspx?filename=reports/suppot_proc/打印/call_print.fpd&t=" + Math.random();
	var obj = {
		styleArray: getLinkStyles(),
		styles: getStyles(),
		rootPath: "",
		header: "我是页眉",
		footer: "我是页脚",
		html: document.getElementById("table0").children[1].innerHTML,
		root: 'div1',
		pageSetup: typeof flag === "undefined" ? false : Boolean(flag)
	};
	if (/msie/i.test(window.navigator.userAgent))
		window.showModelessDialog(url, obj, "dialogHeight:600px;dialogWidth:1200px;");
	else
		window.showModalDialog(url, obj, "dialogHeight:600px;dialogWidth:1200px;");
};

function getStyles() {
	var arr = [];
	var styles = document.getElementsByTagName("style");
	if (styles.length > 0) {
		for (var i = 0; i < styles.length; i++) {
			arr.push(styles[i].innerHTML);
		}
	}
	return arr;
};

function getLinkStyles() {
	var arr = [];
	var links = document.getElementsByTagName("link");
	if (links.length > 0) {
		for (var i = 0; i < links.length; i++) {
			if (links[i].type === "text/css") {
				arr.push(links[i].href);
			}
		}
	}
	return arr;
};