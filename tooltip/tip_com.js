/**
	使用时，屏幕中只会显示一个信息提示框

	使用方法:
	1.使用带标题的模板    title
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'spec'});
	这会显示一个带标题的信息提示，默认标题背景色为蓝色，用户可以修改样式文件中的tip-title，但不要修改块样式及宽度

	2.如果要设置箭头方向   direction
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'spec' , direction : 'left/right/down/up'});
	默认的箭头方向为up，箭头决定提示框的位置

	3.如果要设置箭头居中   arrowAlign
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'spec' , direction : 'left/right/down/up' , arrowAlign : 'center'});
	可选值有center和auto，默认auto,箭头方向相对于主体总是向左或者向上偏移

	4.如果要设置箭头对于当前点击位置的偏移  absX absY
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'spec' , direction : 'left/right/down/up' , arrowAlign : 'center' , absX : 10 , abxY : 10 });
	提示框对于当前点击出现的位置较远,数值可以为负

	5.如果要设置箭头对于消息框的位移 offX offY
	箭头向上或者向下时，可以设置offX，表示横移
	箭头向左或者向右时，可以设置offY，表示纵移
	若同时设置了arrowAlign，则参数失效
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'spec' , direction : 'left/right/down/up' ,offX/offY:10});

	5.通用不显示title的模板为boot
	mxwToolTipCom.show({title :'这是标题' , text : '这是内容' , template :'boot'});
	此时会忽略参数title
**/

var mxwToolTipCom = (function() {
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
				// 显示关闭按钮 没做 
				closable: false,
				// 默认箭头是否居中
				arrowAlign: 'auto'
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
				},
				spec: {
					html: '<div class="tip-inner"><div class="tip-arrow {arrow}" id="tip_arrow"></div><div class="tip-text-spec" id="tip_text"><div class="tip-title">{title}</div><span class="tip-content">{text}</span></div></div>'
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
			var MxwToolTipCom = function() {
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
			MxwToolTipCom.prototype.init = function() {
				var html = templates[opts.template].html;
				// 建议，如果不想显示模板spec的titile，请使用模板boot
				html = html.replace(/\{arrow\}/, def.arrow.cls[opts.direction]).replace(/\{text\}/, opts.text).replace(/\{title\}/, opts.title);
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
			MxwToolTipCom.prototype.draw = function() {
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
				if (opts.arrowAlign === 'auto') {
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
				} else if (opts.arrowAlign === 'center') {
					switch (opts.direction) {
						case 'up':
							outerPoint = {
								x: arrowPoint.x - text_ele.offsetWidth / 2,
								y: arrowPoint.y + arrow.offsetHeight
							};
							break;
						case 'left':
							outerPoint = {
								x: arrowPoint.x + arrow.offsetWidth,
								y: arrowPoint.y - text_ele.offsetHeight / 2
							};
							break;
						case 'down':
							outerPoint = {
								x: arrowPoint.x - text_ele.offsetWidth / 2,
								y: arrowPoint.y - text_ele.offsetHeight - arrow.offsetHeight
							};
							break;
						case 'right':
							outerPoint = {
								x: arrowPoint.x - text_ele.offsetWidth - arrow.offsetWidth,
								y: arrowPoint.y - text_ele.offsetHeight / 2
							};
							break;
						default:
							break;
					}
				}
				// 修改外部容器位置
				this.ele.style.left = outerPoint.x + 'px';
				this.ele.style.top = outerPoint.y + 'px';
				// 计算箭头位置
				if (opts.arrowAlign === 'auto') {
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
				} else if (opts.arrowAlign === 'center') {
					switch (opts.direction) {
						case 'up':
							arrowRelativePoint = {
								x: (text_ele.offsetWidth - arrow.offsetWidth) / 2,
								y: -arrow.offsetHeight + 2
							}
							break;
						case 'left':
							arrowRelativePoint = {
								x: -arrow.offsetWidth + 2,
								y: (text_ele.offsetHeight - arrow.offsetHeight) / 2
							};
							break;
						case 'down':
							arrowRelativePoint = {
								x: (text_ele.offsetWidth - arrow.offsetWidth) / 2,
								y: text_ele.offsetHeight - 2
							};
							break;
						case 'right':
							arrowRelativePoint = {
								x: text_ele.offsetWidth - 2,
								y: (text_ele.offsetHeight - arrow.offsetHeight) / 2
							};
							break;
						default:
							break;
					}
				}
				// 修改箭头位置
				arrow.style.left = arrowRelativePoint.x + 'px';
				arrow.style.top = arrowRelativePoint.y + 'px';
				return this;
			};
			MxwToolTipCom.prototype.remove = function() {
				if (this.ele && this.ele.parentNode)
					this.ele.parentNode.removeChild(this.ele);
				instance = null;
				// 其他浏览器可以使用this=null
			};
			// 创建
			instance = new MxwToolTipCom();
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