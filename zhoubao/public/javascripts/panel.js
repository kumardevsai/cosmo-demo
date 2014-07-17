// 标签面板
var panel = (function(win) {

	// 文档
	var doc = win.document;

	// 标签父元素
	var tabParent;

	// 标签集合
	var tabs = {};

	// 面板父元素
	var panelParent;

	// 面板集合
	var panels = {};

	// 标签类型
	var Types = {
		// 报夹
		holder: "holder"
	};

	// 模板
	var templates = {
		tab: '<li><a href="javascript:openPanel()">{text}</a></li>'
	};

	// 创建一个新的标签面板
	/**
		{
			id : String,
			text : String,
			type : String		
		}
	**/
	function createNewPanel(obj) {
		var type = obj.type;
		switch (type) {
			case Types.holder:

				break;
			default:
				break;
		}
	};

	// 创建标签
	function createTab(obj) {
		if (tabParent) {
			var temp = doc.createElement("div");
			temp.innerHTML = templates.tab.replace(/\{text\}/, obj.text);
			tabParent.appendChild(temp.children[0]);
		}
	};

	// 创建面板
	function createPanel() {
		if (panelParent) {

		}
	};

	// 设置标签的父元素
	function setTabParent(tab) {
		tabParent = getElement(tab);
	};

	function getElement(el) {
		var element;
		if (typeof el === "string")
			element = doc.getElementById(el);
		else if (typeof el === "object")
			element = el;
		return element;
	};

	return {
		createNewPanel: createNewPanel,
		setTabParent: setTabParent
	};

}(window));