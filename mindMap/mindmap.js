// 脑图节点定义
function MindNode(text, id, R, x, y, leaf) {
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
    this.leaf = leaf ? leaf : 'left';
};

// 脑图节点绘制
MindNode.prototype.draw = function() {
    if (this.mindPaper === null)
        return;
    if (this.mindPaper.isDrawed === false)
        return;
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
    return this;
};

// 脑图节点绑定绘制面板
MindNode.prototype.bindMindPaper = function(mindPaper) {
    if (this.mindPaper === null) {
        // 绑定关系
        mindPaper.mindNodes.push(this);
        this.mindPaper = mindPaper;
    }
    return this;
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

// xml加载定义
var Load = {
    // 获取xml上下文本对象呢
    getXmlDoc: function(xml) {
        return LoadXml(xml);
    },
    // 根据文件地址获取xml字符串
    getXml: function(path) {
        var ajax = new Ajax(path);
        var response = ajax.doGet();
        if (response !== '' && response.indexOf('错误') === -1)
            return response;
    }
};

// 基本点定义
function MindPoint(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
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