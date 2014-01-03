(function() {
	var MindNode = window.MindNode = function(options) {
		this.text = text ? text : '';
		this.id = id ? id : MindConfigration.getGeneratorMindNodeId();
		// 父节点
		this.parentMindNode = null;
		// 子节点
		this.childMindNodes = [];
		// 直径
		this.R = R ? R : 40;
		// 绑定的绘制面板元素
		this.mindPaper = null;
		// 中心点
		this.centerPoint = null;
		if (x !== undefined && y !== undefined)
			this.centerPoint = new MindPoint(x, y);
		else
			this.centerPoint = new MindPoint();
		// 是否已经绘制
		this.isDrawed = false;
		// 绘制在页面的显示元素
		this.element = null;
		// 左子节点或者右子节点，默认左
		this.side = side ? side : '';
		// 是否为最初根节点
		this.isRoot = isRoot ? isRoot : false;
		// 是否被选中
		this.selected = false;
		// 连接线
		this.connections = [];
	};
	MindNode.create = function(options) {
		return new MindNode(options);
	};
})();