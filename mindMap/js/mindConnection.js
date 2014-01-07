'use strict';
(function() {
	var MindConnection = window.MindConnection = function(options) {
		var id = MindConfigration.getGeneratorMindConnectionId(),
			text = '';
		if (options) {
			id = options.id ? options.id : id;
			text = options.text ? options.text : text;
		}
		// 左侧脑图节点
		this.leftMindNode = null;
		// 右侧脑图节点
		this.rightMindNode = null;
		this.id = id;
		this.text = text;
		// 绘制面板
		this.mindPaper = null;
		// 是否已经绘制
		this.isDrawed = false;
		// 显示的页面元素
		this.element = null;
	};
	MindConnection.prototype = {
		connect: function(leftMindNode, rightMindNode) {
			this.leftMindNode = leftMindNode;
			this.rightMindNode = rightMindNode;
			leftMindNode.connections.push(this);
			rightMindNode.connections.push(this);
			return this;
		},
		bindMindPaper: function(mindPaper) {
			if (this.mindPaper === null) {
				// 绑定关系
				mindPaper.mindConnections.push(this);
				this.mindPaper = mindPaper;
			}
			return this;
		},
		draw: function() {
			if (this.mindPaper === null)
				return;
			if (this.mindPaper.isDrawed === false)
				return;
			// 连接两端的节点并且绘制，默认颜色是黑色
			this.element = this.mindPaper.raphael.connection(this.leftMindNode.element, this.rightMindNode.element, '#000000');
			this.element.ownMindConnection = this;
			// 已经绘制到页面
			this.isDrawed = true;
			return this;
		},
		remove: function() {
			this.mindPaper.mindConnections.del(this.mindPaper.mindConnections.BinarySearch(this));
			this.leftMindNode.connections.del(this.leftMindNode.connections.BinarySearch(this));
			this.rightMindNode.connections.del(this.rightMindNode.connections.BinarySearch(this));
			this.element.line.remove();
		}
	};
	MindConnection.create = function(options) {
		return new MindConnection(options);
	};
})();