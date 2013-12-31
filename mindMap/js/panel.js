(function() {
	var Panel = window.Panel = function(options) {
		var panelId = options.panelId;
		var element = document.getElementById(panelId);
		var container = options.container || document.body;
		var mindPaper = options.mindPaper || window.mindPaper;
		var MP = MindPaper || window.MindPaper;
		if (element === null)
			return;
		if (!(mindPaper instanceof MP))
			return;
		this.element = element;
		this.mindPaper = mindPaper;
		this.container = container;
		this.init();
	};
	var deltaX, deltaY;
	Panel.prototype = {
		init: function() {
			this.size();
			AttachEvent(this.panel, 'mousedown', this.onMouseDown, false);
		},
		size: function(_width, _height) {
			var _height = _width ? _width : this.container.offsetHeight;
			var _width = _height ? _height : this.container.offsetWidth;
			this.element.style.left = -(this.element.offsetWidth - _width) / 2 + 'px';
			this.element.style.top = -(this.element.offsetHeight - _height) / 2 + 'px';
		},
		onMouseDown: function(e) {
			deltaX = e.clientX - parseInt(this.element.style.left);
			deltaY = e.clientY - parseInt(panel.style.top);
			AttachEvent(this.element, 'mousemove', this.onMove, false);
			AttachEvent(this.element, 'mouseup', this.onMouseUp, false);
		},
		onMouseUp: function(e) {
			if (this.mindPaper && this.mindPaper.currentSelected)
				Drawing.up(this.mindPaper.currentSelected.element);
			this.mindPaper.currentSelected = null;
		},
		onClick: function(e) {
			AttachEvent(panel, 'click', panelUnSelect, false);
		},
		onMove: function(e) {
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			this.element.style.cursor = 'move';
			var _x = e.clientX - deltaX;
			var _y = e.clientY - deltaY
			this.element.style.left = _x + 'px';
			this.element.style.top = _y + 'px';
			if (options.moveCallback)
				options.moveCallback(_x, _y, e);
		}
	};
	Panel.create = function(options) {
		return new Panel(options);
	};
})();