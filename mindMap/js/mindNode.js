'use strict';
(function() {
	var MindNode = window.MindNode = function(options) {
		var text = '',
			R = 20,
			side = '',
			isRoot = false,
			id = MindConfigration.getGeneratorMindNodeId(),
			x, y;
		if (options) {
			text = options.text ? options.text : text;
			R = options.R ? options.R : R;
			side = options.side ? options.side : side;
			isRoot = options.isRoot ? options.isRoot : isRoot;
			id = options.id;
			x = options.x;
			y = options.y;
		}

		this.text = text;
		this.id = id;
		// 父节点
		this.parentMindNode = null;
		// 子节点
		this.childMindNodes = [];
		// 直径
		this.R = R;
		// 绑定的绘制面板元素
		this.mindPaper = null;
		// 中心点
		this.centerPoint = null;
		if (x !== undefined && y !== undefined)
			this.centerPoint = new MindPoint({
				x: x,
				y: y
			});
		else
			this.centerPoint = new MindPoint();
		// 是否已经绘制
		this.isDrawed = false;
		// 绘制在页面的显示元素
		this.element = null;
		// 左子节点或者右子节点，默认左
		this.side = side;
		// 是否为最初根节点
		this.isRoot = isRoot;
		// 是否被选中
		this.selected = false;
		// 连接线
		this.connections = [];
	};
	MindNode.prototype = {
		draw: function() {
			if (this.mindPaper === null) {
				// 如果父节点绑定画板，则使用父元素的画板
				if (this.parentMindNode)
					this.bindMindPaper(this.parentMindNode.mindPaper);
			}
			if (this.mindPaper === null)
				return;
			if (this.mindPaper.isDrawed === false)
				return;
			if (this.isRoot === false) {
				if (!this.centerPoint.y || !this.centerPoint.x)
					this.centerPoint = this.parentMindNode.getLeafPosition(this, true);
			}
			// 获取面板元素
			var paper = this.mindPaper.raphael;
			if (paper) {
				// 默认绘制在左上角
				if (this.centerPoint === null || this.centerPoint.x - this.R / 2 < 0 || this.centerPoint.y - this.R / 2 < 0)
					this.element = paper.ellipse(this.R / 2, this.R / 2, (this.R / 2) * 1.5, this.R / 2);
				else
					this.element = paper.ellipse(this.centerPoint.x, this.centerPoint.y, (this.R / 2) * 1.5, this.R / 2);
				this.element.ownMindNode = this;
			}
			// 已经绘制在面板中
			this.isDrawed = true;
			this.drawChildren();
			return this;
		},
		bindMindPaper: function(mindPaper) {
			if (this.mindPaper === null) {
				// 绑定关系
				this.mindPaper = mindPaper;
				mindPaper.mindNodes.push(this);
				// 设置画板的根节点
				if (this.isRoot === true) {
					mindPaper.setRoot(this);
					if (!this.centerPoint.x && !this.centerPoint.y)
						this.centerPoint = getViewPoint(mindPaper);
				}
			}
			return this;
		},
		getLeaves: function(side) {
			var chls = this.childMindNodes;
			if (side === undefined && side !== 'left' && side !== 'right')
				return chls;
			var arr = [];
			for (var i = 0; i < chls.length; i++) {
				if (side === chls[i].side)
					arr.push(chls[i]);
			}
			return arr;
		},
		getLeftLeaves: function() {
			return this.getLeaves('left');
		},
		getRightLeaves: function() {
			return this.getLeaves('right');
		},
		addLeafNode: function(mindNode) {
			if (this.isRoot === true) {
				if (mindNode.side !== 'left' && mindNode.side !== 'right') {
					var clength = this.childMindNodes.length;
					var rlength = this.getRightLeaves().length;
					if (clength > rlength * 2)
						mindNode.side = 'right';
					else
						mindNode.side = 'left';
				}
			} else {
				if (this.side === 'left')
					mindNode.side = 'left';
				else if (this.side === 'right')
					mindNode.side = 'right';
			}
			this.childMindNodes.push(mindNode);
			mindNode.parentMindNode = this;
		},
		getLeafPosition: function(leaf, reGet) {
			if (reGet === true)
				return this.reGetLeafPosition(leaf);
			else
				return leaf.centerPoint;
			return null;
		},
		reGetLeafPosition: function(leaf) {
			if (leaf.side === 'right')
				return this.getRightChildLeafPosition(leaf);
			else
				return this.getLeftChildLeafPosition(leaf);
		},
		getLeftChildLeafPosition: function(leaf) {
			var leftChldNodes = this.getLeftLeaves();
			var left_length = leftChldNodes.length;
			var leafIndex = this.getLeftLeafIndex(leaf);
			var y = this.getLeafRelativeY(leafIndex, left_length);
			var x = this.centerPoint.x - MindConfigration.mindNode.horizonMargin;
			return new MindPoint({
				x: x,
				y: y
			});
		},
		getRightChildLeafPosition: function(leaf) {
			var rightChldNodes = this.getRightLeaves();
			var right_length = rightChldNodes.length;
			var leafIndex = this.getRightLeafIndex(leaf);
			var y = this.getLeafRelativeY(leafIndex, right_length);
			var x = this.centerPoint.x + MindConfigration.mindNode.horizonMargin;
			return new MindPoint({
				x: x,
				y: y
			});
		},
		getLeafRelativeY: function(leafIndex, leaf_length) {
			var top = this.centerPoint.y - (leaf_length - 1) * MindConfigration.mindNode.verticalMargin / 2;
			return top + leafIndex * MindConfigration.mindNode.verticalMargin;
		},
		getLeafIndex: function(leaf) {
			if (leaf.side === 'right')
				return this.getLeftLeafIndex(leaf);
			else if (leaf.side === 'left')
				return this.getRightLeafIndex(leaf);
			else
				return null;
		},
		getLeftLeafIndex: function(leaf) {
			var leftChldNodes = this.getLeftLeaves();
			var left_length = leftChldNodes.length;
			for (var i = 0; i < left_length; i++) {
				var leaf_ = leftChldNodes[i];
				if (leaf_ === leaf) {
					return i;
				}
			}
			return null;
		},
		getRightLeafIndex: function(leaf) {
			var rightChldNodes = this.getRightLeaves();
			var right_length = rightChldNodes.length;
			for (var i = 0; i < right_length; i++) {
				var leaf_ = rightChldNodes[i];
				if (leaf_ === leaf) {
					return i;
				}
			}
			return null;
		},
		drawChildren: function() {
			var children = this.childMindNodes;
			for (var i = 0; i < children.length; i++) {
				var c = children[i];
				if (c.isDrawed === false)
					c.draw();
				if (c.childMindNodes.length > 0)
					c.drawChildren();
			}
		},
		connectChildMindNodes: function() {
			var chls = this.childMindNodes;
			for (var i = 0; i < chls.length; i++) {
				new MindConnection().bindMindPaper(this.mindPaper).connect(this, chls[i]);
				if (chls[i].childMindNodes && chls[i].childMindNodes.length > 0)
					chls[i].connectChildMindNodes();
			}
		},
		remove: function() {
			if (this.parentMindNode) {
				this.parentMindNode.childMindNodes.del(this.parentMindNode.childMindNodes.BinarySearch(this));
				this.mindPaper.mindNodes.del(this.mindPaper.mindNodes.BinarySearch(this));
			}
			for (var i = 0; i < this.connections.length; i++)
				this.connections[i].remove();
			this.element.remove();
		},
		redraw: function() {
			this.redrawChildren(this);
			this.mindPaper.redrawConnections();
		},
		redrawChildren: function() {
			for (var i = 0; i < this.childMindNodes.length; i++) {
				var node = this.childMindNodes[i];
				node.centerPoint = this.getLeafPosition(node, true);
				node.element.attr({
					cx: node.centerPoint.x,
					cy: node.centerPoint.y
				});
				if (node.childMindNodes.length > 0)
					node.redrawChildren();
			}
		}
	};
	MindNode.create = function(options) {
		return new MindNode(options);
	};
})();