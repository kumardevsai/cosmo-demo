/**
	TODO 拓展接口使能够代码调用修改状态
**/
var MupTab = window.MupTab = (function() {

	// 辅助工具
	var utils = {
		AttachEvent: function(target, eventName, handler, argsObject) {
			var eventHandler = handler;
			if (argsObject) {
				eventHander = function(e) {
					handler.call(argsObject, e);
				}
			}
			eventName = eventName.replace('on', '');
			if (window.attachEvent) //IE   
				target.attachEvent("on" + eventName, eventHandler);
			else //FF   
				target.addEventListener(eventName, eventHandler, false);
		},
		stopPropagation: function(e) {
			if (e.stopPropagation)
				e.stopPropagation();
			else
				e.cancelBubble = true;
		},
		nextSibling: function(ele) {
			return ele.nextElementSibling || ele.nextSibling;
		},
		insertAfter: function(insertEle, ele) {
			var nextSibling = this.nextSibling(ele);
			if (nextSibling)
				ele.parentNode.insertBefore(insertEle, nextSibling);
			else
				ele.parentNode.appendChild(insertEle);
		}
	};

	var _slice = Array.prototype.slice;
	var _splice = Array.prototype.splice;
	var _toString = Object.prototype.toString;

	// 文档
	// TODO 自由选择器获取作用域
	var doc = document;

	// 默认配置
	var defaults = {
		// 基础标签模板
		templateNormal: "<ul class='tab' data-tabId='{id}'><li class='left left-normal'></li><li class='middle middle-normal'>{text}</li><li class='right right-normal'>{<span class='close' data-close onmouseover='this.className=\"close btn-hover\";' onmouseout='this.className=\"close\"'></span>}?</li></ul>",
		// 激活状态下的标签模板
		templateActived: "<ul class='tab' data-tabId='{id}'><li class='left left-actived'></li><li class='middle middle-actived'>{text}</li><li class='right right-actived'>{<span class='close' data-close onmouseover='this.className=\"close btn-hover\";' onmouseout='this.className=\"close\"'></span>}?</li></ul>",
		// 标签最小层级
		zIndex: 100,
		// TODO 标签向左侧重叠的宽度
		marginLeft: -16,
		scrollLeftPercent: 40,
		scrollRightPercent: -40
	};

	// 设置配置
	function setOptions(options) {
		if (_toString.call(options)) {
			for (var i in options) {
				if (i === "container")
					setContainer(options[i]);
				else if (i === "target")
					setTarget(options[i]);
				else if (i === "nav")
					nav = getElement(options[i]);
				else
					defaults[i] = options[i];
			}
		}
	};

	// 获取元素
	function getElement(c) {
		var b;
		if (typeof c === "string")
			b = doc.getElementById(c);
		else if (typeof c === "object")
			b = c;
		return b;
	};

	// 标签容器
	var container;

	// 设置标签容器
	function setContainer(c) {
		var b = getElement(c);
		if (b)
			container = b;
	};

	// 标签滚动容器
	var nav;

	// 标签滚动
	function scrollerHelper(len) {
		var flag;
		if (len < 0)
			flag = checkScrollerRight();
		else
			flag = checkScrollerLeft();
		if (flag === true) {
			var l = (container.style.marginLeft ? parseInt(container.style.marginLeft) + len : len);
			container.style.marginLeft = (l > 0 ? 0 : l) + "px";
			if (l > 0)
				flag = false;
		}
		return flag;
	};

	// 检查标签滚动
	function checkScrollerLeft() {
		var l = container.style.marginLeft;
		if (l) {
			l = parseInt(l);
			if (l > 0)
				return false;
		}
		return true;
	};

	function checkScrollerRight() {
		var l = container.style.marginLeft;
		if (l) {
			l = parseInt(l);
			if (Math.abs(l) + nav.offsetWidth > getTabsLength())
				return false;
		}
		return true;
	}

	function getTabsLength() {
		var total = 0;
		for (var i in TabElements) {
			var tab = TabElements[i];
			total += tab.offsetWidth + defaults.marginLeft;
		}
		if (total > 0)
			total -= defaults.marginLeft;
		return total;
	};

	// 标签面板容器
	var target;

	// 设置标签面板容器
	function setTarget(c) {
		var b = getElement(c);
		if (b)
			target = b;
	};

	// 标签元素节点集合
	var TabElements = {};

	// 标签面板元素节点集合
	var frameElements = {};

	// 标签
	var Tab = function Tab(id, url, text, closable) {
		this.id = id ? id : "";
		this.url = url ? url : "";
		this.text = text ? text : "";
		// 是否可以被关闭（显示关闭按钮）
		this.closable = closable !== undefined ? closable : false;
		// 默认非激活状态
		this.actived = false;
	};

	// 标签类
	Tab.prototype = (function() {

		// 模板辅助函数
		function htmlHelper(html, flag) {
			// 验证是否存在关闭按钮标签
			if (/\}\?/.test(html)) {
				// 显示关闭按钮
				if (flag === true)
					html = html.replace(/\{</, "<").replace(/>\}\?/, ">");
				else
				// 不显示关闭按钮
					html = html.replace(/\{<.*>\}\?/, "");
			}
			return html;
		};

		// 事件监听辅助函数
		var attachEventHelper = function attachEventHelper(tab, that) {
			return function(e) {
				e = e || event;
				utils.stopPropagation(e);
				var evt = e.srcElement || e.currentTarget;
				// 如果点击的节点是关闭按钮
				if (evt.getAttribute("data-close") !== null)
				// 移除标签
					that.remove();
				else {
					// 如果点击的是标签   标签非激活状态
					if (that.actived === false)
					// 激活标签
						that.active();
				}
			};
		};


		// 临时元素节点获取辅助函数
		function tempElementHelper(str) {
			var temp = document.createElement("div");
			temp.innerHTML = str;
			var ele = temp.children[0];
			return ele;
		};

		// 切换标签状态
		function switchStatus(that) {
			// 原始标签
			var tab = TabElements[that.id];
			// 新标签
			var tabTemp = tempElementHelper(that.getHtml(that.actived === true ? defaults.templateActived : defaults.templateNormal));
			// 新标签插入到原始标签之后
			utils.insertAfter(tabTemp, tab);
			// 移除原始标签
			tab.parentNode.removeChild(tab);
			// 添加引用关系
			TabElements[that.id] = tabTemp;
			// 标签处于激活状态
			if (that.actived) {
				// 修改层级属性，使当前标签显示在最上层
				tabTemp.parentNode.style.zIndex = ++defaults.zIndex;
				resetPosition(tabTemp);
			}
			// 重新建立事件监听
			utils.AttachEvent(tabTemp, "click", attachEventHelper(tab, that), false);
		};

		function resetPosition(ele) {
			var width = ele.parentNode.offsetWidth;
			var left = ele.parentNode.offsetLeft - parseInt(nav.style.marginLeft ? nav.style.marginLeft : 0);
			if (left < 0) {
				scrollerHelper(Math.abs(left));
			} else {
				if (left + width > nav.offsetWidth) {
					scrollerHelper(nav.offsetWidth - left - width);
				}
			}
		};

		return {
			// 更新标签 
			// TODO 暂不支持
			update: function(url, text, closable) {
				return;
				this.url = url;
				this.text = text;
				this.closable = closable;
				this.render(true);
			},
			// 移除标签
			remove: function() {
				// id
				var id = this.id;
				// 从标签组中删除
				group.removeTab(id);
				// 获取标签节点
				var tab = TabElements[id];
				if (tab)
				// 删除标签及诶单
					tab.parentNode.removeChild(tab);
				// 如果当前删除的标签是处于激活状态的
				if (group.actived === this)
				// 激活标签引用为null
					group.actived = null;
				// 删除标签关系
				delete TabElements[id];

				// 标签面板
				var ifr = frameElements[id];
				if (ifr)
				// 删除标签面板
					ifr.parentNode.removeChild(ifr);
				// 删除面板关系
				delete frameElements[id];

				// 如果不存在激活的标签
				if (!group.actived) {
					// 获取集合中最后一个标签
					var last = group.tabs[group.tabs.length - 1];
					// 标签存在
					if (last)
					// 标签激活
						last.active();
				}
				// 删除关系
				delete TabItems[this.id];
			},
			// 渲染标签
			render: function(flag) {
				var tab;
				if (flag === true) {
					tab = TabElements[this.id];
					// TODO update
				} else {
					// 获取模板
					var str = this.getHtml(defaults.templateNormal);
					// 根据模板生成标签
					tab = tempElementHelper(str);
					// 创建父元素
					var li = document.createElement("li");
					li.className = "item";
					// 添加到父元素
					li.appendChild(tab);
					// 标签的总个数为1
					if (group.tabs.length === 1)
					// 样式左侧偏移为0
						li.style.marginLeft = 0 + "px";
					// 显示标签
					container.appendChild(li);
				}
				return tab;
			},
			// 创建标签面板
			createIframe: function() {
				// 创建元素节点
				var ifr = document.createElement("iframe");
				ifr.className = "ifr";
				// 显示到面板容器
				target.appendChild(ifr);
				return ifr;
			},
			// 添加标签
			add: function() {
				// 渲染
				var tab = this.render();
				// 添加标签节点引用关系
				TabElements[this.id] = tab;
				// 添加关系
				TabItems[this.id] = this;
				// 添加面板节点引用关系
				frameElements[this.id] = this.createIframe();
				// 添加事件监听
				utils.AttachEvent(tab, "click", attachEventHelper(tab, this), false);
				// 默认激活
				this.active();
			},
			// 根据模板获取格式化后的html字符串
			getHtml: function(template) {
				// 替换id和text
				var str = template.replace(/\{id\}/, this.id).replace(/\{text\}/, this.text);
				str = htmlHelper(str, this.closable);
				return str;
			},
			// 激活
			active: function() {
				// 未激活
				if (this.actived === false) {
					// 设置激活为true
					this.actived = true;
					// 切换标签的状态
					switchStatus(this);
					// 取得标签面板
					var ifr = frameElements[this.id];
					if (ifr) {
						// 如果还没有加载内容
						if (!ifr.src)
						// 加载内容
							ifr.src = this.url;
						// 显示
						ifr.style.display = "";
					}
					// 如果标签组存在激活的标签
					if (group.actived)
					// 此标签取消激活状态
						group.actived.cancelActive();
					// 添加当前激活标签的引用
					group.actived = this;
				}
			},
			// 取消标签的激活
			cancelActive: function() {
				// 标签已激活
				if (this.actived === true) {
					// 取消激活
					this.actived = false;
					// 切换状态
					switchStatus(this);
					// 获取索引
					var index = group.getIndexById(this.id);
					// 获取前一个标签索引
					var preIndex = index - 1;
					// 前置标签存在
					if (group.tabs[preIndex])
					// 减少层级
						TabElements[this.id].parentNode.style.zIndex = TabElements[group.tabs[preIndex].id].parentNode.style.zIndex - 1;
					// 获取面板
					var ifr = frameElements[this.id];
					if (ifr)
					// 隐藏面板
						ifr.style.display = "none";
				}
			}
		};
	}());

	// 标签集合，用于快速索引
	var TabItems = {};

	// 标签组
	var Group = function Group() {
		// 标签数组，有序
		this.tabs = [];
		// 处于激活状态的标签
		this.actived;
	};

	// 标签组类
	Group.prototype = (function() {
		return {
			// 添加或更新标签
			addOrUpdateTab: function(tab) {
				// 原始标签
				var oldTab = TabItems[tab.id];
				if (oldTab)
				// 更新
				// TODO 这个未做
					oldTab.update(tab.url, tab.text, tab.closable);
				else {
					// 添加新标签到数组中
					this.tabs.push(tab);
					// 添加
					tab.add();
				}
			},
			// 移除标签
			removeTab: function(id) {
				// 原始标签
				var oldTab = TabItems[id];
				if (oldTab) {
					// 获取标签索引下标
					var index = this.getIndexById(id);
					if (index !== undefined)
					// 重置数组
						_splice.call(this.tabs, index, 1);
				}
			},
			// 根据id获取对应标签的下标
			getIndexById: function(id) {
				for (var i = 0; i < this.tabs.length; i++) {
					if (this.tabs[i].id === id)
						return i;
				}
			},
			// 根据id获取标签
			// 此方法无用并未使用，计划移除
			getTabById: function(id) {
				var index = getIndexById(id);
				if (index)
					return this.tabs[index];
				else
					return null;
			}
		};
	}());

	// 组实例对象
	var group = new Group();

	// 添加或者更新标签函数
	function addOrUpdateTab(id, url, text, closable) {
		var message = "";
		if (!id)
			message += "id不能为空";
		if (message)
			return message;
		group.addOrUpdateTab(new Tab(id, url, text, closable === true ? closable : false));
	};

	// 移除标签函数
	function removeTab(id) {
		id ? group.removeTab(id) : null;
	};

	function scrollLeft() {
		return scrollerHelper(defaults.scrollLeftPercent);
	};

	function scrollRight() {
		return scrollerHelper(defaults.scrollRightPercent);
	};

	function activeTab(id, url, text, closable) {
		if (TabItems[id])
			TabItems[id].active();
		else
			addOrUpdateTab(id, url, text, closable);
	};

	/**
		外部调用接口
	**/
	return {
		addOrUpdateTab: addOrUpdateTab,
		setOptions: setOptions,
		setContainer: setContainer,
		setTarget: setTarget,
		scrollLeft: scrollLeft,
		scrollRight: scrollRight,
		activeTab: activeTab
	};
}());