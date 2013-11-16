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
    var mindPaper = new MindPaper(document.body , 'mindPaper0');
    var r = mindPaper.draw().raphael;

    var mindNode0 = new MindNode('' , 'mindeNode0' , 20 , 190 , 100).bindMindPaper(mindPaper).draw();

    var mindNode1 = new MindNode('' , 'mindeNode1' , 20 , 290 , 80).bindMindPaper(mindPaper).draw();

    var mindNode2 = new MindNode('' , 'mindeNode2' , 20 , 390 , 100).bindMindPaper(mindPaper).draw();

    for (var i = 0, ii = mindPaper.mindNodes.length; i < ii; i++) {
        var color = Raphael.getColor();
        mindPaper.mindNodes[i].element.attr({
            fill: color,
            stroke: color,
            "fill-opacity": 0,
            "stroke-width": 2,
            cursor: "move"
        });
        mindPaper.mindNodes[i].element.drag(move, dragger, up);
    }

    var connection1 = new MindConnection('' , 'mindConnection1').bindMindPaper(mindPaper).connect(mindNode0 , mindNode1).draw();
    var connection2 = new MindConnection('' , 'mindConnection2').bindMindPaper(mindPaper).connect(mindNode1 , mindNode2).draw();
};

var Test = {
    path: 'demo.xml'
};

// 脑图基本位置配置
var MindMapPositionConfig = {
    // 节点位置
    mindNode: {
        // 节点间垂直间距
        verticalMargin: 60,
        // 节点间水平间距
        horizonMargin: 100
    }
};

// 获取绘图面板的中心点
var getViewPoint = function(mindPaper) {
    return new MindPoint(mindPaper.width / 2, mindPaper.height / 2);
};