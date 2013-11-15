function MindNode(text, id, R, x, y) {
    this.text = text ? text : '';
    this.id = id ? id : '';
    this.parentMindNode = null;
    this.childMindNodes = [];
    this.R = R ? R : 20;
    this.mindPaper = null;
    this.centerPoint = null;
    if (x !== undefined && y !== undefined)
        this.centerPoint = new MindPoint(x, y);
    else
        this.centerPoint = new MindPoint();
    this.isDrawed = false;
    this.element = null;
};

MindNode.prototype.draw = function() {
    if (this.mindPaper === null)
        return;
    if (this.mindPaper.isDrawed === false)
        return;
    var paper = this.mindPaper.raphael;
    if (paper) {
        if (this.centerPoint === null || this.centerPoint.x - this.R / 2 < 0 || this.centerPoint.y - this.R / 2 < 0)
            this.element = paper.ellipse(this.R / 2, this.R / 2, this.R / 2, this.R / 2);
        else
            this.element = paper.ellipse(this.centerPoint.x, this.centerPoint.y, this.R / 2, this.R / 2);
    }
    this.isDrawed = true;
};

MindNode.prototype.bindMindPaper = function(mindPaper) {
    if (this.bindMindPaper === null) {
        mindPaper.mindNodes.push(this);
        this.mindPaper = mindPaper;
    }
    return this;
};

function MindConnection(text, id) {
    this.leftMindNode = null;
    this.rightMindNode = null;
    this.id = id ? id : '';
    this.text = text ? text : '';
    this.mindPaper = null;
    this.isDrawed = false;
};

MindConnection.prototype.connect = function(leftMindNode, rightMindNode) {
    this.leftMindNode = leftMindNode;
    this.rightMindNode = rightMindNode;
};

MindConnection.prototype.bindMindPaper = function(mindPaper) {
    if (this.mindPaper === null) {
        mindPaper.mindConnections.push(this);
        this.mindPaper = mindPaper;
    }
    return this;
};

MindConnection.prototype.draw = function() {
    if (this.mindPaper === null)
        return;
    if (this.mindPaper.isDrawed === false)
        return;
    this.mindPaper.raphael.connect(this.leftMindNode.element, this.rightMindNode.element);
    this.isDrawed = true;
};

function MindText() {
    this.text = text ? text : '';
};

var Load = {
    getXmlDoc: function(xml) {
        return LoadXml(xml);
    },
    getXml: function(path) {
        var ajax = new Ajax(path);
        var response = ajax.doGet();
        if (response !== '' && response.indexOf('错误') === -1)
            return response;
    }
};

function MindPoint(x, y) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
};

function MindPaper(bindElement, id, x, y, width, height) {
    this.id = id ? id : '';
    this.x = x ? x : 0;
    tis.y = y ? y : 0;
    this.width = width ? width : document.body.clientWidth;
    this.height = height ? height : document.body.clientHeight;
    this.raphael = null;
    this.bindElement = bindElement ? bindElement : document.body;
    this.mindConnections = [];
    this.mindNodes = [];
    this.mindTexts = [];
    this.isDrawed = false;
};

MindPaper.prototype.draw = function() {
    var r = new Raphael(this.bindElement, this.x, this.y, this.width, this.height);
    this.raphael = r;
    this.isDrawed = true;
    return r;
};

MindPaper.prototype.clear = function() {
    if (this.raphael)
        this.raphael.clear();
    this.mindConnections = [];
    this.mindNodes = [];
    this.mindTexts = [];
};