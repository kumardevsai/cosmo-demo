// 脑图节点定义 TODO 左右子节点集应该独立设置  leafChildMindNodes and rightChildMindNodes
function MindNode(text, id, R, x, y, side, isRoot) {
    this.text = text ? text : '';
    this.id = id ? id : '';
    // 父节点
    this.parentMindNode = null;
    // 子节点
    this.childMindNodes = [];
    // 直径
    this.R = R ? R : 4;
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
    this.side = side ? side : 'left';
    // 是否为最初根节点
    this.isRoot = isRoot ? isRoot : false;
};

// 脑图节点绘制
MindNode.prototype.draw = function() {
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
            this.element = paper.ellipse(this.R / 2, this.R / 2, this.R / 2, this.R / 2);
        else
            this.element = paper.ellipse(this.centerPoint.x, this.centerPoint.y, this.R / 2, this.R / 2);
    }
    // 已经绘制在面板中
    this.isDrawed = true;
    this.drawChildren();
    return this;
};

// 脑图节点绑定绘制面板
MindNode.prototype.bindMindPaper = function(mindPaper) {
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
};

// 获取节点的全部节点
MindNode.prototype.getLeaves = function(side) {
    var chls = this.childMindNodes;
    if (side === undefined && side !== 'left' && side !== 'right')
        return chls;
    var arr = [];
    for (var i = 0; i < chls.length; i++) {
        if (side === chls[i].side)
            arr.push(chls[i]);
    }
    return arr;
};

// 获取节点的全部左子节点
MindNode.prototype.getLeftLeaves = function() {
    return this.getLeaves('left');
};

// 获取节点的全部右子节点
MindNode.prototype.getRightLeaves = function() {
    return this.getLeaves('right');
};

// 添加子节点，默认添加到左侧
MindNode.prototype.addLeafNode = function(mindNode) {
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
};

// 获取子节点位置
MindNode.prototype.getLeafPosition = function(leaf, reGet) {
    if (reGet === true)
        return this.reGetLeafPosition(leaf);
    else
        return leaf.centerPoint;
    return null;
};

// 经过计算重新获取子节点的位置
MindNode.prototype.reGetLeafPosition = function(leaf) {
    if (leaf.side === 'right')
        return this.getRightChildLeafPosition(leaf);
    else if (leaf.side === 'left')
        return this.getLeftChildLeafPosition(leaf);
    return null;
};

// 根据节点获取它在父节点左侧的相对位置
MindNode.prototype.getLeftChildLeafPosition = function(leaf) {
    var leftChldNodes = this.getLeftLeaves();
    var left_length = leftChldNodes.length;
    var leafIndex = this.getLeftLeafIndex(leaf);
    var y = this.getLeafRelativeY(leafIndex, left_length);
    var x = this.centerPoint.x - MindConfigration.mindNode.horizonMargin;
    return new MindPoint(x, y);
};

// 根据节点获取它在父节点右侧的相对位置
MindNode.prototype.getRightChildLeafPosition = function(leaf) {
    var rightChldNodes = this.getRightLeaves();
    var right_length = rightChldNodes.length;
    var leafIndex = this.getRightLeafIndex(leaf);
    var y = this.getLeafRelativeY(leafIndex, right_length);
    var x = this.centerPoint.x + MindConfigration.mindNode.horizonMargin;
    return new MindPoint(x, y);
};

// 根据父节点获取子节点的Y轴
MindNode.prototype.getLeafRelativeY = function(leafIndex, leaf_length) {
    var top = this.centerPoint.y - (leaf_length - 1) * MindConfigration.mindNode.verticalMargin / 2;
    return top + leafIndex * MindConfigration.mindNode.verticalMargin;
};

// 根据节点获取它在父节点的索引位置
MindNode.prototype.getLeafIndex = function(leaf) {
    if (leaf.side === 'right')
        return this.getLeftLeafIndex(leaf);
    else if (leaf.side === 'left')
        return this.getRightLeafIndex(leaf);
    else
        return null;
};

// 根据节点获取它在父元素左侧的索引位置
MindNode.prototype.getLeftLeafIndex = function(leaf) {
    var leftChldNodes = this.getLeftLeaves();
    var left_length = leftChldNodes.length;
    for (var i = 0; i < left_length; i++) {
        var leaf_ = leftChldNodes[i];
        if (leaf_ === leaf) {
            return i;
        }
    }
    return null;
};

// 根据节点获取它在父元素侧的索引右位置
MindNode.prototype.getRightLeafIndex = function(leaf) {
    var rightChldNodes = this.getRightLeaves();
    var right_length = rightChldNodes.length;
    for (var i = 0; i < right_length; i++) {
        var leaf_ = rightChldNodes[i];
        if (leaf_ === leaf) {
            return i;
        }
    }
    return null;
};

// 逐级绘制子节点
MindNode.prototype.drawChildren = function() {
    var children = this.childMindNodes;
    for (var i = 0; i < children.length; i++) {
        var c = children[i];
        c.draw();
        if (c.childMindNodes.length > 0)
            c.drawChildren();
    }
};

// 将自己与子节点进行关联
MindNode.prototype.connectChildMindNodes = function() {
    var chls = this.childMindNodes;
    for (var i = 0; i < chls.length; i++) {
        new MindConnection('', '').bindMindPaper(this.mindPaper).connect(this, chls[i]);
        if (chls[i].childMindNodes && chls[i].childMindNodes.length > 0)
            chls[i].connectChildMindNodes();
    }
};

// 脑图连接线定义
function MindConnection(text, id) {
    // 左侧脑图节点
    this.leftMindNode = null;
    // 右侧脑图节点
    this.rightMindNode = null;
    this.id = id ? id : '';
    this.text = text ? text : '';
    // 绘制面板
    this.mindPaper = null;
    // 是否已经绘制
    this.isDrawed = false;
    // 显示的页面元素
    this.element = null;
};

// 连接脑图节点
MindConnection.prototype.connect = function(leftMindNode, rightMindNode) {
    this.leftMindNode = leftMindNode;
    this.rightMindNode = rightMindNode;
    return this;
};

// 连接线绑定绘制面板
MindConnection.prototype.bindMindPaper = function(mindPaper) {
    if (this.mindPaper === null) {
        // 绑定关系
        mindPaper.mindConnections.push(this);
        this.mindPaper = mindPaper;
    }
    return this;
};

// 链接线绘制
MindConnection.prototype.draw = function() {
    if (this.mindPaper === null)
        return;
    if (this.mindPaper.isDrawed === false)
        return;
    // 连接两端的节点并且绘制，默认颜色是黑色
    this.element = this.mindPaper.raphael.connection(this.leftMindNode.element, this.rightMindNode.element, '#000000');
    // 已经绘制到页面
    this.isDrawed = true;
    return this;
};

// 文本节点定义
function MindText() {
    this.text = text ? text : '';
};

// 基本点定义
function MindPoint(x, y) {
    this.x = x ? x : null;
    this.y = y ? y : null;
};

// 脑图绘制面板定义
function MindPaper(bindElement, id, width, height) {
    this.id = id ? id : '';
    this.width = width ? width : document.body.clientWidth;
    this.height = height ? height : document.body.clientHeight;
    // 图形库对象
    this.raphael = null;
    // 绑定的元素
    this.bindElement = bindElement ? bindElement : document.body;
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
};

// 面板绘制
MindPaper.prototype.draw = function() {
    // 创建绘制页
    var r = new Raphael(this.bindElement, this.width, this.height);
    this.raphael = r;
    this.isDrawed = true;
    return this;
};

// 绘图面板清空
MindPaper.prototype.clear = function() {
    if (this.raphael)
        this.raphael.clear();
    this.mindConnections = [];
    this.mindNodes = [];
    this.mindTexts = [];
    return this;
};

// 设置根节点 可以有重绘操作
MindPaper.prototype.setRoot = function(root) {
    // TODO 其他设置
    if (root.isRoot === false)
        root.isRoot = true;
    this.rootMindNode = root;
};

// 设置节点连接
MindPaper.prototype.connectChildMindNodes = function() {
    var root = this.rootMindNode;
    root.connectChildMindNodes();
    return this;
};

// 绘制节点连接线
MindPaper.prototype.drawChildMindNodesConnection = function() {
    var connections = this.mindConnections;
    for (var i = 0; i < connections.length; i++) {
        connections[i].draw();
    }
};

var MindConfigration = {
    // 节点位置
    mindNode: {
        // 节点间垂直间距
        verticalMargin: 60,
        // 节点间水平间距
        horizonMargin: 100
    },
    // 根据脑图根节点计算子节点
    childrenPosition: function(parentNode, children_length) {
        var p_centerPoint = parentNode.centerPoint;
    }
};

// 加载脑图xml文件 TODO可以做其他处理
function getMindDocStruct(filepath) {
    var ajax = new Ajax(filepath);
    var responseXml = ajax.doGet();
    if (responseXml) {
        var xmlDoc = LoadXml(responseXml);
        if (xmlDoc !== null) {
            var root = xmlDoc.children[0];
            return getMindNodeByXmlNode(root);
        }
    }
    return null;
};

// 根据xml节点获取脑图节点
function getMindNodeByXmlNode(node) {
    var mindNode = new MindNode();
    var text = node.attributes['text'];
    var x = node.attributes['x'];
    var y = node.attributes['y'];
    var side = node.attributes['side'];
    var isRoot = node.attributes['isRoot'];
    if (isRoot === undefined) {
        if (node.parentNode === null || (node.parentNode && node.parentNode.nodeName === 'root'))
            isRoot = true;
        else
            isRoot = false;
    } else
        isRoot = isRoot.nodeValue;
    mindNode.isRoot = isRoot;
    if (x && y)
        mindNode.centerPoint = new MindPoint(x.nodeValue, y.nodeValue);
    if (side)
        mindNode.side = side.nodeValue;
    mindNode.text = text.nodeValue;
    if (node.children.length > 0) {
        var nodes = node.children[0];
        for (var i = 0; i < nodes.children.length; i++) {
            // 遍历子节点
            mindNode.addLeafNode(getMindNodeByXmlNode(nodes.children[i]));
        }
    }
    return mindNode;
};

// 获取绘图面板的中心点
function getViewPoint(mindPaper) {
    return new MindPoint(mindPaper.width / 2, mindPaper.height / 2);
};