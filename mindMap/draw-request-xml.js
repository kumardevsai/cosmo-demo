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
    var filepath = 'demo.xml';
    var mindNodeRoot = getMindDocStruct(filepath);
    mindNodeRoot.bindMindPaper(mindPaper).draw();
    for (var i = 0, ii = mindPaper.mindNodes.length; i < ii; i++) {
        mindPaper.mindNodes[i].element.attr({
            fill: '#000000',
            "fill-opacity": 0,
            "stroke-width": 2,
            cursor: "move"
        });
        mindPaper.mindNodes[i].element.drag(move, dragger, up);
    }
    mindPaper.connectChildMindNodes().drawChildMindNodesConnection();
};