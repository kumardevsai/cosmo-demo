'use strict';
var MindConfigration = {
    // 节点位置
    mindNode: {
        // 节点间垂直间距
        verticalMargin: 60,
        // 节点间水平间距
        horizonMargin: 100,
        // 节点id前缀
        prefix_node_id: 'mind_node_',
        // 连接线默认前缀
        prefix_connection_id: 'mind_con_'
    }
};

// 获取节点
MindConfigration.getGeneratorMindNodeId = (function() {
    var id = -1;
    return function() {
        id++;
        return MindConfigration.mindNode.prefix_node_id + id;
    };
}());

// 获取连接线id
MindConfigration.getGeneratorMindConnectionId = (function() {
    var id = -1;
    return function() {
        id++;
        return MindConfigration.mindNode.prefix_connection_id + id;
    };
}());

// 加载脑图xml文件 TODO可以做其他处理
function getMindDocStruct(filepath) {
    var ajax = new Ajax(filepath);
    var responseXml = ajax.doGet();
    if (responseXml) {
        var xmlDoc = LoadXml(responseXml);
        if (xmlDoc !== null) {
            var root = xmlDoc.childNodes[0];
            return getMindNodeByXmlNode(root);
        }
    }
    return null;
};

// 根据xml节点获取脑图节点
function getMindNodeByXmlNode(node) {
    function getAttributeValue(att) {
        if (node.attributes) {
            if (document.all)
                return node.attributes.getNamedItem(att);
            else
                return node.attributes[att];
        }
    };
    var mindNode = new MindNode();
    var text = getAttributeValue('text');
    var x = getAttributeValue('x');
    var y = getAttributeValue('y');
    var side = getAttributeValue('side');
    var isRoot = getAttributeValue('isRoot');
    if (isRoot === undefined) {
        if (node.parentNode === null || (node.parentNode && node.parentNode.nodeName === 'root'))
            isRoot = true;
        else
            isRoot = false;
    }
    mindNode.isRoot = isRoot;
    if (x && y)
        mindNode.centerPoint = new MindPoint({
            x: x,
            y: y
        });
    if (side)
        mindNode.side = side;
    mindNode.text = text;
    if (node.childNodes.length > 0) {
        var nodes = node.childNodes[0];
        for (var i = 0; i < nodes.childNodes.length; i++) {
            // 遍历子节点
            mindNode.addLeafNode(getMindNodeByXmlNode(nodes.childNodes[i]));
        }
    }
    return mindNode;
};

// 获取绘图面板的中心点
function getViewPoint(mindPaper) {
    return new MindPoint({
        x: mindPaper.width / 2,
        y: mindPaper.height / 2
    });
};

Array.prototype.del = function(n) {
    if (n < 0)
        return this;
    else
        return this.slice(0, n).concat(this.slice(n + 1, this.length));
};

Array.prototype.BinarySearch = function(des) {
    var low = 0;　　
    var high = this.length - 1;　　
    while (low <= high) {　　
        var middle = (low + high) / 2;　　
        if (des == this[middle]) {　　
            return middle;　　
        } else if (des < this[middle]) {　　
            high = middle - 1;　　
        } else {　　
            low = middle + 1;　　
        }　　
    }　　
    return -1;
};