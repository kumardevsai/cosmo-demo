var MupTab = window.MupTab = (function(options) {

	var _slice = Array.prototype.slice;
	var _splice = Array.prototype.splice;

	var defaults = {
		template: "<ul class='tab' onclick=''><li class='left left-normal'></li><li class='middle middle-normal' data-tabId='{id}'>{text}</li><li class='right right-normal'><span class='close' onmouseover='this.className=\"close btn-hover\";' onmouseout='this.className=\"close\"'></span></li></ul>"
	};

	for (var i in options) {
		defaults[i] = options[i];
	}

	var TabElements = {};


	// 标签
	var Tab = function Tab(id, url, text, closable) {
		this.id = id ? id : "";
		this.url = url ? url : "";
		this.text = text ? text : "";
		this.closable = closable !== undefined ? closable : false;
		this.actived = false;
	};

	Tab.prototype = (function() {
		return {
			update: function(url, text, closable) {
				this.url = url;
				this.text = text;
				this.closable = closable;
			},
			remove: function() {

			},
			render: function() {
				document.body.innerHTML = defaults.template.replace(/\{id\}/, this.id).replace(/\{text\}/, this.text);
			}
		};
	}());

	var TabItems = {};

	var Group = function Group() {
		this.tabs = [];
	};

	Group.prototype = (function() {
		return {
			addOrUpdateTab: function(tab) {
				var oldTab = TabItems[tab.id];
				if (oldTab)
					oldTab.update(tab.url, tab.text, tab.closable);
				else {
					this.tabs.push(tab);
					TabItems[tab.id] = tab;
				}
				tab.render();
			},
			removeTab: function(id) {
				var oldTab = TabItems[id];
				if (oldTab) {
					oldTab.remove();
					delete TabItems[id];
					var index = this.getIndexById(id);
					if (index !== undefined)
						_splice.call(this.tabs, index, 1);
				}
			},
			getIndexById: function(id) {
				for (var i = 0; i < this.tabs.length; i++) {
					if (this.tabs[i].id === id)
						return i;
				}
			},
			getTabById: function(id) {
				var index = getIndexById(id);
				if (index)
					return this.tabs[index];
				else
					return null;
			}
		};
	}());

	var group = new Group();

	var addOrUpdateTab = function addOrUpdateTab(id, url, text, closable) {
		var message = "";
		if (!id)
			message += "id不能为空";
		if (message)
			return message;
		group.addOrUpdateTab(new Tab(id, url, text, closable === true ? closable : false));
	};

	var removeTab = function removeTab(id) {
		id ? group.removeTab(id) : null;
	};

	return {
		addOrUpdateTab: addOrUpdateTab,
		removeTab: removeTab
	};
}());