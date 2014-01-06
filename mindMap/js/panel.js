(function() {
	var Panel = window.Panel = function(options) {
		var panelId = '',
			element = null,
			container = document.body,
			mindPaper = window.mindPaper ? window.mindPaper : null,
			MP = MindPaper || window.MindPaper;
		if (options) {
			panelId = options.panelId ? options.panelId : panelId;
			element = document.getElementById(panelId) ? document.getElementById(panelId) : element;
			container = options.container ? options.container : container;
			mindPaper = options.mindPaper ? options.mindPaper : mindPaper;
			moveCallback = options.moveCallback ? options.moveCallback : new Function();
		}
		if (element === null)
			return;
		if (!(mindPaper instanceof MP))
			return;
		this.element = element;
		this.mindPaper = mindPaper;
		this.container = container;
		this.init();
	};
	var deltaX, deltaY, that, moveCallback;
	Panel.prototype = {
		init: function() {
			that = this;
			this.size();
			AttachEvent(this.element, 'mousedown', this.onMouseDown, false);
		},
		size: function(_width, _height) {
			var _width = _width ? _width : this.container.offsetWidth;
			var _height = _height ? _height : this.container.offsetHeight;
			this.element.style.left = -(this.element.offsetWidth - _width) / 2 + 'px';
			this.element.style.top = -(this.element.offsetHeight - _height) / 2 + 'px';
		},
		onMouseDown: function(e) {
			deltaX = e.clientX - parseInt(that.element.style.left);
			deltaY = e.clientY - parseInt(that.element.style.top);
			AttachEvent(that.element, 'mousemove', that.onMove, false);
			AttachEvent(that.element, 'mouseup', that.onMouseUp, false);
		},
		onMouseUp: function(e) {
			if (that.mindPaper && that.mindPaper.currentSelected)
				up(that.mindPaper.currentSelected.element);
			that.mindPaper.currentSelected = null;
			DetachEvent(that.element, 'mousemove', that.onMove, false);
		},
		onClick: function(e) {
			AttachEvent(that.element, 'click', panelUnSelect, false);
		},
		onMove: function(e) {
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			var _x = e.clientX - deltaX;
			var _y = e.clientY - deltaY
			that.element.style.left = _x + 'px';
			that.element.style.top = _y + 'px';
			if (moveCallback)
				moveCallback(_x, _y, e);
		}
	};
	Panel.create = function(options) {
		return new Panel(options);
	};
})();