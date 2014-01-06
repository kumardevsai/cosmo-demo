(function() {
	var MindPoint = window.MindPoint = function(options) {
		var x = null,
			y = null;
		if (options) {
			x = options.x ? options.x : x;
			y = options.y　 ? options.y : y;
		}

		this.x = x;
		this.y = y;
	};
	MindPoint.prototype = {};
	MindPoint.create = function(options) {
		return new MindPoint(options);
	};
})();