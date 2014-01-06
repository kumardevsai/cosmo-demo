(function() {
	var MindPaper = window.MindPaper = function(options) {
		var id = '',
			bindElement = document.body;
		if (options) {
			id = options.id ? options.id : id;
			bindElement = options.bindElement ? options.bindElement : bindElement;
		}
		var width = bindElement.offsetWidth,
			height = bindElement.offsetHeight;
		this.id = id;
		this.width = width;
		this.height = height;
		// 图形库对象
		this.raphael = null;
		// 绑定的元素
		this.bindElement = bindElement;
		// 连接线
		this.mindConnections = [];
		// 节点
		this.mindNodes = [];
		// 文本节点
		this.mindTexts = [];
		// 是否绘制在页面
		this.isDrawed = false;
		// 根节点
		this.rootMindNode = null;
		// 当前被选中的元素
		this.currentSelected = null;
	};
	MindPaper.prototype = {
		draw: function() {
			var r = new Raphael(this.bindElement, this.width, this.height);
			this.raphael = r;
			this.isDrawed = true;
			return this;
		},
		clear: function() {
			if (this.raphael)
				this.raphael.clear();
			this.mindConnections = [];
			this.mindNodes = [];
			this.mindTexts = [];
			return this;
		},
		setRoot: function(root) {
			// TODO 其他设置
			if (root.isRoot === false)
				root.isRoot = true;
			this.rootMindNode = root;
		},
		connectChildMindNodes: function() {
			var root = this.rootMindNode;
			root.connectChildMindNodes();
			return this;
		},
		drawChildMindNodesConnection: function() {
			var connections = this.mindConnections;
			for (var i = 0; i < connections.length; i++) {
				connections[i].draw();
			}
		},
		setCurrentSelected: function(mindNode) {
			if (mindNode instanceof MindNode)
				this.currentSelected = mindNode;
		},
		redrawConnections: function() {
			for (var i = this.mindConnections.length; i--;) {
				this.raphael.connection(this.mindConnections[i].element);
			}
		}
	};
	MindPaper.create = function(options) {
		return new MindPaper(options);
	};
})();