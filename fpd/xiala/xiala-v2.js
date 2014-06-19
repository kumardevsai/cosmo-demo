var SearchGroup = (function(win) {

	var doc = win ? win.document : document;
	if (!doc)
		return;
	var body_ = doc.body;

	var isIe = doc.all ? true : false;

	// 默认配置
	var defaults = {
		// 模板
		template: "<ul class='dp-ul dp-ul-normal'>{<li value='{value}' title='{title}' class='dp-li dp-li-normal'>{text}</li>}*</ul>",
		// item hover
		itemHoverCls: "dp-li-hover"
	};

	// 修改配置
	function setDefaults(options) {
		for (var i in options) {
			if (options.hasOwnProperty(i) && defaults.hasOwnProperty(i))
				defaults[i] = options[i];
		}
	};

	// 正则
	var regExps = {
		// 模板子项
		templateItem: /\{(.*)\}\*/
	};

	// 查询框集合
	var searchInputs = {};

	// 查询文本框定义
	function SearchInput(id, text) {
		this.id = id ? id : "";
		// 文本
		this.text = text ? text : "";
		// 自定义下拉
		this.searchInputDropDown;
		// 页面元素
		this.element;
	};

	// 查询文本框原型
	SearchInput.prototype = (function() {
		return {
			// 搜索
			search: function() {
				// 调用下拉搜索
				return this.searchInputDropDown.search(this.text);
			},
			// 定义下拉关系
			setSearchInputDropDown: function(searchInputDropDown) {
				this.searchInputDropDown = searchInputDropDown;
				searchInputDropDown.searchInput = this;
			},
			updateInputText: function(text) {
				this.text = text;
				this.element.value = text;
			},
			focus: function() {
				this.element.focus();
			}
		};
	}());

	// 下拉列表定义
	function SearchInputDropDown(id) {
		this.id = id ? id : "";
		// 列表子项
		this.opts = [];
		// 默认不显示
		this.showed = false;
		// 页面元素
		this.element;
		// 所属查询文本框
		this.searchInput;
		// 当前要被选择的子项
		this.selectedOpt;
	};

	// 下拉列表原型
	SearchInputDropDown.prototype = (function() {
		return {
			// 设置子项集合
			setOpts: function(opts) {
				var i = 0;
				len = opts.length;
				for (i; i < len; i++) {
					this.addOpt(opts[i]);
				}
			},
			// 添加一个子项
			addOpt: function(opt) {
				this.opts.push(opt);
				opt.searchInputDropDown = this;
			},
			// 搜索，返回符合条件的子项集合
			search: function(keyword) {
				var reg = new RegExp("^" + keyword + "");
				var s = [],
					h = []
					i = 0,
					len = this.opts.length;
				for (i; i < len; i++) {
					var op = this.opts[i];
					if (reg.test(op.value))
						s.push(op);
					else
						h.push(op);
				}
				return {
					s: s,
					h: h
				};
			},
			// 隐藏下拉列表
			hide: function() {
				this.element.style.display = "none";
				this.showed = false;
			},
			// 显示下拉列表
			show: function() {
				this.element.style.display = "";
				this.showed = true;
			},
			upSelect: function() {
				this.keyboardSelect(this.getPreviousShowed());
				this.scroll();
			},
			downSelect: function() {
				this.keyboardSelect(this.getNextShowed());
				this.scroll();
			},
			keyboardSelect: function(showed) {
				this.selectedOpt.mouseon = false;
				this.selectedOpt.keyon = false;
				if (showed) {
					showed.select();
					showed.mouseon = true;
					showed.keyon = true;
				}
			},
			getCurrentSelectedIndex: function() {
				var i = 0,
					len = this.opts.length;
				for (i; i < len; i++) {
					if (this.opts[i] === this.selectedOpt)
						return i;
				}
				return -1;
			},
			getPreviousShowed: function(index) {
				var currentSelectedIndex = index !== undefined ? index : this.getCurrentSelectedIndex();
				if (currentSelectedIndex >= 0) {
					if (currentSelectedIndex - 1 >= 0) {
						if (this.opts[currentSelectedIndex - 1].showed === true)
							return this.opts[currentSelectedIndex - 1];
						else
							return this.getPreviousShowed(currentSelectedIndex - 1);
					} else
						return this.getPreviousShowed(this.opts.length);
				}
			},
			getNextShowed: function(index) {
				var currentSelectedIndex = index !== undefined ? index : this.getCurrentSelectedIndex();
				if (currentSelectedIndex >= -1) {
					if (currentSelectedIndex + 1 <= this.opts.length - 1) {
						if (this.opts[currentSelectedIndex + 1].showed === true)
							return this.opts[currentSelectedIndex + 1];
						else
							return this.getNextShowed(currentSelectedIndex + 1);
					} else
						return this.getNextShowed(-1);
				}
			},
			scrollUp: function() {
				this.element.scrollTop = this.element.scrollTop - (this.element.scrollTop - this.selectedOpt.element.offsetTop);
			},
			scrollDown: function() {
				this.element.scrollTop = this.selectedOpt.element.offsetTop - this.element.offsetHeight + this.selectedOpt.element.offsetHeight;
			},
			scrollWhere: function() {
				if (this.element.scrollTop + this.element.offsetHeight <= this.selectedOpt.element.offsetTop)
					return "down";
				if (this.element.scrollTop >= this.selectedOpt.element.offsetTop)
					return "up";
			},
			scroll: function() {
				var where = this.scrollWhere();
				if (where === "down")
					this.scrollDown();
				else if (where === "up")
					this.scrollUp();
			}
		};
	}());

	// 下拉列表子项
	function Opt(value, text) {
		// 值
		this.value = value ? value : "";
		// 文本
		this.text = text ? text : "";
		// 默认不显示
		this.showed = false;
		// 页面元素
		this.element;
		// 所属下拉列表
		this.searchInputDropDown;
		// 鼠标是否悬停在列表项上
		this.mouseon = false;
		// 是否进行键盘选择
		this.keyon = false;
	};

	// 下拉列表子项原型
	Opt.prototype = (function() {
		return {
			// 显示
			show: function() {
				this.element.style.display = "";
				this.showed = true;
			},
			// 隐藏
			hide: function() {
				this.element.style.display = "none";
				this.showed = false;
			},
			select: function() {
				if (this.searchInputDropDown.selectedOpt)
					this.searchInputDropDown.selectedOpt.unselect();
				// 添加样式
				var element = this.element;
				if (element.classList)
					element.classList.add(defaults.itemHoverCls);
				else
					element.className = element.className + " " + defaults.itemHoverCls;
				// 设置为被选中列表项
				this.searchInputDropDown.selectedOpt = this;
			},
			unselect: function() {
				// 移除效果
				var element = this.element;
				if (element.classList)
					element.classList.remove(defaults.itemHoverCls);
				else
					element.className = element.className.replace(defaults.itemHoverCls, "");
				// 设置当期被选中的列表项为空
				this.searchInputDropDown.selectedOpt = null;
			}
		};
	}());

	// 根据原型下拉获取列表子项
	function getOpts(sel) {
		var i = 0,
			len = sel.options.length,
			arr = [];
		for (i; i < len; i++) {
			var op = sel.options[i];
			arr.push(new Opt(op.value, op.innerHTML));
		}
		return arr;
	};

	// 搜索辅助函数
	var searchHelper = function(searchInput) {
		return function(e) {
			e = e || win.event;
			switch (e.keyCode) {
				case 38:
					if (searchInput.searchInputDropDown.showed === true)
						searchInput.searchInputDropDown.upSelect();
					break;
				case 40:
					if (searchInput.searchInputDropDown.showed === true)
						searchInput.searchInputDropDown.downSelect();
					break;
				case 37:
				case 39:
					break;
				case 13:
					if (searchInput.searchInputDropDown.showed === true)
						optSelectedHelperHandler(searchInput.searchInputDropDown.selectedOpt);
					break;
				default:
					// 更新搜索文本
					searchInput.text = searchInput.element.value;
					// 搜索
					searchHandler(searchInput, searchInput.search());
					searchInput.searchInputDropDown.element.style.height = "auto";
					setDropDownPostion(searchInput.searchInputDropDown);
					searchInput.searchInputDropDown.show();
					break;
			}
		};
	};

	function searchHandler(searchInput, result) {
		var s = result.s;
		var h = result.h;
		var i = 0,
			j = 0,
			len1 = s.length,
			len2 = h.length;
		var flag = false;
		for (i; i < len1; i++) {
			s[i].show();
			if (s[i] === searchInput.searchInputDropDown.selectedOpt)
				flag = true;
		}
		if (flag === false) {
			if (s[0])
				s[0].select();
		}
		for (j; j < len2; j++) {
			h[j].hide();
		}
		searchInput.searchInputDropDown.show();
	};

	var searchBlurHelper = function(searchInput) {
		return function() {
			var selectedOpt = searchInput.searchInputDropDown.selectedOpt;
			if (selectedOpt && (selectedOpt.mouseon === false || selectedOpt.mouseon === true && selectedOpt.keyon === true)) {
				searchInput.searchInputDropDown.element.style.height = "auto";
				searchInput.searchInputDropDown.hide();
			}
		};
	};

	var searchInputMouseDownHelper = function(searchInputDropDown) {
		return function(e) {
			searchInputDropDown.element.style.height = "auto";
			if (searchInputDropDown.showed === false) {
				// 点击下拉，显示所有的列表项，不应用当前的搜索
				searchHandler(searchInputDropDown.searchInput, searchInputDropDown.search(""));
				setDropDownPostion(searchInputDropDown);
				searchInputDropDown.show();
				// 文本框获取焦点
				searchInputDropDown.searchInput.focus();
			} else {
				searchInputDropDown.hide();
			}
		};
	};

	var searchInputDropDownMouseOverHelper = function(searchInputDropDown) {
		return function() {
			searchInputDropDown.searchInput.focus();
			if (searchInputDropDown.selectedOpt)
				searchInputDropDown.selectedOpt.mouseon = true;
		};
	};

	var searchInputDropDownMouseOutHelper = function(searchInputDropDown) {
		return function() {
			if (searchInputDropDown.selectedOpt)
				searchInputDropDown.selectedOpt.mouseon = false;
		};
	};

	var searchInputDropDownScrollHelper = function(searchInputDropDown) {
		return function() {
			searchInputDropDown.searchInput.element.focus();
		};
	};

	function setDropDownPostion(searchInputDropDown) {
		var input = searchInputDropDown.searchInput.element;
		var body_style = {
			height: body_.offsetHeight,
			scrollTop: body_.scrollTop
		};
		var input_style = {
			height: input.offsetHeight,
			offsetTop: input.parentNode.offsetTop
		};

		var topHeight = input_style.offsetTop - body_style.scrollTop;
		var bottomHeight = body_style.height - input_style.height - topHeight;

		var dropDown = searchInputDropDown.element;
		if (dropDown.offsetHeight <= bottomHeight) {
			if (dropDown.offsetHeight < 200) {
				dropDown.style.top = "20px";
				dropDown.style.height = "auto";
			} else {
				dropDown.style.top = "20px";
				dropDown.style.height = "200px";
			}
		} else {
			if (bottomHeight > 200) {
				dropDown.style.top = "20px";
				dropDown.style.height = "200px";
				return;
			}
			if (bottomHeight > 60) {
				dropDown.style.top = "20px";
				dropDown.style.height = bottomHeight + "px";
			} else {
				if (topHeight > dropDown.offsetHeight) {
					if (dropDown.offsetHeight > 200) {
						dropDown.style.top = "-200px";
						dropDown.style.height = "200px";
					} else {
						dropDown.style.top = "-" + dropDown.offsetHeight + "px";
						dropDown.style.height = "auto";
					}
				} else {
					if (topHeight > 200) {
						dropDown.style.top = "-200px";
						dropDown.style.height = "200px";
					} else {
						if (topHeight > 60) {
							dropDown.style.top = "-" + topHeight + "px";
							dropDown.style.height = topHeight + "px";
						} else {
							dropDown.style.top = "20px";
							if (dropDown.offsetHeight > 60)
								dropDown.style.height = "60px";
							else
								dropDown.style.height = "auto";
						}
					}
				}
			}
		}
	};

	// 创建下拉搜索
	function createSearch(sel, input) {
		// 获取页面下拉框的id
		var id = sel.id;
		var searchInput_ = searchInputs[id];
		if (!searchInput_) {

			searchInput_ = new SearchInput(id);
			searchInputs[id] = searchInput_;
			searchInput_.element = input;

			searchInputDropDown = createDropDown(getOpts(sel));
			searchInputDropDown.id = id;

			searchInput_.setSearchInputDropDown(searchInputDropDown);
			setDropDown2Doc(searchInputDropDown);
			searchInputDropDown.hide();

			// 按键抬起触发搜索
			AttachEvent(input, "keyup", searchHelper(searchInput_), false);
			AttachEvent(input, "blur", searchBlurHelper(searchInput_), false);
			AttachEvent(input, "mousedown", searchInputMouseDownHelper(searchInputDropDown), false);
			AttachEvent(searchInputDropDown.element, "mouseover", searchInputDropDownMouseOverHelper(searchInputDropDown), false);
			AttachEvent(searchInputDropDown.element, "mouseout", searchInputDropDownMouseOutHelper(searchInputDropDown), false);
			if (isIe)
				AttachEvent(searchInputDropDown.element, "scroll", searchInputDropDownScrollHelper(searchInputDropDown), false);
		}
	};

	// 列表项选择
	var optSelectedHelper = function(opt) {
		return function(e) {
			optSelectedHelperHandler(opt);
		};
	};

	function optSelectedHelperHandler(opt) {
		// 更新搜索文本
		opt.searchInputDropDown.searchInput.updateInputText(opt.value);
		// 隐藏下拉列表
		opt.searchInputDropDown.hide();
	};

	// 鼠标滑过列表项
	var optMouseOverHelper = function(opt) {
		return function() {
			opt.select();
			opt.mouseon = true;
		};
	};

	var optMouseOutHelper = function(opt) {
		return function() {
			opt.mouseon = false;
		};
	};

	// 创建下拉搜索列表
	function createDropDown(opts) {
		// 子项模板
		var itemTemplate = defaults.template.match(regExps.templateItem)[1];
		// 临时节点元素
		var temp = doc.createElement("div");
		// 创建外层ul
		temp.innerHTML = defaults.template.replace(regExps.templateItem, "");
		var ul = temp.children[0];
		var i = 0,
			len = opts.length;
		for (i; i < len; i++) {
			var opt = opts[i];
			// 替换模板的文本
			var str = itemTemplate.replace(/\{value\}/, opt.value).replace(/\{title\}/, opt.value).replace(/\{text\}/, opt.text);
			var tp = doc.createElement("ul");
			tp.innerHTML = str;
			var li = tp.children[0];
			ul.appendChild(li);
			opt.element = li;
			// 给列表项添加事件
			AttachEvent(li, "click", optSelectedHelper(opt), false);
			AttachEvent(li, "mouseover", optMouseOverHelper(opt), false);
			AttachEvent(li, "mouseout", optMouseOutHelper(opt), false);
		}
		var searchInputDropDown = new SearchInputDropDown();
		searchInputDropDown.element = ul;
		searchInputDropDown.setOpts(opts);
		return searchInputDropDown;
	};

	// 显示及定位下拉列表
	function setDropDown2Doc(searchInputDropDown) {
		var input = searchInputDropDown.searchInput.element;
		var refPosition = {
			width: input.offsetWidth
		};
		var tgtPosition = {
			width: !isIe ? refPosition.width - 2 : refPosition.width
		};
		var dropDown = searchInputDropDown.element;
		for (var i in tgtPosition) {
			dropDown.style[i] = tgtPosition[i];
		}
		input.parentNode.appendChild(dropDown);
	};

	// 更新搜索框的文本
	// 提供外部使用
	function updateInputText(id, text) {
		if (searchInputs[id])
			searchInputs[id].updateInputText(text);
	};

	return {
		createSearch: createSearch,
		updateInputText: updateInputText,
		setDefaults: setDefaults
	};
}(window));