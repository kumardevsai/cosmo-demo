(function($) {
	$.fn.menuBorderSlide = function(options) {
		var defaults = {
			// 边框高度
			gtHeight: 4,
			// 边框颜色
			gtColor: '#CC0000',
			// 当前被选中的li的样式类
			currentClass: "current",
			// 振幅比率
			amplitude: 1 / 2,
			// 最小振幅宽度
			minAmplitudeLength: 30
		};
		var opts = $.extend(defaults, options);
		// 创建一个背景振动框
		var slideBorder = $("<div class=\"slide-border\" id=\"slide_border\"></div>");
		$("body").append(slideBorder);
		$this = $(this);
		// 获取ul对象
		var ul = $this.find("ul");
		// 获取ul对象下的第一个li对象
		var firstLi = ul.find("li").first();
		// 获取li的宽度
		var liWidth = firstLi.width();
		// 获取第一个li的顶部偏移
		var liTop = firstLi.offset().top;
		// 获取当前被选中的li对象
		var prevous = $("." + opts.currentClass + "");
		// 当前被选中的li的左偏移
		var prevousLeft = prevous.offset().left;
		// 初始化背景框
		initSildeBorder(slideBorder);
		// 初始化方法
		function initSildeBorder(o) {
			o.css({
				'width': liWidth + "px",
				'height': $this.height() + "px",
				'top': (liTop - opts.gtHeight) + "px",
				'left': prevousLeft + "px",
				// 上边框样式
				'border-top': '' + opts.gtHeight + 'px solid ' + opts.gtColor + '',
				// 下边框样式
				'border-bottom': '' + opts.gtHeight + 'px solid ' + opts.gtColor + ''
			});
		}
		var currentLeft;
		// 边框左右移动的标识，向右移动为true，向左移动为false
		var flag = true;
		// 全局计数器
		var t = 0;
		// 全局定时器
		var si;
		// 遍历所有li
		ul.find("li").each(function(i, val) {
			// 添加mouseover事件
			$(val).bind("mouseover", function() {
				// prevousLeft变量需要重新定义(纠结)
				var pl = prevousLeft;
				// 计算当前鼠标与预定义li的间距
				// 清除计时器
				t = 0;
				// 清除定时器
				clearInterval(si);
				// 创建一个新的定时器
				si = setInterval(function() {
					// 计时器+1
					t++;
					// 如果计时器的数值大于10，表示鼠标在当前的li元素上已经停留了一段时间
					if (t > 10) {
						currentLeft = $(val).offset().left;
						var leng = currentLeft - pl;
						// 如果间距小于零，表示当前向右移动
						if (leng < 0) {
							// 下一次向左移动
							flag = false;
							// 计算间距的绝对值
							leng = parseInt(avalue(leng)) - liWidth;
						} else {
							// 表示当前是向左移动的，下一次向右移动
							flag = true;
							leng = leng - liWidth;
						}
						// 开始偏移
						amp(flag, leng, 50, currentLeft);
						// 振动后计数器归零
						t = 0;
						// 振动后清除定时器
						clearInterval(si);
					}
					// 每10毫秒计数器自增
				}, 10);
				// 指向为当前li元素
				prevousLeft = currentLeft;
			});
		});

		function amp(flag, leng, time, currentLeft) {
			// 当前左偏移
			var l;
			leng = leng == null || isNaN(leng) ? 0 : leng;
			// 每调用一次间距减半
			leng = leng * opts.amplitude;
			// 向右移动
			if (flag == true) {
				// 增加
				l = currentLeft + liWidth + leng;
				// 下一次向左移动
				flag = false;
			} else {
				// 减少
				l = currentLeft - leng;
				// 下一次向右移动
				flag = true;
			}
			// 如果结果小于最小振幅宽度
			if (avalue(l - currentLeft) <= opts.minAmplitudeLength) {
				// 移动到当前选中的li元素上
				slideBorder.animate({
					'left': currentLeft + "px"
				}, time);
			} else {
				// 振动
				slideBorder.animate({
					'left': l + "px"
				}, time);
				// 回调
				amp(flag, leng, time, currentLeft);
			}
		}

		// 计算绝对值
		function avalue(value) {
			if (value < 0) {
				return String(value).substring(1, String(value).length);
			} else {
				return value;
			}
		}
	};

})(jQuery);