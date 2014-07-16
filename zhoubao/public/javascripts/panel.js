var panel = (function(win) {

	var doc = win.document;

	var tabParent;

	var tabs = {};

	var panels = {};

	var Types = {
		holder: "holder"
	};

	var templates = {
		tab: '<li><a href="javascript:openPanel()">{text}</a></li>'
	};

	function createNewPanel(obj) {
		var type = obj.type;
		switch (type) {
			case Types.holder:

				break;
			default:
				break;
		}
	};

	function createTab(obj) {
		if (tabParent) {
			var temp = doc.createElement("div");
			temp.innerHTML = templates.tab.replace(/\{text\}/, obj.text);
			tabParent.appendChild(temp.children[0]);
		}
	};

	function createPanel() {

	};

	function setTabParent(tab) {
		if (typeof tab === "string")
			tabParent = doc.getElementById(tab);
		else if (typeof tab === "object")
			tabParent = tab;
	};

	return {
		createNewPanel: createNewPanel,
		setTabParent: setTabParent
	};

}(window));