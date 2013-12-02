var el;
window.onload = function() {
    // 元素拖动方法
    var dragger = function() {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({
            "fill-opacity": .2
        }, 500);
    };
    // 移动重绘
    var move = function(dx, dy) {
        var att = this.type == "rect" ? {
            x: this.ox + dx,
            y: this.oy + dy
        } : {
            cx: this.ox + dx,
            cy: this.oy + dy
        };
        this.attr(att);
        for (var i = mindPaper.mindConnections.length; i--;) {
            r.connection(mindPaper.mindConnections[i].element);
        }
        r.safari();
    };
    var up = function() {
        this.animate({
            "fill-opacity": 0
        }, 500);
    };
    var mindPaper = new MindPaper(document.body, 'mindPaper0');
    var r = mindPaper.draw().raphael;

    var mindNode0 = new MindNode('', 'mindeNode0', 4, 190, 100, '', true).bindMindPaper(mindPaper).draw();

    var mindNode1 = new MindNode('', 'mindeNode1', 4, 290, 80, 'left').bindMindPaper(mindPaper).draw();

    var mindNode2 = new MindNode('', 'mindeNode2', 4, 390, 100, 'right').bindMindPaper(mindPaper).draw();

    for (var i = 0, ii = mindPaper.mindNodes.length; i < ii; i++) {
        mindPaper.mindNodes[i].element.attr({
            fill: '#000000',
            "fill-opacity": 0,
            "stroke-width": 2,
            cursor: "move"
        });
        mindPaper.mindNodes[i].element.drag(move, dragger, up);
    }

    var connection1 = new MindConnection('', 'mindConnection1').bindMindPaper(mindPaper).connect(mindNode0, mindNode1).draw();
    var connection2 = new MindConnection('', 'mindConnection2').bindMindPaper(mindPaper).connect(mindNode1, mindNode2).draw();
};

var Test = {
    path: 'demo.xml'
};


// 获取绘图面板的中心点
var getViewPoint = function(mindPaper) {
    return new MindPoint(mindPaper.width / 2, mindPaper.height / 2);
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