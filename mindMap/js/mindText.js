(function() {
	var MindText = window.MindText = function(options) {
		var text = '';
		if (options) {
			text = options.text ? options.text : text;
		}

		this.text = text;
	};
	MindText.prototype = {};
	MindText.create = function(options) {
		return new MindText(options);
	};
})();