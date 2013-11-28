var mxwToolTip = (function() {
	// 实例
	var instance = null;
	// 阻止默认事件触发及冒泡
	function preventDefault(e) {
		if (e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
		if (e.stopPropagation)
			e.stopPropagation();
		else
			e.cancelBubble = true;
	};
	return {
		show: function(options) {
			// 获取事件
			var e = window.event ? window.event : arguments.callee.caller.arguments[0];
			if (typeof e === 'string') {
				if (options.e)
					e = options.e;
			}
			preventDefault(e);
			// 出发元素
			var et = e.srcElement ? e.srcElement : e.target;
			// 获取鼠标的位置
			var getMousePoint = function() {
				return {
					x: e.clientX,
					y: e.clientY
				};
			};
			// 配置
			var opts = {
				// 默认模板
				template: 'boot',
				// 箭头x偏移
				absX: 0,
				// 箭头y偏移
				absY: 2,
				// 箭头方向
				direction: 'up',
				// 箭头横移
				offX: 5,
				// 箭头纵移
				offY: 0,
				// 显示文本
				text: '',
				// 点击空白隐藏
				blankRemove: true,
				// 显示关闭按钮 
				closable: false
			};
			// 根据箭头方向初始化位置配置
			if (options.direction) {
				if (options.direction === 'down') {
					opts.absY = -2;
				} else if (options.direction === 'left') {
					opts.absX = 2;
					opts.absY = 0;
					opts.offY = 5;
				} else if (options.direction === 'right') {
					opts.offY = 5;
					opts.absX = 2;
					opts.absX = 0;
				}
			}
			// 设置信息
			for (var i in options) {
				if (options.hasOwnProperty(i))
					opts[i] = options[i];
			}

			// 模板
			var templates = {
				boot: {
					html: '<div class="tip-inner"><div class="tip-arrow {arrow}" id="tip_arrow"></div><div class="tip-text" id="tip_text">{text}</div></div>'
				}
			};

			// 基本样式定义
			var def = {
				arrow: {
					cls: {
						up: 'arrow-up',
						down: 'arrow-down',
						left: 'arrow-left',
						right: 'arrow-right'
					}
				}
			};
			// 提示定义
			var MxwToolTip = function() {
				// 如果已经存在一个显示，则移除
				if (instance) {
					if (instance.ele && instance.ele.parentNode)
						instance.ele.parentNode.removeChild(instance.ele);
					instance = null;
				}
				instance = this;
				this.ele = null;
			};
			// 初始化
			MxwToolTip.prototype.init = function() {
				var html = templates[opts.template].html;
				html = html.replace(/\{arrow\}/, def.arrow.cls[opts.direction]).replace(/\{text\}/, opts.text);
				var div = document.createElement('div');
				div.className = 'tip-outer';
				div.id = 'tip_outer';
				div.innerHTML = html;
				this.ele = div;
				// 阻止消除元素
				if (opts.blankRemove === true) {
					if (window.attachEvent) {
						div.attachEvent('onclick', function(e_) {
							e_.cancelBubble = true;
						});
					} else if (window.addEventListener) {
						instance.ele.addEventListener('click', function(e_) {
							e_.stopPropagation();
						}, false);
					}
				}
			};

			// 绘制
			MxwToolTip.prototype.draw = function() {
				// 初始化
				this.init();
				// 显示
				document.body.appendChild(this.ele);
				// 获取箭头
				var arrow = document.getElementById('tip_arrow');
				// 获取显示主体
				var text_ele = document.getElementById('tip_text');

				// 计算外部容器的尺寸
				this.ele.style.height = text_ele.offsetHeight + 'px';
				this.ele.style.width = text_ele.offsetWidth + 'px';

				// 获取鼠标位置
				var mousePoint = getMousePoint();
				// 计算箭头位置
				var arrowPoint = {
					x: mousePoint.x + opts.absX,
					y: mousePoint.y + opts.absY
				};
				// 箭头相对于外部容器的位置
				var arrowRelativePoint = {
					x: 0,
					y: 0
				};
				// 外部容器位置
				var outerPoint = {
					x: 0,
					y: 0
				};
				// 计算外部容器位置
				switch (opts.direction) {
					case 'up':
						outerPoint = {
							x: arrowPoint.x - opts.offX - arrow.offsetWidth / 2,
							y: arrowPoint.y + arrow.offsetHeight
						};
						break;
					case 'left':
						outerPoint = {
							x: arrowPoint.x + arrow.offsetWidth,
							y: arrowPoint.y - opts.offY - arrow.offsetHeight / 2
						};
						break;
					case 'down':
						outerPoint = {
							x: arrowPoint.x - opts.offX - arrow.offsetWidth / 2,
							y: arrowPoint.y - text_ele.offsetHeight - arrow.offsetHeight
						};
						break;
					case 'right':
						outerPoint = {
							x: arrowPoint.x - text_ele.offsetWidth - arrow.offsetWidth,
							y: arrowPoint.y - opts.offY - arrow.offsetHeight / 2
						};
						break;
					default:
						break;
				}
				// 修改外部容器位置
				this.ele.style.left = outerPoint.x + 'px';
				this.ele.style.top = outerPoint.y + 'px';
				// 计算箭头位置
				switch (opts.direction) {
					case 'up':
						arrowRelativePoint = {
							x: opts.offX,
							y: -arrow.offsetHeight + 2
						}
						break;
					case 'left':
						arrowRelativePoint = {
							x: -arrow.offsetWidth + 2,
							y: opts.offY
						};
						break;
					case 'down':
						arrowRelativePoint = {
							x: opts.offX,
							y: text_ele.offsetHeight - 2
						};
						break;
					case 'right':
						arrowRelativePoint = {
							x: text_ele.offsetWidth - 2,
							y: opts.offY
						};
						break;
					default:
						break;
				}
				// 修改箭头位置
				arrow.style.left = arrowRelativePoint.x + 'px';
				arrow.style.top = arrowRelativePoint.y + 'px';
				return this;
			};
			MxwToolTip.prototype.remove = function() {
				if (this.ele && this.ele.parentNode)
					this.ele.parentNode.removeChild(this.ele);
				this = null;
			};
			// 创建
			instance = new MxwToolTip();
			// 绘制
			instance.draw();

			// 移除元素
			var remove = function(ev) {
				ev = window.event ? window.event : ev;
				var evt = ev.srcElement ? ev.srcElement : ev.target;
				if (instance)
					instance.remove();
			};
			if (opts.blankRemove === true) {
				if (window.attachEvent) {
					// 兼容ie各版本及兼容模式
					document.body.attachEvent('onclick', remove);
					window.attachEvent('onlick', remove);
				} else if (window.addEventListener)
					window.addEventListener('click', remove, false);
			}
		},
		clear: function() {
			if (instance)
				instance.remove();
		}
	};
})();