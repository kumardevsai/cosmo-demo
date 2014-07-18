// 标签面板
var tabPanelGroup = (function(win) {

	// 文档
	var doc = win.document;

	// 标签父元素
	var tabParent;

	// 标签集合
	var tabs = {
		collection: {},
		activedId: null,
		activeOne: function(tab) {
			if (this.activedId)
				this.disActiveOne(this.collection[this.activedId]);

			tab.active();
			this.activedId = tab.id;
		},
		disActiveOne: function(tab) {
			tab.disActive();
			this.activedId = null;
		},
		destroyOne: function(tab) {
			tab.destroy();
			if (this.activedId === tab.id) {
				this.activedId = null;
				this.collection[tab.id] = null;
			}
		}
	};

	// 标签类型
	var Types = {
		// 报夹
		holder: "holder"
	};

	function Tab(obj) {
		this.id = "";
		this.panel = null;
		this.type = "";
		this.text = "";
		this.title = "";
		this.closable = true;
		this.actived = false;

		if (obj) {
			this.id = obj.id;
			this.type = obj.type ? obj.type : "";
			this.text = obj.text ? obj.text : "";
			this.title = obj.title ? obj.title : this.text;
			this.closable = obj.closable !== undefined ? obj.closable : true;
		}
	};

	Tab.prototype = (function() {
		return {
			active: function() {
				this.element.classList.add("active");
				this.actived = true;

				if (this.panel) {
					this.panel.show();
				}
			},
			disActive: function() {
				this.element.classList.remove("active");
				this.actived = false;

				if (this.panel) {
					this.panel.hide();
				}
			},
			on: function(name, handler, flag) {
				if (handler) {
					switch (name) {
						case "active":
							utils.AttachEvent(this.element, "click", handler, flag);
							break;
						case "close":
							utils.AttachEvent(this.element.children[0].children[0], "click", handler, flag);
							break;
						default:
							break;
					}
				}
			},
			destroy: function() {
				this.element.parentNode.removeChild(this.element);
				if (this.panel)
					this.panel.element.parentNode.removeChild(this.panel.element);
			}
		};
	}());

	function Panel() {
		this.tab = null;
		this.element = null;
		this.showed = false;
	};

	Panel.prototype = (function() {
		return {
			show: function() {
				this.element.style.display = "";
				this.showed = true;
			},
			hide: function() {
				this.element.style.display = "none";
				this.showed = false;
			},
			destroy: function() {
				this.element.parentNode.removeChild(this.element);
			}
		};
	}());

	// 模板
	var templates = {
		tab: '<li><a href="javascript:return false;" title="{title}">{text}{?<i class="glyphicon glyphicon-remove" style="margin-left:4px;"></i>?}</a></li>',
		panel: '<div class="panel panel-default" style="border-top:none;display:none;"><div class="panel-body"></div></div>'
	};

	/**
		@desciption 创建一个新的标签面板
		@param obj {id : String,text : String,type : String}
	**/
	function createNewPanel(obj, callback) {
		var tab = new Tab({
			id: "tab_" + obj.id,
			type: obj.type,
			text: obj.text,
			closable: obj.closable
		});
		var tabElement = createTab(obj);
		tabParent.appendChild(tabElement);
		tab.element = tabElement;
		tab.on("active", function() {
			if (tabs.activedId !== tab.id) {
				tabs.activeOne(tab);
			}
		}, false);
		if (tab.closable === true)
			tab.on("close", function() {
				tabs.destroyOne(tab);
			}, false);
		tabs.collection[tab.id] = tab;

		var panel = new Panel();
		var panelElement = createPanel();
		panelParent.appendChild(panelElement);
		panel.element = panelElement;

		tab.panel = panel;
		panel.tab = tab;
		if (callback)
			callback(panel.element);

		tabs.activeOne(tab);
	};

	// 创建标签
	function createTab(obj) {
		if (tabParent) {
			var temp = doc.createElement("div");
			var tpl = templates.tab.replace(/\{text\}/, obj.text).replace(/\{title\}/, obj.title ? obj.title : obj.text);
			if (obj.closable === false)
				tpl = tpl.replace(/\{\?.*\?\}/, "");
			else
				tpl = tpl.replace(/\{\?/, "").replace(/\?\}/, "");
			temp.innerHTML = tpl;
			return temp.children[0];
		}
	};

	// 创建面板
	function createPanel() {
		if (panelParent) {
			var temp = doc.createElement("div");
			temp.innerHTML = templates.panel;
			return temp.children[0];
		}
	};

	// 设置标签的父元素
	function setTabParent(el) {
		tabParent = getElement(el);
	};

	// 设置面板的父元素
	function setPanelParent(el) {
		panelParent = getElement(el);
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
		setTabParent: setTabParent,
		setPanelParent: setPanelParent
	};

}(window));